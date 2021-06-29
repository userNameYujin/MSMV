const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const request = require('request')
const boxOffice = require('../lib/boxOffice/boxOffice');
const axios = require('axios');
const cheerio = require('cheerio');
const naverAPI = require('../lib/boxOffice/naverAPI');
const crawling = require('../lib/boxOffice/crawling');
const movieData = require('../lib/boxOffice/movieData');

router.get('/detail/:movieCd', async function(req, response, next){
  const movieCd = req.params.movieCd;
  await db.query('SELECT movieCd FROM moviecount', async function(error, results){
    if(error){
      throw(error);
    }
    if(results.length===0){ //null값

      await db.query('INSERT INTO moviecount(movieCd, count) values (?, ?)', [
        movieCd, 1
      ])
      console.log('moviecount 테이블 갱신');
    }
    else{ //moviecount에 해당 영화가 있으면
      await db.query('SELECT count FROM moviecount', async function(error2, count){
        if(error2){
          throw(error2);
        }
        else{
          await db.query('UPDATE moviecount SET count = ? WHERE movieCd = ?', [count[0].count + 1, movieCd]);
        }
      })
    }

    await db.query('select review.id,contents, created, updated, rate, nickname from review left join users on review.commenter = users.id WHERE movieCd = ?', 
    [req.params.movieCd], async (error3, resultR)=>{
      if(error3){
        throw(error3)
      }
      else{

        const getHTML = async(keyword) => {
          try{
              return await axios.get("https://movie.naver.com/movie/bi/mi/basic.nhn?code="+keyword)
          }catch(err){
              console.log(err)
          }
          
      }

      const parsing = async(keyword,review, callback) => {
          const html = await getHTML(keyword);
          
          const $ = cheerio.load(html.data); //갖고온 html코드는 data안에 들어온다.
      //    const $itemList = $(".poster")
      
          let item = new Object();
          let show = false;
          let title = $(".mv_info").find(`h3>a`).text()
          if(title.includes('상영중')){
              title = title.split('상영중')[0];
              show = true;
          }else{
              title = title.substring(0,title.length/2);
          }
          let summary = $(".story_area").find(".con_tx").text()
          let $peopleList = $(".people >ul > li")
          let people = new Object();
          let peopleArray = new Array();
      
          $peopleList.each((idx,node)=>{
              const peopleImage = $(node).find("img").attr("src")
              const peopleName =  $(node).find(".tx_people").text()
              const peopleJob =$(node).find(".staff").text().trim()
              people = {
                  "peopleImage" : peopleImage,
                  "peopleName" : peopleName,
                  "peopleJob" : peopleJob,
              }
              peopleArray.push(people);
          })
          let genre = $(".info_spec").find("span:first").text().trim()
          let country = $(".info_spec").find("span:eq(1)").text().trim()
          let time = $(".info_spec").find("span:eq(2)").text().trim()
          let date = $(".info_spec").find("span:eq(3)").text().trim()
          let grade = $(".info_spec").find("span:eq(4)").text().trim()
      
          grade = grade.replace(/(\r\n\t|\n|\r\t|\t)/gm,"")
          date = date.replace(/(\r\n\t|\n|\r\t|\t)/gm,"")
          genre = genre.replace(/(\r\n\t|\n|\r\t|\t)/gm,"")
      
          item = {
              "image": $(".mv_info_area").find("img").attr("src"),
              //"title": $(".mv_info").find(`h3>a`).text(),
              "title": title,
              "show" : show,
              "summary": summary,
              //"movieCd": keyword,
              "people" : peopleArray,
              "genres" : genre,
              "country" : country,
              "runningTime" : time,
              "openDt" : date,
              "grade" : grade,
              "review" : review
          }
          callback(item);
      }

      parsing(movieCd,resultR,function(res){
          //console.log(res);
          console.log(res)
          if(res){
            response.status(200).send({code : 200, result : res});
          }else{
            response.status(400).send({code : 400, result : '에러'});
          }
      })

      }
  })
  })
})


