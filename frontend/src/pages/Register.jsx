import React, { useState } from "react";
import api from "../api/axios";
import { Mail, User, Lock, Eye, EyeOff, X} from "lucide-react";

const Register = ({ setUser, onClose, openAuthModal}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword){
      setError("Password does not match");
      return;
    }
    try {
      const res = await api.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

    setUser(res.data.user);
      onClose();
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
         <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
         onMouseDown={onClose}>
    <form 
      className="relative w-full max-w-md bg-white rounded-4xl shadow-xl border border-slate-100 p-8 sm:p-10"
      onSubmit={handleSubmit}
      onMouseDown={(e) => e.stopPropagation()} 
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label="Close register">  
          <X size={20} />
      </button>
      <h2 className="text-3xl font-bold text-center tracking-tight text-slate-900">
        Create Account
      </h2>
      <p className="mt-2 text-center text-sm text-slate-500">
        Create your account to get started
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
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name 
        </label>
  <div className="relative">
    <User
    size={18}
    strokeWidth={2}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
    />
      <input
        id="name"
        type="text"
        placeholder="Your full Name"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />
  </div>
</div>      

<div>
        <label
        htmlFor="email"
        className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email address
        </label>

      <div className="relative">
        <Mail
        size={18}
        strokeWidth={2}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }></input>

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
          placeholder="Create a password"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
       />
       <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
          aria-label={showPassword ? "Hide Password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} /> }
          </button>
    </div>
</div>

<div className="mt-5">
  <label
    htmlFor="confirmPassword"
    className="mb-2 block text-sm font-medium text-slate-700"
    >
      Confirm password
    </label>

    <div className="relative">
      <Lock
      size={18}
      strokeWidth={2}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm your password"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({
            ...form,
            confirmPassword: e.target.value,
          })
          }
        />
        <button
          type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} /> }
        </button>
    </div>
</div>

          <button 
              type="submit"
                className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98]"
>
          Register
          </button>

              <p className="text-center mt-5 text-gray-600">
        Already have an account?{" "}
           <button
            type="button"
            onClick={() => openAuthModal("login")}
            className="text-blue-600 font-semibold hover:underline">
              Login
            </button>
              </p>
    </form>
  </div>
  );
};

export default Register;