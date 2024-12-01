import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Alimentacao.css';

const Alimentacao = () => {
  const [horario, setHorario] = useState('');
  const [alimentos, setAlimentos] = useState('');
  const [kcal, setKcal] = useState(0);
  const [comentarios, setComentarios] = useState('');
  const [usuario, setUsuario] = useState('');  // Campo para o nome do usuário
  const [historico, setHistorico] = useState([]);  // Estado para armazenar o histórico de alimentação

  // Função para salvar o registro de alimentação
  const handleSubmit = async () => {
    try {
      await api.post('/alimentacao', {
        horario,
        alimentos,
        kcal: parseInt(kcal),
        comentarios,
        usuario,
      });
      alert('Registro de alimentação salvo com sucesso!');
      setHorario('');
      setAlimentos('');
      setKcal(0);
      setComentarios('');
    } catch (error) {
      alert('Erro ao salvar o registro de alimentação. Tente novamente.');
    }
  };

  // Função para exibir o histórico de alimentação
  const handleHistorico = async () => {
    try {
      const response = await api.get('/alimentacao', {
        params: { usuario },
      });
      setHistorico(response.data);  // Atualiza o estado com o histórico de alimentação
    } catch (error) {
      alert('Erro ao carregar o histórico de alimentação. Tente novamente.');
    }
  };

  return (
    <div className="alimentacao-container">
      <h1 className="alimentacao-title">Registro de Alimentação</h1>

      {/* Campo para nome do usuário */}
      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      
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

      {/* Botão para exibir o histórico de alimentação */}
      <button onClick={handleHistorico}>Exibir Histórico de Alimentação</button>

      {/* Exibindo o histórico de alimentação */}
      {historico.length > 0 && (
        <div className="historico-container">
          <h2>Histórico de Alimentação</h2>
          <ul>
            {historico.map((registro, index) => (
              <li key={index}>
                <p><strong>Horário:</strong> {registro.horario}</p>
                <p><strong>Alimentos:</strong> {registro.alimentos}</p>
                <p><strong>Calorias:</strong> {registro.kcal} kcal</p>
                <p><strong>Comentários:</strong> {registro.comentarios}</p>
                <p><strong>Data de Registro:</strong> {new Date(registro.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Alimentacao;
