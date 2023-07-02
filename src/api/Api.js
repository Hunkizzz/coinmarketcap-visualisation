import axios from "axios";


export const Api = {
    getAllCryptoCurrencies(token) {
        return axios.get('http://localhost:8095/coinmarketcap/api/history/crypto',
            { headers: { 'Authorization': `Bearer ${token}` } });
    },
    getSingleCryptoCurrency(name, token) {
        return axios.get('http://localhost:8095/coinmarketcap/api/history/crypto/' + name,
            { headers: { 'Authorization': `Bearer ${token}` } });
    },
    getCryptoNames(token) {
        return axios.get('http://localhost:8095/coinmarketcap/api/history/crypto_currency',
            { headers: { 'Authorization': `Bearer ${token}` } });
    }
};