const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const request = require('request')
const boxOffice = require('../lib/boxOffice');
const axios = require('axios');
const cheerio = require('cheerio');

router.post('/review/write', async(req,res,next)=> {
  console.log("REVIEW");
  const contents = req.body.contents;
  const commenter = req.body.commenter;
  const rate = req.body.rate;
  const movieCd = req.body.movieCd;

  await db.query('INSERT INTO review(contents, commenter, rate, movieCd) values (?, ?, ?, ?)', [
    contents, commenter, rate, movieCd], async (error, result) =>{
    if(error) {
      next(error);
    }
    
    await db.query('SELECT * FROM review WHERE movieCd = ?', [movieCd],
       (err, result2) => {
         if(err){
           next(err);
         }
         console.log(result2);
         if(result2[0]){
          res.status(200).send({code: 200, result: result2}) 
         }else{
           res.status(400).send({code: 400, message: "에러"})
         }
      });
  });
})




router.post('/review/update', async(req, res, next) => {
  console.log("Update review");
  //req.body.id 는 리뷰의 id
  await db.query('SELECT commenter FROM review WHERE id=?',[req.body.id], async(error,result)=>{
    if(error){
      next(error);
    }
    if(req.user.id===result[0].commenter){
      await db.query('UPDATE review SET comments = ? WHERE id = ?', [contents, req.body.id]);
      res.status(200).send({code:200, result:result});
    } else{
      res.status(400).send({code:400, message : "내가 쓴 리뷰가 아닙니다."});
    }
  })

})




router.post('/review/delete', async (req, res, next) => {
  console.log("Delete review");
  await db.query('SELECT commenter FROM review WHERE id=?',[req.body.id], async(error,result)=>{
    if(error){
      next(error);
    }
    if(req.user.id===result[0].commenter){
      await db.query('DELETE FROM review WHERE id = ?', [req.body.id]);
      res.status(200).send({code:200, message : "리뷰가 삭제되었습니다."});
    } else{
      res.status(400).send({code:400, message : "내가 쓴 리뷰가 아닙니다."});
    }
  })
})



//moviecount테이블조작, 디테일페이지 영화정보



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
              "image": $(".poster").find("img").attr("src"),
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
  
  async function getName2(targetDt){
      let mvName = await boxOffice.movieData(targetDt);
      return mvName.boxOfficeResult
      //console.log(mvName.boxOfficeResult);
  }
  let a = getName2(targetDt);
  
  
  a.then(function(result){
      let movieData;
      
      let movieList = new Array();
      //let movieTT = new Array();
      let checkLength = result.dailyBoxOfficeList.length;
      for(let i=0; i<result.dailyBoxOfficeList.length; i++){
          let year = result.dailyBoxOfficeList[i].openDt.split('-')[0];
              const option = {
              query : result.dailyBoxOfficeList[i].movieNm,
              start :1,
              display:1,
              yearfrom:year-1,
              yearto:year,
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
          }, async function (err, res, body){
              movieData = JSON.parse(body);
              //console.log(movieData);
              if(movieData.items[0] !== undefined){
                movieData.items[0].rank = result.dailyBoxOfficeList[i].rnum;
                let boxOfficeData = { //데이터 골라서 넣기
                  "rank" : movieData.items[0].rank,
                  "name" : movieData.items[0].title,
                  "image" : movieData.items[0].image,
                  "director" : movieData.items[0].director,
                  "actor" : movieData.items[0].actor,
                  "movieCd" : movieData.items[0].link.split('code=')[1],
                  "userRating" : movieData.items[0].userRating,
               }
              
                movieList.push(boxOfficeData);
              } else{
                checkLength--;
              }
              

              //console.log(movieData.items[0].rank);
              
              if(movieList.length===checkLength){
                  movieList.sort(function(a,b){
                      return parseFloat(a.rank)-parseFloat(b.rank)
                  })
                  //console.log(movieList);
                  
                  // movies = {
                  //     "boxOffice" : movieList
                  // }
                  console.log(movieList);
                  if(movieList){
                    response.status(200).send({code : 200, result : movieList});
                  }else{
                    response.status(400).send({code : 400, result : '에러'});
                  }
                  
              }
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
          "image": $(".poster").find("img").attr("src"),
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


