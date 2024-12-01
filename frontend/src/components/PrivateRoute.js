import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Supondo que você tenha esse contexto

const PrivateRoute = () => {
  const { authenticated  } = useContext(AuthContext); // Verifica se o usuário está autenticado
  console.log('Autenticação:', authenticated );

  if (!authenticated ) {
    // Se não estiver autenticado, redireciona para o login
    return <Navigate to="/login" replace />;
  }

  // Caso contrário, renderiza as rotas privadas
  return <Outlet />;
};

export default PrivateRoute;
