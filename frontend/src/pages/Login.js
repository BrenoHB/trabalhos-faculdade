// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask'; // Importando a biblioteca para aplicar a máscara
import { useAuth } from '../contexts/AuthContext'; // Para acessar o contexto de autenticação
import '../styles/Login.css'; // Adicione o caminho para o seu arquivo CSS
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // Função para o login
  const handleLogin = async () => {
    try {
      // Envia os dados de login para o backend
      const response = await axios.post('http://localhost:5000/auth/login', {
        cpf,
        senha
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Salva o token no localStorage
        login(); // Atualiza o contexto de autenticação
        navigate('/home'); // Redireciona para a página inicial
      }
    } catch (error) {
      alert('Erro no login, verifique seus dados');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        {/* Campo de CPF com máscara */}
        <div className="form-group">
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)} // Atualiza o valor do CPF
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="text"
                placeholder="CPF"
                className="input"
              />
            )}
          </InputMask>
        </div>

        {/* Campo de Senha */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input"
          />
        </div>

        {/* Botão de login */}
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
      </p>
    </div>
  );
};

export default Login;
