import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lotes from './pages/Lotes';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (tk) => {
    localStorage.setItem("token", tk);
    setToken(tk);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      {token ? (
        <>
          <nav className="menu">
            <Link to="/dashboard"><button>📊 Dashboard</button></Link>
            <Link to="/lotes"><button>🐖 Lotes</button></Link>
            <button onClick={handleLogout}>🚪 Sair</button>
          </nav>
          <div className="conteudo">
            <Routes>
              <Route path="/dashboard" element={<Dashboard token={token} />} />
              <Route path="/lotes" element={<Lotes token={token} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
    </Router>
  );
}
