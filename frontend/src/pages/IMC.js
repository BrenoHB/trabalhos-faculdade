import React, { useState } from 'react';
import api from '../services/api';
import '../styles/IMC.css'; // Importação do estilo externo

const IMC = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);

  const calcularIMC = async () => {
    if (peso && altura) {
      const alturaMetros = parseFloat(altura) / 100;
      const imcCalculado = (parseFloat(peso) / (alturaMetros ** 2)).toFixed(2);
      setImc(imcCalculado);

      // Salvar no banco
      try {
        await api.post('/imc', {
          peso: parseFloat(peso),
          altura: parseFloat(altura),
          imc: parseFloat(imcCalculado),
        });
        alert('IMC calculado e salvo com sucesso!');
      } catch (error) {
        alert('Erro ao salvar o IMC. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
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
    </div>
  );
};

export default IMC;