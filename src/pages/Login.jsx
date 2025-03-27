import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [criandoConta, setCriandoConta] = useState(false);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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

  const criarConta = async () => {
    if (!validarEmail(email)) {
      setErro("❌ E-mail inválido.");
      return;
    }
    if (!senha || senha.length < 4) {
      setErro("❌ A senha deve ter pelo menos 4 caracteres.");
      return;
    }
    try {
      const res = await fetch("https://suinocultura-backend.onrender.com/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });
      if (!res.ok) throw new Error("Erro ao criar conta");
      const data = await res.json();
      alert("✅ Conta criada com sucesso!");
      setCriandoConta(false);
      setErro("");
    } catch (err) {
      setErro("❌ Erro ao criar conta.");
    }
  };

  return (
    <div className="login">
      <h1>{criandoConta ? "🆕 Criar Conta" : "🐽 Login no Sistema"}</h1>
      <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      {criandoConta ? (
        <>
          <button onClick={criarConta}>Cadastrar</button>
          <button onClick={() => { setCriandoConta(false); setErro(""); }}>Voltar ao login</button>
        </>
      ) : (
        <>
          <button onClick={logar}>Entrar</button>
          <button onClick={() => { setCriandoConta(true); setErro(""); }}>Criar nova conta</button>
        </>
      )}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
