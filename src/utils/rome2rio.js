
const axios = require('axios');
const key = process.env.REACT_APP_ROME_2_RIO_API_KEY;

export default class rome2rio{

    static searchRoute = (from, to, filters) => {
        let filterQuery = "";
        /*filterQuery = (filters.air ? filterQuery.concat("&noAir=true") : filterQuery);
        filterQuery = (filters.rail ? filterQuery.concat("&noRail=true") : filterQuery);
        filterQuery = (filters.bus ? filterQuery.concat("&noBus=true") : filterQuery);
        filterQuery = (filters.car ? filterQuery.concat("&noCar=true") : filterQuery)*/
        return axios.get(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${from}&dName=${to}${filterQuery}`).then(response => response.data);
 
    }

    static autocomplete = async (query) => {
        return axios.get(`http://free.rome2rio.com/api/1.4/json/Autocomplete?key=${key}&query=${query}`).then(response => response.data);
    }



}