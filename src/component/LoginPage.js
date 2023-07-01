
import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import { config } from '../Constants';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Dimmer, Header, Icon, Button } from 'semantic-ui-react';

const LoginPage = ({ onLogin }) => {
    const [keycloak, setKeycloak] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const keycloakInstance = new Keycloak({
            url: `${config.url.KEYCLOAK_BASE_URL}`,
            realm: 'SpringCryptoKeycloak',
            clientId: 'springboot-keycloak-client',
        });

        keycloakInstance.init({
            onLoad: 'check-sso',
            promiseType: 'native',
            pkceMethod: 'S256',
        })
            .then((authenticated) => {
                setKeycloak(keycloakInstance);
                setAuthenticated(authenticated);
            })
            .catch((error) => {
                console.error('Keycloak initialization error:', error);
            });
    }, []);

    const handleLogin = () => {
        keycloak.login();
    };

    const LoadingComponent = () => (
        <Dimmer inverted active={true} page>
            <Header style={{ color: '#4d4d4d' }} as='h2' icon inverted>
                <Icon loading name='cog' />
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

    if (authenticated) {
        onLogin(keycloak);
        return null;
    }

    return (
        <div>
            <Button primary onClick={handleLogin}>
                Login
            </Button>
        </div>
    );
};

export default LoginPage;