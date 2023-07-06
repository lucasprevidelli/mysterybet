// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';
import Games from './pages/Games';
import Bonus from './pages/Bonus';
import Header from './components/Header';
import Mines from './pages/Mines';
import Aviator from './pages/Aviator';
import Home from './pages/Home';
import Esportes from './pages/Esportes';
import Tiger from './pages/Tiger';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import './styles/Footer.css';
import Error404 from './pages/Error404';

function App() {
  return (
    <Router>
      <div>
        <div className="background-gradient"></div>
        <div class="container">
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/games" element={<PrivateRoute><Games /></PrivateRoute>} />
            <Route path="/bonus" element={<PrivateRoute><Bonus /></PrivateRoute>} />
            <Route path="/mines" element={<PrivateRoute><Mines /></PrivateRoute>} />
            <Route path="/tiger" element={<PrivateRoute><Tiger /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/esportes" element={<PrivateRoute><Esportes /></PrivateRoute>} />
            <Route path="/aviator" element={<PrivateRoute><Aviator /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><Games /></PrivateRoute>} />
          </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
