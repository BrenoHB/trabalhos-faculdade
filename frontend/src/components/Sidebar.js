import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importando o contexto
import '../styles/Sidebar.css'

const Sidebar = () => {
  const { logout } = useAuth(); // Obtendo a função de logout
  const navigate = useNavigate(); // Hook de navegação do React Router

  // Função de logout para remover o token do localStorage
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    localStorage.removeItem('usuario'); // Remove o usuário do localStorage
    logout(); // Chama a função de logout do contexto
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="sidebar">
      {/* Espaço para a logo */}
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <ul>
        <li><Link to="/home" className="sidebar-link">Home</Link></li>
        <li><Link to="/imc" className="sidebar-link">IMC</Link></li>
        <li><Link to="/atfisica" className="sidebar-link">Atividade Física</Link></li>
        <li><Link to="/alimentacao" className="sidebar-link">Alimentação</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
