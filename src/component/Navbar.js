import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

function Navbar(props) {
  const { keycloak } = useKeycloak();
  const authenticated = keycloak.authenticated;

  const handleLogInOut = () => {
    if (authenticated) {
      keycloak.logout();
    } else {
      keycloak.login();
    }
  };

  const getLogInOutText = () => {
    return authenticated ? 'Logout' : 'Login';
  };

  return (
    <Menu stackable>
      <Container>
        <Menu>
          <Menu.Item as={NavLink} exact to="/login" onClick={handleLogInOut}>
            {getLogInOutText()}
          </Menu.Item>
        </Menu>
      </Container>
    </Menu>
  );
}

export default Navbar;