import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importando o contexto
import '../styles/Sidebar.css'

const Sidebar = () => {
  const { logout } = useAuth(); // Obtendo a função de logout

  return (
    <div className="sidebar">
      {/* Espaço para a logo */}
      <div className="logo-container">
        <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
      </div>
      <ul>
        <li><Link to="/home" className="sidebar-link">Home</Link></li>
        <li><Link to="/imc" className="sidebar-link">IMC</Link></li>
        <li><Link to="/atfisica" className="sidebar-link">Atividade Física</Link></li>
        <li><Link to="/alimentacao" className="sidebar-link">Alimentação</Link></li>
        <li>
          {/*<button onClick={logout} className="logout-btn">Logout</button>*/}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
