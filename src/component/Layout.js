import React, { useState, useEffect } from 'react';
import LeftSideMenu from './LeftSideMenu'; // Update the import statement

function Layout({ children }) {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8095/coinmarketcap/api/current_crypto_currency')
      .then(response => response.json())
      .then(data => setCryptoData(data))
      .catch(error => {
        console.error('Error fetching crypto data:', error);
      });
  }, []);

  return (
      <LeftSideMenu cryptoData={cryptoData} />
  );
}

export default Layout;