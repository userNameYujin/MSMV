const request = require('request')


function getMovieList(option, rank){ //박스오피스 검색시 사용
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

function getMovieList2(option,dirName){ //감독으로 검색 시 사용
    return new Promise(resolve=>{
        request.get({
            uri: 'https://openapi.naver.com/v1/search/movie.json',
            qs: option,
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
        },function(err, res, body){
            let real = new Object();
            
            movieData = JSON.parse(body);
            //console.log('sadfasfsadf',movieData.display)
            if(movieData.items[0]!==undefined){
                for(let i=0; i<movieData.display; i++){     
                    if(movieData.items[i].director.includes(dirName)){
                        real = movieData.items[i]
                    }
                }
            }
            
            //console.log(typeof(real.link), real)
            //movieData.items[0].rank = result.dailyBoxOfficeList[i].rnum;
           // console.log(movieData.item[0])
            if(real.title!==undefined){
                let boxOfficeData = { //데이터 골라서 넣기
                    "name" : real.title,
                    //"image" : movieData.items[0].image,
                    //"director" : movieData.items[0].director,
                    //"actor" : movieData.items[0].actor,
                    "movieCd" : real.link.split('code=')[1],
                    //"userRating" : movieData.items[0].userRating,
                }
                //console.log(boxOfficeData)
                resolve(boxOfficeData)
            }else{
                resolve(false)
            }
            
            
        })
    })
}
module.exports = {getMovieList, getMovieList2};