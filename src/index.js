import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        {/* <Route path="/crypto/:name" element={<CryptoChart  authed={true}/>} /> */}
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);