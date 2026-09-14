import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api/axios";
import { Menu, X,User, Mail, LogOut, LogIn, UserPlus, Settings} from 'lucide-react';

const Navbar = ({user, setUser, openAuthModal}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if(hour < 12) {
      return "Good morning";
    }
    if (hour < 18) {
      return "Good afternoon";
    }
    return "Good evening";
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      setMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <nav className="bg-gray-800 p-4 text-white">
    <div className="flex items-center justify-between">
      
      {/* Logo */}
      <Link 
        to="/" 
        className="inline-block transition-transform duration-500 ease-in-out hover:-translate-y-1">
        <img src='/Frotech logo.jpg' alt="Frotech" className="h-16 w-auto"/>
      </Link>

      {/* Desktop navigation */}
      <div className='hidden md:flex items-center gap-3'>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className='flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-gray-700'
          >
            <User size={20}  />
            
            <span className='text-sm font-medium'>
              {getGreeting()}
              {user ? `, ${user.name}` : ""}
              </span>
        </button>
      </div>

      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

    {/* Mobile navigation */}
    {menuOpen && (
      <div className="mt-4 flex flex-col gap-3 border-t border-gray-700 pt-4 md:hidden">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full rounded bg-red-500 px-3 py-2 text-left hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
           <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openAuthModal("login");
              }}
              className="rounded px-3 py-2 text-left hover:bg-gray-700"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openAuthModal("register");
              }}
              className="rounded px-3 py-2 text-left hover:bg-gray-700"
            >
              Register
            </button>
          </>
        )}
      </div>
    )}
    {drawerOpen && (
      <>
{/* Background overlay */}
      <div
        className='fixed inset-0  z-40 bg-black/40 backdrop-blur-sm'
        onClick={() => setDrawerOpen(false)}
        />
{/* Account drawer */}
        <aside className='fixed right-0 top-0 z-50 h-full w-full max-w-md rounded-l-4xl border-l border-slate-200 bg-white shadow-2xl'>
{/* Close button */}
        <div className='flex justify-end p-6'>
          <button
            type='button'
            onClick={() => setDrawerOpen(false)}
            className='group rounded-xl p-2.5 text-slate-400 transition duration-300 hover:text-slate-700'
            aria-label='Close account menu'
            >
              <X 
                size={20} 
                strokeWidth={1.8}
                className='transition-all duration-700 ease-in-out group-hover:rotate-90 group-hover:scale-110'
              />
            </button>
         </div>

{/* Drawer content */}
        <div className='flex flex-col items-center px-8 pt-4 text-center'>
 {/* Profile icon */}
        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-600'>
          <User size={38} strokeWidth={1.8} />
        </div>
{/* Greeting */}
        <h2 className='mt-6 text-2xl font-bold text-gray-900'>
            {getGreeting()}
            {user ? `, ${user.name}` : ""}
        </h2>

        <p className='mt-2 text-sm text-gray-500'>
          {user
            ? "Welcome back to PERN Auth"
            : "Welcome to PERN Auth"}
        </p>
 {/* Authentication buttons */}
<div className='mt-10 w-full space-y-4'>
  {user ? (
    <button
      type='button'
      onClick={handleLogout}
      className='block w-full rounded-xl bg-red-500 px-4 py-3.5 font-semibold text-white transition hover:bg-red-600'
    >
      Logout
    </button>
  ) : (
    <>
      <button
        type='button'
        onClick={() => {
          setDrawerOpen(false);
          openAuthModal("login");
        }}
        className='block w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-700'
      >
        Login
      </button>

      <button
        type='button'
        onClick={() => {
          setDrawerOpen(false);
          openAuthModal("register");
        }}
        className='block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-100'
      >
        Register
      </button>
    </>
  )}
</div>

{/* Divider */}
<div className="my-8 w-full border-t border-gray-200" />


        </div>
       </aside>
      </>
    )}
  </nav>
);
}

export default Navbar