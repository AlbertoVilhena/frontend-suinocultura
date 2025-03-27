import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
            <button onClick={() => window.location.href = "/dashboard"}>📊 Dashboard</button>
            <button onClick={() => window.location.href = "/lotes"}>🐖 Lotes</button>
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
