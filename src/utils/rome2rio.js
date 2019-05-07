
const axios = require('axios');
const key = process.env.REACT_APP_ROME_2_RIO_API_KEY;

export default class rome2rio{

    static searchRoute = (from, to) => {
        return axios.get(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${from}&dName=${to}`).then(response => response.data);
 
    }

    static autocomplete = async (query) => {
        return axios.get(`http://free.rome2rio.com/api/1.4/json/Autocomplete?key=${key}&query=${query}`).then(response => response.data);
    }



}