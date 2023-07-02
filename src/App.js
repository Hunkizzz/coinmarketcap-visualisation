import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Dimmer, Header, Icon } from 'semantic-ui-react';
import Keycloak from 'keycloak-js';
import Navbar from './component/Navbar';
import Layout from './component/Layout';
import { config } from './Constants';

export default function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloakInstance = new Keycloak({
        url: `${config.url.KEYCLOAK_BASE_URL}`,
        realm: 'SpringCryptoKeycloak',
        clientId: 'springboot-keycloak-client',
        promiseType: 'native',
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html"
      });

      try {
        await keycloakInstance.init({
          onLoad: 'check-sso',
          promiseType: 'native',
          pkceMethod: 'S256',
          checkLoginIframe: false
        });

        setKeycloak(keycloakInstance);
        setAuthenticated(keycloakInstance.authenticated);
      } catch (error) {
        console.error('Keycloak initialization error:', error);
      }
    };

    initKeycloak();
  }, []);

  const handleOnLoad = (authenticated) => {
    if (authenticated) {
      setAuthenticated(true);
    }
  };

  const handleOnLoadError = (error) => {
    console.error('Keycloak initialization error:', error);
  };

  const LoadingComponent = () => (
    <Dimmer inverted active={true} page>
      <Header style={{ color: '#4d4d4d' }} as="h2" icon inverted>
        <Icon loading name="cog" />
        <Header.Content>Keycloak is loading</Header.Content>
        <Header.Subheader style={{ color: '#4d4d4d' }}>
          or running authorization code flow with PKCE
        </Header.Subheader>
      </Header>
    </Dimmer>
  );

  if (!keycloak) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
          promiseType: 'native',
          pkceMethod: 'S256',
          checkLoginIframe: false,
          onLoad: handleOnLoad,
          onLoadError: handleOnLoadError
        }}
      >
        <Router>
          <Navbar  authenticated={authenticated} />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/dashboard" element={<Layout />} /> */}
            {authenticated && <Route path="/dashboard" element={<Layout />} />}
          </Routes>
        </Router>
      </ReactKeycloakProvider>
    </div>
  );
}