import React, { useState, useEffect } from 'react';
import circuloImg from '../img/circulo.png';
import estrelaImg from '../img/estrela.png';
import moment from 'moment';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner'; 
import { FiAlertTriangle } from 'react-icons/fi';

import '../styles/Tiger.css';

function Tiger() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [numJogadas, setNumJogadas] = useState(() => {
    const storedValue = Number(localStorage.getItem('numJogadas'));
    return storedValue || Math.floor(Math.random() * 13) + 7;
  });
  const [validade, setValidade] = useState(() => {
    const storedValue = localStorage.getItem('validade');
    return storedValue ? moment(storedValue) : moment().add(5, 'minutes');
  });
  const [randomTimes, setRandomTimes] = useState([]);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    const senha = localStorage.getItem('senha');
    const hash = localStorage.getItem('hash');

    var formdata = new FormData();
    formdata.append("jogo", "Fortune Tiger");
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
        if(result.success === false) {
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

  function getRandomTime(usedTimes) {
    const currentMoment = moment();
    const randomMinutes = Math.floor(Math.random() * 31); // Diferença de até 30 minutos
    const randomTime = currentMoment.add(randomMinutes, 'minutes');
    const randomNum = Math.floor(Math.random() * 12) + 5; // Número aleatório entre 5 e 16
    const formattedTime = randomTime.format('HH:mm');
  
    // Verifica se o horário já foi utilizado
    if (usedTimes.includes(formattedTime)) {
      return getRandomTime(usedTimes); // Chama recursivamente a função para obter um novo horário
    }
  
    return { time: formattedTime, num: randomNum };
  }
  
  useEffect(() => {
    const times = [];
    const usedTimes = [];
  
    for (let i = 0; i < 5; i++) {
      const randomTime = getRandomTime(usedTimes);
      times.push(randomTime);
      usedTimes.push(randomTime.time);
    }
  
    times.sort((a, b) => moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm')));
    setRandomTimes(times);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (moment().isSameOrAfter(validade)) {
        const newJogadas = Math.floor(Math.random() * 13) + 7;
        setNumJogadas(newJogadas);
        localStorage.setItem('numJogadas', newJogadas);

        const newValidade = moment().add(5, 'minutes');
        setValidade(newValidade);
        localStorage.setItem('validade', newValidade.toISOString());
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [validade]);

  return (
    <>
      <Header />
      <div className="mines-container">
        <div className="row">
          </div>
          <div className="column">
          <h3>Horários Pagantes</h3>
          <ul>
            {randomTimes.map((item, index) => (
              <span key={index}>
                <span className="budget">{item.time} | {item.num} tentativas </span>
              </span>
            ))}
          </ul>
        </div>

        {errorMessage && (
          <div className="error-container">
            <FiAlertTriangle />
            {errorMessage}
          </div>
        )}
        {isLoading ? <Spinner /> : url && <iframe className='iframe' src={url} title="Content" />}
        </div>
        <Footer></Footer>
    </>
  );
}

export default Tiger;
