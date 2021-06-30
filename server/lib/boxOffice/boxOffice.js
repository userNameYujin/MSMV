const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

function movieData(targetDt){ //박스오피스
    return axios.get( `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.serviceKey}&targetDt=${targetDt}`).then(response =>{
        return response.data
    })

}

function movieData2(movieCd){ //영화상세보기
    return axios.get( `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.serviceKey}&movieCd=${movieCd}`).then(response =>{  
        return response.data
    })

}

module.exports = {movieData,movieData2};