router.get('/boxOffice', function(req, response){

  

  let movies = new Object();
  let now = new Date();	// 현재 날짜 및 시간

  let yesterday = new Date(now.setDate(now.getDate() - 1));	// 어제
  
  let yy = yesterday.toString().split(' ');

  let month = function(d){
      if(d[1]==='Jan'){
          return '01'
      } else if(d[1] === 'Feb'){
          return '02'
      } else if(d[1] === 'Mar'){
          return '03'
      } else if(d[1] === 'Apr'){
          return '04'
      } else if(d[1] === 'May'){
          return '05'
      } else if(d[1] === 'Jun'){
          return '06'
      } else if(d[1] === 'Jul'){
          return '07'
      } else if(d[1] === 'Aug'){
          return '08'
      } else if(d[1] === 'Sept'){
          return '09'
      } else if(d[1] === 'Oct'){
          return '10'
      } else if(d[1] === 'Nov'){
          return '11'
      } else if(d[1] === 'Dec'){
          return '12'
      }
  }
  
  let targetDt = yy[3]+month(yy)+yy[2];
  
  let a = movieData.getName(targetDt);
  
  a.then(function(result){
      let movieData;
      
      let movieList = new Array();
      //let movieTT = new Array();
      let checkLength = result.dailyBoxOfficeList.length;
      for(let i=0; i<result.dailyBoxOfficeList.length; i++){
        let prdtYear = result.dailyBoxOfficeList[i].prdtYear;
              const option = {
              query : result.dailyBoxOfficeList[i].movieNm,
              start :1,
              display:1,
              yearfrom:prdtYear,
              yearto:prdtYear,
              sort :'sim',
              filter:'small',
          }
          let rank = result.dailyBoxOfficeList[i].rnum
          naverAPI.getMovieList(option,rank)
          .then(function(result2){
                  
                crawling.boxOfficeParsing(result2.movieCd,result2,async function(res){
                    movieList.push(res);
                    /*
                    await db.query('insert into boxoffice(movierank,name,movieCd,image) values(?,?,?,?)',[res.rank*=1,res.name,res.movieCd,res.image],function(err,result){
                      if(err){
                        console.log('sql err');
                      }
                    })
                    */
                    if(i === result.dailyBoxOfficeList.length-1){
                        movieList.sort(function(a,b){
                            return parseFloat(a.rank)-parseFloat(b.rank)
                        })
                        movies = {
                            "boxOffice" : movieList
                        }
                        response.status(200).send({code:200, result:movies});
                    }
                })
          })
      }
  })
})


//자정에 todaymovie로 테이블 복사 후 moviecount테이블초기화 -> mysql 내 이벤트 스케쥴러 COPYmoviecount
//main에 todaymovie 출력
// get('/', function(req, res){
//   db.query('SELECT * FROM todaymovie ORDER BY count DESC LIMIT 10', function(error, movierank){
//     if(error){
//       throw(error);
//     }
    
//     console.log(movierank);
//   })
// })

router.get('/top10', async function(req, response){
  console.log('탑텐 시작')
  await db.query('SELECT * FROM todaymovie ORDER BY count DESC LIMIT 10', function(error, result){
    if(error){
      throw(error);
    }
    console.log('result',result);
    let movieCd = [];
    for(let i=0; i<result.length; i++){
      movieCd.push(result[i].movieCd)
    }
    console.log('movieCd',movieCd);
    const getHTML = async(keyword) => {
      try{
          return await axios.get("https://movie.naver.com/movie/bi/mi/basic.nhn?code="+keyword)
      }catch(err){
          console.log(err)
      }
  }
  console.log('영화코드',movieCd);
  const parsing = async(keyword, rank, callback) => {
      const html = await getHTML(keyword);
      
      const $ = cheerio.load(html.data); //갖고온 html코드는 data안에 들어온다.
  
      let item = new Object();
  
      let title = $(".mv_info").find(`h3>a`).text()
      if(title.includes('상영중')){
          title = title.split('상영중')[0];
      }else{
          title = title.substring(0,title.length/2);
      }
      item = {
          "image": $(".mv_info_area").find("img").attr("src"),
          "title": title,
          "movieCd": keyword,
          "rank": rank
      }
      callback(item);
  }
  let topMovies = [];
  for(let i=0; i<movieCd.length; i++){
      parsing(movieCd[i],i,function(res){
          topMovies.push(res);
          
          if(topMovies.length === movieCd.length){
              topMovies.sort(function(a,b){
                  return parseFloat(a.rank)-parseFloat(b.rank)
              })
              console.log(topMovies)
              if(topMovies){
                response.status(200).send({code : 200, result : topMovies});
              }else{
                response.status(400).send({code : 400, result : '에러'});
              }
              

          }
      })
  }
    
  })
})


module.exports = router;


