import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setUser}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
       
      setError("Invalid Email or password");
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    try{
      const res = await api.post("/api/auth/google", {
        token: credentialResponse.credential,
      });
    
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google Sign-In failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-6">
  Welcome Back
</h2>

<p className="text-gray-500 text-center mb-6">
  Sign in to continue
</p>
      {error &&  <p className=" text-red-500 mb-4">{error}</p>}
      <input 
        type="email"
         placeholder="Email" 
         className="border p-2 w-full mb-3" 
         value={form.email} onChange={(e) => setForm({...
        form, 
        email: e.target.value,
        })} />
        <input 
        type="password" 
        placeholder="Password" 
        className="border p-2 w-full mb-3" 
        value={form.password} onChange={(e) => setForm({...
        form, password: e.target.value})} />
        <button className="bg-blue-500 text-white p-2 w-full">Login</button>
        <div className="my-4 flex justify-center">
          <GoogleLogin 
          onSuccess={handleGoogleLogin}
          onError={() => setError("Google Sign-In failed")}
          />
        </div>
        <p className="text-center mt-5 text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          Register
        </Link>
      </p>
    </form>
  </div>
  );
};

export default Login;