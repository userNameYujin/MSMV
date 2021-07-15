const express = require('express');
const router = express.Router();
const axios = require('axios');
const utf8 = require('utf8');
const request = require('request')

const cheerio = require('cheerio');
const naverAPI = require('../lib/boxOffice/naverAPI');
const crawling = require('../lib/boxOffice/crawling');
const movieData = require('../lib/boxOffice/movieData');

router.post('/',(req,response)=>{
    console.log('search start')
    console.log(req.body.check)
    if(req.body.check===1){ //제목으로 검색
        console.log('제목으로 검색')
        if(req.body.movieNm === undefined){
            response.status(400).send({code : 400, message : "제목을 입력해 주세요"});
        }else{
            const option = {
                query : req.body.movieNm,
                start :1,
                display:20,
                sort :'sim',
                filter:'small',
            
            }
            let movieListNm = new Array();
            naverAPI.getMovieListNm(option)
            .then(function(result){
                //let resultLen = result.length;

                for(let i=0; i<result.length; i++){
                    crawling.parsing(result[i].movieCd,result[i],function(res){
                         movieListNm.push(res);

                        if(movieListNm.length === result.length){
                            movieListNm.sort(function(a,b){
                                return parseFloat(b.rate)-parseFloat(a.rate)
                            })
                            response.status(200).send({code : 200, result : movieListNm});
                        }
                    })
                }
            })
        }
        
    }
    else if(req.body.check===2){ //감독명으로 검색
        console.log("감독명으로 검색");
        if(req.body.dirNm === undefined){
            response.status(400).send({code : 400, message : "감독명을 입력해 주세요"});
        } else{
            function searchMovieDir(directorNm, callback){
                dirNm = utf8.encode(directorNm);
                return axios.get( `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.serviceKey}&directorNm=${dirNm}`).then(response =>{
                    resultMovies = new Array();
                    let result = response.data.movieListResult.movieList
                    for(let i=0; i<result.length; i++){
                        resultMovies.push({'movieName' : result[i].movieNm,
                                            'prdtYear' : result[i].prdtYear})
                    }
                    callback(resultMovies)
                })
            }
            
            searchMovieDir(req.body.dirNm,function(res){
                let checkLength =res.length
                
                let movieList = new Array();
                for(let i=0; i<res.length; i++){
                    let prdtYear = res[i].prdtYear;
                    const option = {
                        query : res[i].movieName,
                        start : 1,
                        display : 5,
                        yearfrom : prdtYear,
                        yearto : prdtYear,
                        sort : 'sim',
                        filter : 'small',
                    }
                    naverAPI.getMovieListDir(option,req.body.dirNm)
                    .then(function(result2){
                        
                        if(!result2){
                            checkLength--;
                        }else{
                            crawling.parsing(result2.movieCd,result2,function(res){
                                movieList.push(res);
                                if(movieList.length === checkLength){
                                    movieList.sort(function(a,b){
                                        return parseFloat(b.rate)-parseFloat(a.rate)
                                    })
                                    console.log(movieList);
                                    response.status(200).send({code : 200, result : movieList});
                                    
                                }
                            })
                        }
                    })
                }
            })
        }
        
    }
    else{
        response.status(400).send({code : 400, message : "감독명이나 영화로 검색해주세요(check에러)"});
    }
})

module.exports = router;