import React, { useEffect, useState } from 'react';

export default function Lotes({ token }) {
  const [lotes, setLotes] = useState([]);
  const [nome, setNome] = useState("");

  const buscar = async () => {
    const res = await fetch("https://suinocultura-backend.onrender.com/lotes", {
      headers: { Authorization: "Bearer " + token }
    });
    const data = await res.json();
    setLotes(data);
  };

  const adicionar = async () => {
    if (!nome) return;
    await fetch("https://suinocultura-backend.onrender.com/lotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ nome })
    });
    setNome("");
    buscar();
  };

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div>
      <h2>🐖 Gerenciar Lotes</h2>
      <input
        placeholder="Nome do lote"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button onClick={adicionar}>➕ Adicionar</button>
      <ul>
        {lotes.map((l, i) => (
          <li key={i}>📦 {l.nome}</li>
        ))}
      </ul>
    </div>
  );
}
