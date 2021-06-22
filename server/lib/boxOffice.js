const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

function movieData(targetDt){
    return axios.get( `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.serviceKey}&targetDt=${targetDt}`).then(response =>{
        //console.log("movie.js",response.data);
        return response.data
    })

}

 module.exports = {movieData};