import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const logar = async () => {
    try {
      const res = await fetch("https://suinocultura-backend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });
      if (!res.ok) throw new Error("Login inválido");
      const data = await res.json();
      onLogin(data.token);
    } catch (err) {
      setErro("❌ E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="login">
      <h1>🐽 Sistema de Suinocultura</h1>
      <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <button onClick={logar}>Entrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
