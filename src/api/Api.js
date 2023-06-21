import axios from "axios";

export const Api = {
    getAllCryptoCurrencies() {
        return axios.get('http://localhost:8095/coinmarketcap/api/crypto');
    },
    getSingleCryptoCurrency(name) {
        return axios.get('http://localhost:8095/coinmarketcap/api/crypto/' + name);
    }
};