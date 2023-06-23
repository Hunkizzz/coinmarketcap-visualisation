import React, { useState, useEffect } from 'react';
import LeftSideMenu from './LeftSideMenu'; // Update the import statement
import { Api } from '../api/Api';

function Layout({ children }) {
  const [cryptoData, setCryptoData] = useState([]);

  Api.getCryptoNames()
    .then((response) => {
      setCryptoData(response.data)
    })
    .catch(error => {
      console.error('Error fetching crypto data:', error);
    });


return (
  <LeftSideMenu cryptoData={cryptoData} />
);
}

export default Layout;