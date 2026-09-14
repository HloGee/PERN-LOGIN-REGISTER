import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import api from "./api/axios";
import NotFound from "./components/NotFound";
import CookieConsent from "./components/CookieConsent";



function AppContent() {

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

    const openAuthModal = (type) => {
      setAuthModal(type);
      navigate(`/${type}`);
    };

    const closeAuthModal = () => {
      setAuthModal(null);
      navigate("/");
    }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
        <>
        <Navbar user={user} setUser={setUser}  openAuthModal={openAuthModal}/>
        <Routes>
          <Route path="/" element={<Home user={user} error={error} openAuthModal={openAuthModal}/>} />
          <Route path="/login" element={<Home user={user} error={error} openAuthModal={openAuthModal} /> }/>
          <Route path="/register" element={<Home user={user} error={error} openAuthModal={openAuthModal} />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>

        {authModal === "login" && (
          <Login 
            setUser={setUser}
            onClose={closeAuthModal}
            openAuthModal={openAuthModal}
            />
        )}

        {authModal === "register" && (
          <Register
            setUser={setUser}
            onClose={closeAuthModal}
            openAuthModal={openAuthModal}
            />
        )}

        <CookieConsent />
      </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
