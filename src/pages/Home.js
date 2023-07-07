// Home.js
import React from 'react';
import Header from '../components/Header';
import Thumb01 from '../img/thumb01.webp';
import '../styles/Home.css';
import Footer from '../components/Footer';



const Home = () => {
  return (
    <>
    <Header />
    <div className="home-container">
      <div className="content-container">
        <span className='attention'>ATENÇÂO</span>
        <h3 className="title-home">Seu primeiro depósito será dobrado</h3>
        <p className="description-home primary">Promoção válida para até R$400 reais de depósito.</p>
      
        <img src={Thumb01} alt="Thumbnail" className="thumbnail" />
        <div className="buttons-social-container">
          <a href="https://t.me/mysterybetcomunidade" target="_blank" 
          rel="noopener noreferrer"  className="telegram-button">
            Entre no nosso Telegram
          </a>
          <a href="https://www.instagram.com/olucasbet_/" target="_blank" 
          rel="noopener noreferrer"  className="instagram-button">
          Seguir no Instagram
          </a>
          <a href="https://chat.whatsapp.com/KtQI4Mar3VW7qPlqxgOSuY" target="_blank" 
          rel="noopener noreferrer"  className="whatsapp-button">
            Entre no grupo do whatsapp
          </a>
        </div>
      </div>
      {/* o resto do seu código para a página Home vai aqui */}
    </div>
    <Footer />    
    </>
  );
}

export default Home;
