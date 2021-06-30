const request = require('request')


function getMovieList(option, rank){
    return new Promise(resolve=>{
        request.get({
            uri: 'https://openapi.naver.com/v1/search/movie.json',
            qs: option,
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
        },function(err, res, body){
            movieData = JSON.parse(body);
            //movieData.items[0].rank = result.dailyBoxOfficeList[i].rnum;
            let boxOfficeData = { //데이터 골라서 넣기
                "rank" : rank,
                "name" : movieData.items[0].title,
                //"image" : movieData.items[0].image,
                //"director" : movieData.items[0].director,
                //"actor" : movieData.items[0].actor,
                "movieCd" : movieData.items[0].link.split('code=')[1],
                //"userRating" : movieData.items[0].userRating,
            }
            resolve(boxOfficeData)
        })
    })
}
module.exports = {getMovieList};