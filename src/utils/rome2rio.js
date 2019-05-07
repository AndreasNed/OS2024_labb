
const axios = require('axios');
const key = process.env.REACT_APP_ROME_2_RIO_API_KEY;

export default class rome2rio{

    static searchRoute = (from, to, filters) => {
        let filterQuery = "";
        if (filters.air){
            filterQuery = filterQuery.concat("&noAir=true");
        }
        if (filters.rail){
            filterQuery = filterQuery.concat("&noRail=true");
        }
        if (filters.bus){
            filterQuery = filterQuery.concat("&noBus=true");
        }
        if (filters.car){
            filterQuery = filterQuery.concat("&noCar=true");
        }
        return axios.get(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${from}&dName=${to}${filterQuery}`).then(response => response.data);
 
    }

    static autocomplete = async (query) => {
        return axios.get(`http://free.rome2rio.com/api/1.4/json/Autocomplete?key=${key}&query=${query}`).then(response => response.data);
    }



}