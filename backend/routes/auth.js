import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import {protect} from "../middleware/auth.js";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const cookieOptions = { 
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Register

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;


    if(!name ||  !email || !password) {
        return res
        .status(400)
        .json({ message: "Please provide all required fields "}); 
    }

    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);

    if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
    );

    const token = generateToken(newUser.rows[0].id);

    res.cookie('token', token, cookieOptions);

    return res.status(201).json({ user: newUser.rows[0] });    
}) 

// LogIn

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email ||  !password) {
        return res.status(400).json({ message: 'Please provide all required fields'});
    }

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userData =  user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = generateToken(userData.id);

    res.cookie("token", token, cookieOptions);

    res.json({ 
        user: { 
            id: userData.id, 
            name: userData.name,
            email: userData.email,
     },
    });
});

//Google Oath
router.post("/google", async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                message: "Google token is required"
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const email = payload.email;
        const name = payload.name;

        const existingUser = await pool.query(
            "SELECT * FROM users  WHERE email = $1",
            [email]
        );

        let user;

        if (existingUser.rows.length === 0) {
            const randomPassword = Math.random().toString(36);

            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const newUser = await pool.query(
                `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, name, email`, 
                [name, email, hashedPassword]
            );

            user = newUser.rows[0];
        } else {
            user = existingUser.rows[0];
        }

        const jwtToken = generateToken(user.id);
        res.cookie("token", jwtToken, cookieOptions);

        res.json({
            message: "Google login successful",
            user: {
                id: user.id, 
                name: user.name,
                email: user.email,
                picture: payload.picture,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(401).json({
            message: "Invalid Google token"
        });
    }
});

//Me
router.get('/me', protect, (req, res) => {
    res.json(req.user)
    // return info of the logged in user from protected middleware
});

//Logout
router.post('/logout', (req, res) => {
    res.cookie('token', '', { ...cookieOptions, maxAge: 1});
    res.json({ message: 'Logged out successfully' });
});

export default router;