import React from 'react';
import '../styles/Spinner.css';

const Spinner = ({ text = "Carregando..." }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <div className="spinner-text">{text}</div>
    </div>
  );
}

export default Spinner;
