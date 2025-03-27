import React, { useEffect, useState } from 'react';

export default function Dashboard({ token }) {
  const [dados, setDados] = useState({ gpd: 0, lotes: 0, lucro: 0 });

  useEffect(() => {
    // Simulação inicial — depois substituir por rota real
    setDados({ gpd: 650, lotes: 3, lucro: 2750 });
  }, []);

  return (
    <div>
      <h2>📊 Visão Geral</h2>
      <p>🔹 Lotes ativos: {dados.lotes}</p>
      <p>🔸 Ganho médio diário: {dados.gpd}g</p>
      <p>💰 Rentabilidade estimada: R$ {dados.lucro.toFixed(2)}</p>
    </div>
  );
}
