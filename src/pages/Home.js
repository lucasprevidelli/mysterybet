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
        <h2 className="title-home">Seu primeiro depósito será dobrado</h2>
        <p className="description-home primary">Promoção válida para até R$400 reais de depósito.</p>
      
        <img src={Thumb01} alt="Thumbnail" className="thumbnail" />
        <div className="buttons-social-container">
          <a href="" target="_blank" 
          rel="noopener noreferrer"  className="telegram-button">
            Entre no nosso Telegram
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
