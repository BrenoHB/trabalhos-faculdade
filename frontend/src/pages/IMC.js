import React, { useState } from 'react';
import api from '../services/api';
import '../styles/IMC.css'; // Importação do estilo externo

const IMC = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [usuario] = useState(localStorage.getItem('usuario') || ''); // Carrega o usuário do localStorage
  const [historico, setHistorico] = useState([]);  // Estado para armazenar o histórico de IMC

  // Função para calcular o IMC
  const calcularIMC = async () => {
    if (peso && altura && usuario) {
      const alturaMetros = parseFloat(altura) / 100;
      const imcCalculado = (parseFloat(peso) / (alturaMetros ** 2)).toFixed(2);
      setImc(imcCalculado);

      // Salvar no banco
      try {
        await api.post('/postimc', {
          imc: parseFloat(imcCalculado),
          altura: parseFloat(altura),
          peso: parseFloat(peso),
          usuario: usuario, // Enviar o usuário
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token Bearer aqui
          }
        });
        alert('IMC calculado e salvo com sucesso!');
      } catch (error) {
        alert('Erro ao salvar o IMC. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  // Função para exibir o histórico de IMC
  const handleHistorico = async () => {
    try {
      const response = await api.post('/getimc', {
         usuario: usuario, // Enviar o usuário
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token Bearer aqui
        }
      });
      setHistorico(response.data);

    } catch (error) {
      alert('Erro ao carregar o histórico de IMC. Tente novamente.');
    }
  };

  // Função para limpar o histórico de IMC
  const limparHistorico = () => {
    setHistorico([]);
  };

  return (
    <div className="imc-container">
      <h1 className="imc-title">Calcular IMC</h1>

      <input
        className="imc-input"
        type="number"
        placeholder="Peso (kg)"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />
      <input
        className="imc-input"
        type="number"
        placeholder="Altura (cm)"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
      />
     
      <button className="imc-button" onClick={calcularIMC}>
        Calcular IMC
      </button>

      {imc && <div className="imc-result">Seu IMC é: {imc}</div>}

      {/* Botão para exibir o histórico de IMC */}
      <button className="imc-button" onClick={handleHistorico}>
        Exibir Histórico de IMC
      </button>

      {/* Exibindo o histórico de IMC e o botão para limpar o histórico */}
      {historico.length > 0 && (
        <div className="historico-container">
          <h2>Histórico de IMC</h2>
          <ul>
            {historico.map((registro, index) => (
              <li key={index}>
                <p><strong>IMC:</strong> {registro.imc}</p>
                <p><strong>Peso:</strong> {registro.peso} kg</p>
                <p><strong>Altura:</strong> {registro.altura} cm</p>
                <p><strong>Data de Cálculo:</strong> {new Date(registro.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
          {/* Botão para limpar o histórico de IMC */}
          <button className="imc-button limpar-historico-button" onClick={limparHistorico}>Ocultar Histórico</button>
        </div>
      )}
    </div>
  );
};

export default IMC;
