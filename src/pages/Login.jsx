import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  return (
    <div className="login">
      <h1>🐽 Sistema de Suinocultura</h1>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={onLogin}>Entrar</button>
    </div>
  );
}
