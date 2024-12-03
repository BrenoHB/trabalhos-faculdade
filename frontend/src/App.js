import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import IMC from './pages/IMC';
import AtFisica from './pages/AtFisica';
import Alimentacao from './pages/Alimentacao';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout'; // Certifique-se do caminho correto

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas protegidas com layout principal */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/imc" element={<IMC />} />
              <Route path="/atfisica" element={<AtFisica />} />
              <Route path="/alimentacao" element={<Alimentacao />} />
            </Route>
          </Route>

          {/* Rota padrão */}
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
