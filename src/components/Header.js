// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png'; // Insira o caminho correto do logo aqui
import '../styles/Header.css'; // Importando o arquivo CSS do cabeçalho

const Header = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario') || '';

  const handleLogout = () => {
    localStorage.removeItem('serverResponse');
    localStorage.removeItem('usuario');
    localStorage.removeItem('senha');
    navigate('/login');
  }

  return (
    <header className="app-header">
      <img src={logo} alt="Logo" className="logo-header"/>
      <div className="welcome-section">
        <span>Bem vindo, <b>{usuario}</b></span>
      </div>
      <Link to="/login" onClick={handleLogout} className="logout-link">Sair</Link>
    </header>
  );
}

export default Header;
