import React, { useState } from "react";
import api from "../api/axios";import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock,  Eye, EyeOff, X } from "lucide-react";

const Login = ({ setUser, onClose, openAuthModal }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);
      setUser(res.data.user);
      onClose();
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
      onClose();
    } catch (err) {
      console.error(err);
      setError("Google Sign-In failed");
    }
  };

return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
     onMouseDown={onClose} >
      <form
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10"
        onSubmit={handleSubmit}
        onMouseDown={(e) => e.stopPropagation()}
      >
      <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"   
          aria-label="Close login"
          >
          <X size={20} />
      </button>
      <h2 className="text-3xl font-bold text-center tracking-tight text-slate-900">
          Welcome back
      </h2>
      <p className="mt-2 text-center text-sm text-slate-500" >
         Sign in to continue to your account
      </p>
      {error && (
    <div className="mt-5 mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
    </div>     
      )}
    <div>
        <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
        </label>
      <div className="relative">
        <Mail
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
          />

        <input 
        type="email"
         placeholder="Email address" 
         className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" 
         value={form.email} onChange={(e) => setForm({...form,
        email: e.target.value,
        })} />

      </div>
    </div>
         
<div>
            <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
            </label>
          
      <div className="relative">
        <Lock
          size={18}
          strokeWidth={2}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

      
        <input 
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password" 
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" 
              value={form.password} onChange={(e) => setForm({...form, 
              password: e.target.value,})} 
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
          aria-label={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98]"
            >
          Sign in
          </button>

    <div className="my-7 flex items-center gap-4">
    <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
        Or continue with
          </span>

    <div className="h-px flex-1 bg-slate-200" />
    </div>
            
    <div className="flex justify-center">
              <GoogleLogin 
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google Sign-In failed")}
              />
    </div>
          
</div>
            <p className="text-center mt-5 text-gray-600">
        Don't have an account?{" "}
            <button 
              type="button"
              onClick={() => openAuthModal("register")}
              className="text-blue-600 font-semibold hover:underline">
                Register
            </button>
            </p>
    </form>
</div>
  );
};

export default Login;