import React, { useState, useEffect, useCallback } from 'react';
import circuloImg from '../img/circulo.png';
import estrelaImg from '../img/estrela.png';
import aviao from '../img/aviao.png';
import moment from 'moment';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Spinner from '../components/Spinner'; 
import { FiAlertTriangle } from 'react-icons/fi'; 

import '../styles/Esportes.css';

function Esportes() {

  return(
    <>
    <div className='center'>
    <h2>Em breve!</h2>
    <p className='green'>O melhor sinais esportivos do país.</p>
    </div>
    <Footer></Footer>
    </>
  )}


export default Esportes;
