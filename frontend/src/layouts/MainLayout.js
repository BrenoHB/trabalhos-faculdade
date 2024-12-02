import React from 'react';
import { Outlet } from 'react-router-dom'; // Para renderizar rotas aninhadas
import Sidebar from '../components/Sidebar'; // Certifique-se do caminho correto
import '../styles/MainLayout.css'; // Estilos do layout

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="sidebar-wrapper">
        <Sidebar /> {/* Sidebar fixa */}
      </div>
      <div className="content-wrapper">
        <Outlet /> {/* Renderiza o conteúdo da rota atual */}
      </div>
    </div>
  );
};

export default MainLayout;
