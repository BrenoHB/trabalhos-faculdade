import React, { useState } from 'react';
import api from '../services/api';
import '../styles/AtFisica.css'; // Importação do estilo externo

const AtFisica = () => {
  const [modalidade, setModalidade] = useState('');
  const [tempo, setTempo] = useState('');
  const [distancia, setDistancia] = useState('');
  const [kcal, setKcal] = useState('');
  const [tempoD, setTempoD] = useState('');
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario') || ''); // Carrega o usuário do localStorage
  const [historico, setHistorico] = useState([]);  // Estado para armazenar o histórico de atividades

  // Função para registrar a atividade física
  const handleSubmit = async () => {
    if (modalidade && tempo && kcal && tempoD && usuario) {
      try {
        await api.post('/PostAtFisica', {
          modalidade,
          tempo,
          distancia,
          kcal,
          tempoD,
          usuario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token Bearer aqui
          }
        });
        alert('Registro de atividade física salvo com sucesso!');
        setModalidade('');
        setTempo('');
        setDistancia('');
        setKcal('');
        setTempoD('');
      } catch (error) {
        alert('Erro ao salvar o registro de atividade física. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  // Função para exibir o histórico de atividades físicas
  const handleHistorico = async () => {
    if (usuario) {
      try {
        const response = await api.post('/GetAtFisica', {
          usuario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token Bearer aqui
          }
        });
        setHistorico(response.data);  // Atualiza o estado com os dados do histórico
      } catch (error) {
        alert('Erro ao carregar o histórico. Tente novamente.');
      }
    } else {
      alert('Usuário não encontrado. Por favor, faça login.');
    }
  };

  return (
    <div className="atfisica-container">
      <h1 className="atfisica-title">Registro de Atividade Física</h1>

      <input
        className="atfisica-input"
        type="text"
        placeholder="Modalidade"
        value={modalidade}
        onChange={(e) => setModalidade(e.target.value)}
      />
      <input
        className="atfisica-input"
        type="number"
        placeholder="Tempo (minutos)"
        value={tempo}
        onChange={(e) => setTempo(e.target.value)}
      />
      <input
        className="atfisica-input"
        type="number"
        placeholder="Distância (metros)"
        value={distancia}
        onChange={(e) => setDistancia(e.target.value)}
      />
      <input
        className="atfisica-input"
        type="number"
        placeholder="Calorias Queimadas (Kcal)"
        value={kcal}
        onChange={(e) => setKcal(e.target.value)}
      />
      <input
        className="atfisica-input"
        type="number"
        placeholder="Tempo de Descanso (minutos)"
        value={tempoD}
        onChange={(e) => setTempoD(e.target.value)}
      />
      <button className="atfisica-button" onClick={handleSubmit}>Salvar</button>

      {/* Botão para exibir o histórico */}
      <button className="atfisica-button" onClick={handleHistorico}>Exibir Histórico</button>

      {/* Exibindo o histórico de atividades */}
      {historico.length > 0 && (
        <div className="historico-container">
          <h2>Histórico de Atividades</h2>
          <ul>
            {historico.map((registro, index) => (
              <li key={index}>
                <p><strong>Modalidade:</strong> {registro.modalidade}</p>
                <p><strong>Tempo:</strong> {registro.tempo} minutos</p>
                <p><strong>Distância:</strong> {registro.distancia} metros</p>
                <p><strong>Calorias:</strong> {registro.kcal} Kcal</p>
                <p><strong>Tempo de Descanso:</strong> {registro.tempoD} minutos</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AtFisica;
