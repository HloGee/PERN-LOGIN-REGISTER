import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import NotFound from "./components/NotFound";

axios.defaults.withCredentials = true; 


function App() {

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <Router>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home user={user} error={error}/>} />
          <Route path="/login" element={<Login setUser={setUser} />}/>
          <Route path="/register" element={<Register setUser={setUser} />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
