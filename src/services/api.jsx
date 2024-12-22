import axios from 'axios';


const API_URL = 'http://demo-api.syaifur.io'; 

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;
