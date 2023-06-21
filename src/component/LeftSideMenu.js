import React, { useState } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CryptoChart from '../chartPage/CryptoChart'; // Update the import statement
import { Api } from '../api/Api'

function LeftSideMenu({ cryptoData }) {
  const [selectedItem, setSelectedItem] = useState(null);
  // Categorize the crypto data into different parts
  const belowOneDollar = cryptoData.filter((crypto) => crypto.price < 1);
  const betweenOneAndHundred = cryptoData.filter(
    (crypto) => crypto.price >= 1 && crypto.price <= 100
  );
  const aboveHundred = cryptoData.filter((crypto) => crypto.price > 100);

  const handleSelect = (selected) => {
    setSelectedItem(selected);
  };

  const renderChartComponent = () => {
    if (selectedItem) {
      const category = selectedItem.substring(0, selectedItem.indexOf('/'));
      const name = selectedItem.substring(selectedItem.indexOf('/') + 1);
      const match = {
        params: {
          name: name,
        },
      };
      return <CryptoChart category={category} match={match} />;
    }
    return null;
  };

  return (
    <div>
      <SideNav onSelect={handleSelect}>
        <SideNav.Toggle />
        <SideNav.Nav>
          <NavItem eventKey="less">
            {belowOneDollar.map((crypto) => (
              <NavItem eventKey={`less/${crypto.name}`}>
                <NavText>{crypto.name}</NavText>
              </NavItem>
            ))}
            <NavText>Меньше 1 доллара</NavText>
          </NavItem>

          <NavItem eventKey="between">
            {betweenOneAndHundred.map((crypto) => (
              <NavItem eventKey={`between/${crypto.name}`}>
                <NavText>{crypto.name}</NavText>
              </NavItem>
            ))}
            <NavText>От 1 до 100</NavText>
          </NavItem>

          <NavItem eventKey="above">
            {aboveHundred.map((crypto) => (
              <NavItem eventKey={`above/${crypto.name}`}>
                <NavText>{crypto.name}</NavText>
              </NavItem>
            ))}
            <NavText>Больше 100</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      {renderChartComponent()}
    </div>
  );
}

export default LeftSideMenu;