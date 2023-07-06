import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiMonitor, FiActivity } from 'react-icons/fi';
import { FaDice } from 'react-icons/fa';

function Footer() {
  const location = useLocation();

  return (
    <footer id="footer">
      <div className="footer-link">
        <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
          <FiHome size={20} />
          <span>Home</span>
        </Link>
      </div>
      <div className="footer-link">
        <Link to="/games" className={location.pathname === '/games' ? 'active' : ''}>
          <FaDice size={20} />
          <span>Cassino</span>
        </Link>
      </div>
      <div className="footer-link">
        <Link to="/esporte" className={location.pathname === '/esporte' ? 'active' : ''}>
          <FiActivity size={20} />
          <span>Esportes</span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;

