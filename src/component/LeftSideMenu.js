import React, { useState } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CryptoChart from '../chartPage/CryptoChart'; // Update the import statement
import '../static/css/styles.css'; // Import the CSS file

function LeftSideMenu({ cryptoData }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Categorize the crypto data into different parts
  const belowOneDollar = cryptoData.filter((crypto) => crypto.price < 1);
  const betweenOneAndHundred = cryptoData.filter(
    (crypto) => crypto.price >= 1 && crypto.price <= 100
  );
  const aboveHundred = cryptoData.filter((crypto) => crypto.price > 100);

  const handleSelect = (selected) => {
    setSelectedItem(selected);
  };

  const handleSearch = (event) => {
    setSelectedItem(null); // Clear selected item when search query changes
    setSearchQuery(event.target.value);
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

  const filteredCryptoData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNavItems = () => {
    if (searchQuery) {
      return filteredCryptoData.map((crypto) => (
        <NavItem key={`search/${crypto.name}`} eventKey={`search/${crypto.name}`}>
          <NavText>{crypto.name}</NavText>
        </NavItem>
      ));
    } else {
      const navItems = [];

      if (belowOneDollar.length > 0) {
        navItems.push(
          <NavItem eventKey="belowOneDollar" title="Меньше 1 доллара">
            <NavText>Меньше 1 доллара</NavText>
            {belowOneDollar.map((crypto) => (
              <NavItem
                key={`belowOneDollar/${crypto.name}`}
                eventKey={`belowOneDollar/${crypto.name}`}
              >
                <NavText>{crypto.name}</NavText>
              </NavItem>
            ))}
          </NavItem>
        );
      }

      if (betweenOneAndHundred.length > 0) {
        navItems.push(
          <NavItem eventKey="betweenOneAndHundred" title="От 1 до 100">
            <NavText>От 1 до 100</NavText>
            {betweenOneAndHundred.map((crypto) => (
              <NavItem
                key={`betweenOneAndHundred/${crypto.name}`}
                eventKey={`betweenOneAndHundred/${crypto.name}`}
              >
                <NavText>{crypto.name}</NavText>
              </NavItem>
            ))}
          </NavItem>
        );
      }

      if (aboveHundred.length > 0) {
        navItems.push(
          <NavItem eventKey="aboveHundred" title="Больше 100">
            <NavText>Больше 100</NavText>
            {aboveHundred.map((crypto) => (
              <NavItem
                key={`aboveHundred/${crypto.name}`}
                eventKey={`aboveHundred/${crypto.name}`}
              >
                <NavText>{crypto.name}</NavText>
              </NavItem>
            ))}
          </NavItem>
        );
      }

      return navItems;
    }
  };

  return (
    <div className="main-content">
      <div className="navbar">
        <SideNav onSelect={handleSelect} className="left-panel">
          <SideNav.Toggle />
          <input className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
          />
          <SideNav.Nav>
            {renderNavItems()}
          </SideNav.Nav>
        </SideNav>
      </div>
      <div>{renderChartComponent()}</div>
    </div>
  );
}

export default LeftSideMenu;