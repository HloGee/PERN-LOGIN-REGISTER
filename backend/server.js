import express  from "express";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";

dotenv.config();
console.log("Database:", process.env.DB_NAME);
console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);
console.log("Port:", process.env.DB_PORT);

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pern-frontend-194399446108.africa-south1.run.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});