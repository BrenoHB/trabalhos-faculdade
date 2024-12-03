import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Alimentacao.css';

const Alimentacao = () => {
  const [horario, setHorario] = useState('');
  const [alimentos, setAlimentos] = useState('');
  const [kcal, setKcal] = useState('');
  const [comentario, setComentario] = useState('');
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario') || ''); // Carrega o usuário do localStorage
  const [historico, setHistorico] = useState([]);  // Estado para armazenar o histórico de alimentação

  // Função para salvar o registro de alimentação
  const handleSubmit = async () => {
    if (horario && alimentos && kcal && usuario) {
      try {
        // Envia os dados no corpo da requisição
        await api.post('/PostAlimentacao', {
          horario,
          alimentos,
          kcal: parseInt(kcal),
          comentario,
          usuario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token Bearer aqui
          }
        });
        alert('Registro de alimentação salvo com sucesso!');
        setHorario('');
        setAlimentos('');
        setKcal('');
        setComentario('');
      } catch (error) {
        alert('Erro ao salvar o registro de alimentação. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  // Função para exibir o histórico de alimentação
  const handleHistorico = async () => {
    if (usuario) {
      try {
        // Envia o usuário no corpo da requisição
        const response = await api.post('/GetAlimentacao', {
          usuario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token Bearer aqui
          }
        });
        setHistorico(response.data);  // Atualiza o estado com o histórico de alimentação
      } catch (error) {
        alert('Erro ao carregar o histórico de alimentação. Tente novamente.');
      }
    } else {
      alert('Usuário não encontrado. Por favor, faça login.');
    }
  };

  return (
    <div className="alimentacao-container">
      <h1 className="alimentacao-title">Registro de Alimentação</h1>
     
      <input
        className="alimentacao-input"
        type="time"
        placeholder="Horário"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
      />
      <textarea
        className="alimentacao-textarea"
        placeholder="Alimentos consumidos"
        value={alimentos}
        onChange={(e) => setAlimentos(e.target.value)}
        rows="4"
      />
      <input
        className="alimentacao-input"
        type="number"
        placeholder="Calorias (Kcal)"
        value={kcal}
        onChange={(e) => setKcal(e.target.value)}
      />
      <textarea
        className="alimentacao-textarea"
        placeholder="Comentários"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        rows="4"
      />
      <button className="alimentacao-button" onClick={handleSubmit}>Salvar</button>

      {/* Botão para exibir o histórico de alimentação */}
      <button className="alimentacao-button" onClick={handleHistorico}>Exibir Histórico de Alimentação</button>

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
                <p><strong>Comentários:</strong> {registro.comentario}</p>
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
