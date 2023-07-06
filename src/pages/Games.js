import React from 'react';
import { Link } from 'react-router-dom';
import aviator from '../img/aviator.png';
import fortune from '../img/fortune.png';
import mines from '../img/mines.png';
import roleta from '../img/roleta.png';
import lock from '../img/lock.png';
import logo from '../img/logo.png';
import Header from '../components/Header';
import Footer from '../components/Footer';



function Games() {
  const handleGameClick = (event) => {
    // Cancel the navigation if the game is locked
    if (event.currentTarget.getAttribute('data-locked') === 'true') {
      event.preventDefault();
    }
  };

  return (
    <>
      <Header />
      <div className="games-container">
        <h1>Qual jogo você quer jogar?</h1>
        <div className="game-images">
          <Link to="/mines">
            <div className="game-image">
              <img src={mines} alt="Game 1" onClick={handleGameClick} />
            </div>
          </Link>
          <Link to="/tiger">
            <div className="game-image">
              <img src={fortune} alt="Game 2" onClick={handleGameClick} />
            </div>
          </Link>
        </div>
        <div className="game-images">
          <Link to="/aviator" onClick={handleGameClick}>
            <div className="game-image">
              <img src={aviator} alt="Game 3" />
            </div>
          </Link>
          <Link to="/roleta" onClick={handleGameClick}>
            <div className="game-image">
              <img src={roleta} alt="Game 3" />
            </div>
          </Link>

        </div>
      </div>
      <Footer />    
4
    </>
  );
}

export default Games;
