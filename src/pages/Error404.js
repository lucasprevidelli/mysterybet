// Home.js
import React from 'react';
import '../styles/Home.css';


const Error404 = () => {
  return (
    <>
    <div className="home-container">
      <div className="content-container">
        <span className='attention'>ATENÇÂO</span>
        <h2 className="title-home">Essa página não existe.</h2>
      </div>
      {/* o resto do seu código para a página Home vai aqui */}
    </div>
    </>
  );
}

export default Error404;
