import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = ({ setUser}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
       
      setError("Registeration failed");
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-6">
  Create Account
</h2>

      {error &&  <p className=" text-red-500 mb-4">{error}</p>}
      
      <input 
        type="text"
         placeholder="Name" 
         className="border p-2 w-full mb-3" 
         value={form.name} onChange={(e) => setForm({...
        form, 
        name: e.target.value,
        })} />
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
              <p className="text-center mt-5 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
  );
};

export default Register;