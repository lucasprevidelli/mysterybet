import React, { useState, useEffect } from 'react';
import circuloImg from '../img/circulo.png';
import estrelaImg from '../img/estrela.png';
import moment from 'moment';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Spinner from '../components/Spinner'; 
import { FiAlertTriangle } from 'react-icons/fi'; // Importe o ícone que você quer usar


function Mines() {
  const [matrixElements, setMatrixElements] = useState(createInitialMatrix());
  const [hackStatus, setHackStatus] = useState({ isDisabled: false, text: 'Hackear' });
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // Adicione este estado para a mensagem de erro
  const originalButtonColor = '#007BFF';  // Altere isto para a cor original do botão

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    const senha = localStorage.getItem('senha');
    const hash = localStorage.getItem('hash');

    var formdata = new FormData();
    formdata.append("jogo", "Mines");
    formdata.append("usuario", usuario);
    formdata.append("senha", senha);
    formdata.append("hash", hash);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://universidadebet.com.br/proxyTest06.php", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result); // Mostrar a resposta no console

        // Verifique se a resposta foi bem-sucedida
        if(result.success === false) {
          setErrorMessage('Não foi possível abrir o jogo nesse momento.');
          setIsLoading(false);
          return;
        }

        // Certifique-se de que a resposta realmente contém uma URL antes de tentar usá-la
        if (result && result.gameUrl) {
          setErrorMessage(null); // Limpe a mensagem de erro se a chamada fetch for bem-sucedida
          setUrl(result.gameUrl);
        }
        setIsLoading(false);  // Atualizar o estado isLoading quando a solicitação estiver completa
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);  // Atualizar o estado isLoading mesmo em caso de erro
      });
  }, []);

  const currentTimePlus2Minutes = moment().add(2, 'minutes').format('HH:mm');

  function createInitialMatrix() {
    const matrix = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push(circuloImg);
      }
      matrix.push(row);
    }
    return matrix;
  }

  function hackearMatrix() {
    if (!hackStatus.isDisabled) {
      setHackStatus({ isDisabled: true, text: 'Buscando Sinal...' });

      setTimeout(() => {
        const newMatrixElements = createInitialMatrix();
        const starPositions = new Set();

        while (starPositions.size < 3) {
          const randomRow = Math.floor(Math.random() * 5);
          const randomColumn = Math.floor(Math.random() * 5);

          starPositions.add(`${randomRow},${randomColumn}`);
        }

        starPositions.forEach((position) => {
          const [row, column] = position.split(',');
          newMatrixElements[row][column] = estrelaImg;
        });

        setMatrixElements(newMatrixElements);
        setHackStatus({ isDisabled: false, text: 'Hackear' });
      }, 5000);
    }
  }

  function renderMatrix() {
    return matrixElements.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((element, columnIndex) => (
          <div key={columnIndex}>
            <img src={element} alt="Circle" />
          </div>
        ))}
      </div>
    ));
  }

  return (
    <>
      <Header />
      <div className="mines-container">
        <div className="row">
          <div className="column info">
            <div className="input-mines">
              <span className="input-label">Validade</span>
              <input type="text" id="validade-input" value={currentTimePlus2Minutes} className="validade-input" />
            </div>
            <div className="input-mines">
              <span className="input-label">Minas</span>
              <input type="text" id="minas-input" value="3" className="minas-input" />
            </div>
            <div className="hackear">
              <button 
                className="button-hackear" 
                onClick={hackearMatrix} 
                disabled={hackStatus.isDisabled} 
                style={{ backgroundColor: hackStatus.isDisabled ? 'red' : originalButtonColor }}>
                {hackStatus.text}
              </button>
            </div>
          </div>
          <div className="column mines">
            {renderMatrix()}
          </div>
        </div>
        {errorMessage && (
          <div className="error-container">
            <FiAlertTriangle />
            {errorMessage}
          </div>
        )}
        {isLoading ? <Spinner /> : url && <iframe className='iframe' src={url} title="Content" />}
      </div>
      <Footer />
    </>
  );
}

export default Mines;