import React, { useState, useEffect, useCallback } from 'react';
import circuloImg from '../img/circulo.png';
import estrelaImg from '../img/estrela.png';
import aviao from '../img/aviao.png';
import moment from 'moment';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { FiAlertTriangle } from 'react-icons/fi';


import '../styles/Aviator.css';

const INITIAL_HACK_STATUS = { isDisabled: false, text: 'Hackear' };
const BUTTON_COLOR = '#007BFF';
const MESSAGES = ["Hackeando...", "Infiltrando...", "Modificando matrizes...", "Gerando sinais aleatórios..."];

function Aviator() {
  const [matrixElements, setMatrixElements] = useState(createInitialMatrix());
  const [hackStatus, setHackStatus] = useState(INITIAL_HACK_STATUS);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState('');
  const [nextCandleTime, setNextCandleTime] = useState(generateNextCandleTime());

  const handleFetchData = useCallback(() => {
    const formdata = createFormData();

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://universidadebet.com.br/proxyTest06.php", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        if (result.success === false) {
          setErrorMessage('Não foi possível abrir o jogo nesse momento.');
          setIsLoading(false);
          return;
        }

        if (result && result.gameUrl) {
          setErrorMessage(null);
          setUrl(result.gameUrl);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const handleHackMatrix = useCallback(() => {
    if (!hackStatus.isDisabled) {
      setHackStatus({ isDisabled: true, text: 'Buscando Sinal...' });
  
      const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setMessage(randomMessage);
      setNextCandleTime(generateNextCandleTime());
  
      const randomDelay = Math.floor(Math.random() * 9) + 1;
      setTimeout(() => {
        const newMatrixElements = createRandomMatrix();
        setMatrixElements(newMatrixElements);
  
        setHackStatus(INITIAL_HACK_STATUS);
      }, randomDelay * 1000);
    }
  }, [hackStatus]);


  const handleNextCandleTime = useCallback(() => {
    const currentTime = moment();
    const randomDelay = Math.floor(Math.random() * (120000 - 30000 + 1)) + 30000; // Random number between 30 seconds and 2 minutes
    const nextCandleTime = currentTime.add(randomDelay, 'milliseconds');
    setNextCandleTime(nextCandleTime);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = moment();
      if (currentTime.isSame(nextCandleTime, 'second')) {
        handleNextCandleTime();
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [nextCandleTime, handleNextCandleTime]);

  useEffect(() => {
    handleNextCandleTime();
  }, [handleNextCandleTime]);

  return (
    <>
      <Header />
      <div className="container-mines">
        <div className="input-mines">
          <img className='aviao' src={aviao} width={100} />
        </div>

        <div className="hackear">
          <div className="badget">
            Próxima vela acima de 2.0 às {moment(nextCandleTime).format('HH:mm:ss')}
          </div>
        </div>

        {errorMessage && (
          <div className="error-container">
            <FiAlertTriangle />
            {errorMessage}
          </div>
        )}

        <div className="iframe-container">
          {isLoading ? <Spinner /> : url && <iframe className='iframe' src={url} title="Content" />}
        </div>
      </div>
      <Footer />
    </>
  );
}


function createFormData() {
  const usuario = localStorage.getItem('usuario');
  const senha = localStorage.getItem('senha');
  const hash = localStorage.getItem('hash');

  var formdata = new FormData();
  formdata.append("jogo", "Aviator15x");
  formdata.append("usuario", usuario);
  formdata.append("senha", senha);
  formdata.append("hash", hash);

  return formdata;
}

function createInitialMatrix() {
  return createMatrix(circuloImg);
}

function createRandomMatrix() {
  const matrix = createInitialMatrix();
  const starPositions = new Set();

  while (starPositions.size < 3) {
    const randomRow = Math.floor(Math.random() * 5);
    const randomColumn = Math.floor(Math.random() * 5);

    starPositions.add(`${randomRow},${randomColumn}`);
  }

  starPositions.forEach((position) => {
    const [row, column] = position.split(',');
    matrix[row][column] = estrelaImg;
  });

  return matrix;
}

function createMatrix(fillValue) {
  const matrix = [];
  for (let i = 0; i < 5; i++) {
    const row = Array(5).fill(fillValue);
    matrix.push(row);
  }
  return matrix;
}

function generateNextCandleTime() {
  const currentTime = moment();
  const randomDelay = Math.floor(Math.random() * (120 - 47 + 1)) + 47; // Random number between 47 and 120
  const nextCandleTime = currentTime.add(randomDelay, 'seconds');
  return nextCandleTime;
}

export default Aviator;
