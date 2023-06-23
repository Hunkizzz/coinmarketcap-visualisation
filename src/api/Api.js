import axios from "axios";

export const Api = {
    getAllCryptoCurrencies() {
        return axios.get('http://localhost:8095/coinmarketcap/api/history/crypto');
    },
    getSingleCryptoCurrency(name) {
        return axios.get('http://localhost:8095/coinmarketcap/api/history/crypto/' + name);
    },
    getCryptoNames() {
        return axios.get('http://localhost:8095/coinmarketcap/api/history/crypto_currency');
    }
};