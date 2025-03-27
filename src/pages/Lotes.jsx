import React, { useState } from 'react';

export default function Lotes() {
  const [lotes, setLotes] = useState([]);
  const [nome, setNome] = useState("");

  const adicionar = () => {
    if (nome) {
      setLotes([...lotes, { nome, status: "ativo" }]);
      setNome("");
    }
  };

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
          <li key={i}>📦 {l.nome} - {l.status}</li>
        ))}
      </ul>
    </div>
  );
}
