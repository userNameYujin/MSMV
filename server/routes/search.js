const express = require('express');
const router = express.Router();
const axios = require('axios');
const utf8 = require('utf8');
const request = require('request')

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
            request.get({
                uri: 'https://openapi.naver.com/v1/search/movie.json',
                qs: option,
                headers: {
                    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
                }
            }, async function (err, res, body) {
                
                let movieData = JSON.parse(body);
            
                let searchList = new Array();
                for(let i=0; i<movieData.items.length; i++){
                    searchList.push({'title' : movieData.items[i].title,
                                     'image' : movieData.items[i].image,
                                     'movieCd' : movieData.items[i].link.split("code=")[1],
                                     'rate' : movieData.items[i].userRating
                                    })
                    if(searchList.length===movieData.items.length){
                        searchList.sort(function(a,b){
                            return parseFloat(b.rate)-parseFloat(a.rate)
                        })
                    }
                    
                    
                }
                console.log(searchList);
                if(searchList.length>0){
                    response.status(200).send({code : 200, result : searchList});
                } else{
                    response.status(400).send({code : 400, message : "해당 제목의 영화가 없습니다."});
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
                    //console.log(response.data.movieListResult.movieList);
                    resultMovies = new Array();
                    let result = response.data.movieListResult.movieList
                    for(let i=0; i<result.length; i++){
                        //console.log(res[i].movieNm)
                        resultMovies.push({'movieName' : result[i].movieNm,
                                            'prdtYear' : result[i].prdtYear})
                    }
                    callback(resultMovies)
                }) 
            }
            
            searchMovieDir(req.body.dirNm,function(res){
                
                if(res.length===0){
                    response.status(400).send({code : 400, message : "해당 감독의 영화가 없습니다."});
                }
                let searchList = new Array();
                checkLength = res.length; //영화진흥원 데이터에는 있는데 네이버 데이터에 없을 경우 체크
                for(let i=0; i<res.length; i++){
                    
                    const option = {
                        query : res[i].movieName,
                        start :1,
                        display:1,
                        yearfrom:res[i].prdtYear,
                        yearto:res[i].prdtYear,
                        sort :'sim',
                        filter:'small',
                    
                    }
                    request.get({
                        uri: 'https://openapi.naver.com/v1/search/movie.json',
                        qs: option,
                        headers: {
                            'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                            'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
                        }
                    }, async function (err, res2, body) {
            
            
                        let movieData = JSON.parse(body);
                        if(movieData.items[0] !== undefined){
                            searchList.push({'title' : movieData.items[0].title,
                                'image' : movieData.items[0].image,
                                'movieCd' : movieData.items[0].link.split("code=")[1],
                                'rate' : movieData.items[0].userRating
                            })
                        }else{
                            checkLength--;
                        }
    
                        if(searchList.length === checkLength){
            
                            searchList.sort(async function(a,b){
                                return parseFloat(b.rate)-parseFloat(a.rate)
                            })
                            console.log(searchList);
                            
                            if(searchList.length>0){
                                response.status(200).send({code : 200, result : searchList});
                            }
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