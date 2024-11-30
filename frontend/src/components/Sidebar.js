import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importando o contexto

const Sidebar = () => {
  const { logout } = useAuth(); // Obtendo a função de logout

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/imc">IMC</Link></li>
        <li><Link to="/atfisica">Atividade Física</Link></li>
        <li><Link to="/alimentacao">Alimentação</Link></li>
        <li>
          <button onClick={logout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
