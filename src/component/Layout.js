import React, { useState, useEffect } from 'react';
import LeftSideMenu from './LeftSideMenu'; // Update the import statement
import { Api } from '../api/Api';
import { useKeycloak } from '@react-keycloak/web';
function Layout({ children }) {
  const { keycloak } = useKeycloak();
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    Api.getCryptoNames(keycloak.token)
      .then((response) => {
        setCryptoData(response.data)
      })
      .catch(error => {
        console.error('Error fetching crypto data:', error);
      });
  }, []);

  return (
    <LeftSideMenu cryptoData={cryptoData} />
  );
}

export default Layout;