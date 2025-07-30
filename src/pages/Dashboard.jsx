import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [dados, setDados] = useState({ gpd: 0, lotes: 0, lucro: 0 });

  const calcular = () => {
    const lotes = JSON.parse(localStorage.getItem('lotes') || '[]');
    if (!lotes.length) {
      setDados({ gpd: 0, lotes: 0, lucro: 0 });
      return;
    }

    const gpdTotal = lotes.reduce((acc, l) => {
      const dias =
        (new Date(l.dataSaida) - new Date(l.dataEntrada)) / 86400000;
      const ganho = parseFloat(l.pesoSaida || 0) -
        parseFloat(l.pesoEntrada || 0);
      return acc + (dias > 0 ? ganho / dias : 0);
    }, 0);

    const lucroTotal = lotes.reduce((acc, l) => {
      const ganhoPeso = parseFloat(l.pesoSaida || 0) -
        parseFloat(l.pesoEntrada || 0);
      const receita = ganhoPeso * 5; // valor hipotético por kg
      const custo = parseFloat(l.custoRacao || 0);
      return acc + (receita - custo);
    }, 0);

    setDados({
      gpd: (gpdTotal / lotes.length).toFixed(2),
      lotes: lotes.length,
      lucro: lucroTotal
    });
  };

  useEffect(() => {
    calcular();
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
