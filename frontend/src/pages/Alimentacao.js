import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Alimentacao.css';

const Alimentacao = () => {
  const [horario, setHorario] = useState('');
  const [alimentos, setAlimentos] = useState('');
  const [kcal, setKcal] = useState('');
  const [comentarios, setComentarios] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post('/alimentacao', {
        horario,
        alimentos,
        kcal: parseInt(kcal),
        comentarios,
      });
      alert('Registro de alimentação salvo com sucesso!');
      setHorario('');
      setAlimentos('');
      setKcal('');
      setComentarios('');
    } catch (error) {
      alert('Erro ao salvar o registro de alimentação. Tente novamente.');
    }
  };

  return (
    <div className="alimentacao-container">
      <h1 className="alimentacao-title">Registro de Alimentação</h1>
      <input
        type="time"
        placeholder="Horário"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
      />
      <textarea
        placeholder="Alimentos consumidos"
        value={alimentos}
        onChange={(e) => setAlimentos(e.target.value)}
        rows="4"
      />
      <input
        type="number"
        placeholder="Calorias (Kcal)"
        value={kcal}
        onChange={(e) => setKcal(e.target.value)}
      />
      <textarea
        placeholder="Comentários"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        rows="4"
      />
      <button onClick={handleSubmit}>Salvar</button>
    </div>
  );
};

export default Alimentacao;
