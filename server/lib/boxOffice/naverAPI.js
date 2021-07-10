const request = require('request');



function getMovieList(option, rank){ //박스오피스 검색시 사용
    //console.log('옵션',option)
    return new Promise(resolve=>{
        request.get({
            uri: 'https://openapi.naver.com/v1/search/movie.json',
            qs: option,
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
        },function(err, res, body){
            
            //console.log('바디',body);
            let movieData = JSON.parse(body);
            //console.log('무비데이터',movieData.items[0])
            if(movieData.items[0] === undefined){
                return resolve(false)
            }
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

function getMovieListDir(option,dirName){ //감독으로 검색 시 사용
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
            
            let movieData = JSON.parse(body);
            //console.log('sadfasfsadf',movieData.display)
            if(movieData.items[0]!==undefined){
                for(let i=0; i<movieData.display; i++){     
                    if(movieData.items[i].director.includes(dirName)){
                        real = movieData.items[i]
                    }
                }
            }
            if(real.title!==undefined){
                let boxOfficeData = { //데이터 골라서 넣기
                    "title" : real.title,
                    //"image" : movieData.items[0].image,
                    //"director" : movieData.items[0].director,
                    //"actor" : movieData.items[0].actor,
                    "movieCd" : real.link.split('code=')[1],
                    "rate" : real.userRating,
                }
                //console.log(boxOfficeData)
                resolve(boxOfficeData)
            }else{
                resolve(false)
            }
            
            
        })
    })
}

function getMovieListNm(option){ //영화명으로 검색 시 사용
    return new Promise(resolve=>{
        request.get({
            uri: 'https://openapi.naver.com/v1/search/movie.json',
            qs: option,
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
        },function(err, res, body){
            let movieData = JSON.parse(body);
            let searchList = new Array();
            for(let i=0; i<movieData.items.length; i++){
                searchList.push({'title' : movieData.items[i].title,
                                 'movieCd' : movieData.items[i].link.split("code=")[1],
                                 'rate' : movieData.items[i].userRating
                                })
            }
            resolve(searchList);

        })
    })
}
module.exports = {getMovieList, getMovieListDir, getMovieListNm};