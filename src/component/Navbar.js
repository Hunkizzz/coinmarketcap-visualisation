import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import 'semantic-ui-css/semantic.min.css';

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
    <div>
      <Menu stackable>
        <Container>
          <Menu>
            <Menu.Item header>Finance UI</Menu.Item>
            <Menu.Item as={NavLink} exact to="/" onClick={handleLogInOut}>
              {getLogInOutText()}
            </Menu.Item>
            <Menu.Item as={NavLink} to="/dashboard">Dashboard</Menu.Item>
          </Menu>
        </Container>
      </Menu>
    </div>
  );
}

export default Navbar;