import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lotes from './pages/Lotes';

export default function App() {
  const [logado, setLogado] = useState(false);
  const [tela, setTela] = useState("dashboard");

  if (!logado) return <Login onLogin={() => setLogado(true)} />;

  return (
    <div className="container">
      <nav className="menu">
        <button onClick={() => setTela("dashboard")}>📊 Dashboard</button>
        <button onClick={() => setTela("lotes")}>🐖 Lotes</button>
        <button onClick={() => setLogado(false)}>🚪 Sair</button>
      </nav>
      <div className="conteudo">
        {tela === "dashboard" && <Dashboard />}
        {tela === "lotes" && <Lotes />}
      </div>
    </div>
  );
}
