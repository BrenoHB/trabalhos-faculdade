import React, { useState } from 'react';
import api from '../services/api';
import '../styles/AtFisica.css';

const AtFisica = () => {
  const [modalidade, setModalidade] = useState('');
  const [tempoExec, setTempoExec] = useState('');
  const [distancia, setDistancia] = useState('');
  const [kcal, setKcal] = useState('');
  const [tempoDescanso, setTempoDescanso] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post('/atfisica', {
        modalidade,
        tempoExec: parseInt(tempoExec),
        distancia: distancia ? parseInt(distancia) : null,
        kcal: parseInt(kcal),
        tempoDescanso: parseInt(tempoDescanso),
      });
      alert('Registro de atividade física salvo com sucesso!');
      setModalidade('');
      setTempoExec('');
      setDistancia('');
      setKcal('');
      setTempoDescanso('');
    } catch (error) {
      alert('Erro ao salvar o registro de atividade física. Tente novamente.');
    }
  };

  return (
    <div className="atfisica-container">
      <h1 className="atfisica-title">Registro de Atividade Física</h1>
      <input
        type="text"
        placeholder="Modalidade"
        value={modalidade}
        onChange={(e) => setModalidade(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tempo de Execução (minutos)"
        value={tempoExec}
        onChange={(e) => setTempoExec(e.target.value)}
      />
      <input
        type="number"
        placeholder="Distância (metros, opcional)"
        value={distancia}
        onChange={(e) => setDistancia(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calorias Queimadas (Kcal)"
        value={kcal}
        onChange={(e) => setKcal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tempo de Descanso (minutos)"
        value={tempoDescanso}
        onChange={(e) => setTempoDescanso(e.target.value)}
      />
      <button onClick={handleSubmit}>Salvar</button>
    </div>
  );
};

export default AtFisica;
