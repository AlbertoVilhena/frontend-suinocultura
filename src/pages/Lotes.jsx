import React, { useEffect, useState } from 'react';

export default function Lotes() {
  const [lotes, setLotes] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    dataEntrada: '',
    pesoEntrada: '',
    dataSaida: '',
    pesoSaida: '',
    consumoRacao: '',
    pesosSemanais: '',
    custoRacao: ''
  });

  const carregar = () => {
    const saved = localStorage.getItem('lotes');
    if (saved) setLotes(JSON.parse(saved));
  };

  const salvar = novos => {
    localStorage.setItem('lotes', JSON.stringify(novos));
    setLotes(novos);
  };

  const adicionar = () => {
    if (!form.nome) return;
    const novo = {
      ...form,
      id: Date.now(),
      pesosSemanais: form.pesosSemanais
        ? form.pesosSemanais.split(',').map(p => Number(p.trim()))
        : []
    };
    const novos = [...lotes, novo];
    salvar(novos);
    setForm({
      nome: '',
      dataEntrada: '',
      pesoEntrada: '',
      dataSaida: '',
      pesoSaida: '',
      consumoRacao: '',
      pesosSemanais: '',
      custoRacao: ''
    });
  };

  useEffect(() => {
    carregar();
  }, []);

  const calcularGPD = lote => {
    const dias =
      (new Date(lote.dataSaida) - new Date(lote.dataEntrada)) / 86400000;
    const ganho = parseFloat(lote.pesoSaida || 0) -
      parseFloat(lote.pesoEntrada || 0);
    return dias > 0 ? (ganho / dias).toFixed(2) : '0';
  };

  return (
    <div>
      <h2>🐖 Gerenciar Lotes</h2>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input
          placeholder="Nome do lote"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data de entrada"
          value={form.dataEntrada}
          onChange={e => setForm({ ...form, dataEntrada: e.target.value })}
        />
        <input
          type="number"
          placeholder="Peso de entrada (kg)"
          value={form.pesoEntrada}
          onChange={e => setForm({ ...form, pesoEntrada: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data de saída"
          value={form.dataSaida}
          onChange={e => setForm({ ...form, dataSaida: e.target.value })}
        />
        <input
          type="number"
          placeholder="Peso de saída (kg)"
          value={form.pesoSaida}
          onChange={e => setForm({ ...form, pesoSaida: e.target.value })}
        />
        <input
          type="number"
          placeholder="Consumo de ração (kg)"
          value={form.consumoRacao}
          onChange={e => setForm({ ...form, consumoRacao: e.target.value })}
        />
        <input
          placeholder="Pesos semanais (separados por vírgula)"
          value={form.pesosSemanais}
          onChange={e => setForm({ ...form, pesosSemanais: e.target.value })}
        />
        <input
          type="number"
          placeholder="Custo da ração (R$)"
          value={form.custoRacao}
          onChange={e => setForm({ ...form, custoRacao: e.target.value })}
        />
        <button onClick={adicionar}>➕ Adicionar</button>
      </div>
      <table border="1" cellPadding="5" style={{ marginTop: '1rem', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Entrada</th>
            <th>Peso Entrada</th>
            <th>Saída</th>
            <th>Peso Saída</th>
            <th>Consumo (kg)</th>
            <th>Custo (R$)</th>
            <th>GPD (kg/dia)</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map(l => (
            <tr key={l.id}>
              <td>{l.nome}</td>
              <td>{l.dataEntrada}</td>
              <td>{l.pesoEntrada}</td>
              <td>{l.dataSaida}</td>
              <td>{l.pesoSaida}</td>
              <td>{l.consumoRacao}</td>
              <td>{l.custoRacao}</td>
              <td>{calcularGPD(l)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
