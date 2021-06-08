const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.post('/review/write', async(req,res,next)=> {
  console.log("REVIEW");
  const contents = req.body.contents;
  const commenter = req.body.commenter;
  const rate = req.body.rate;
  const movieCd = req.body.movieCd;

  await db.query('INSERT INTO review(contents, commenter, rate, movieCd) values (?, ?, ?, ?)', [
    contents, commenter, rate, movieCd
  ], (error, result) =>{
    if(error) {
      next(error);
    }
    
    db.query('SELECT * FROM review WHERE movieCd = ?', [movieCd],
       (err, result) => {
       console.log(result);
       res.status(200),send({code: 200, result: result}) // 201 vs 200?
      });
  });
})

router.post('/', function(req, res){
  const movieCd = req.body.movieCd;
  db.query('select contents, created, updated, rate, nickname from review left join users on review.commenter = users.user_id WHERE movieCd = ?'), [movieCd],
  (err, result)=>{
    if(error){
      next(error);
    }
    console.log(result);
    res.status(200), send({code:200, result:result})
  }
})



router.post('/review/update', async(req, res, next) => {
  console.log("Update review");
  const id = req.body.id;
  await db.query('UPDATE review SET comments = ? WHERE id = ?', [contents, id])
  //유저 입장에서 자기가 글 쓴 게 몇번인지 알 수 있나?...뭘 받아와야할지....
})


router.get('/review/delete', (req, res, next) => {
  console.log("Delete review");
  const id = req.body.id; //마찬가지
  db.query('DELETE FROM review WHERE id = ?', [id]);
})

//moviecount테이블
get('/:movieCd', function(req, res, next){
  const movieCd = req.params.movieCd;
  db.query('SELECT movieCd FROM moviecount', function(error, results){
    if(error){
      throw(error);
    }
    else if(!results){ //null값
      db.query('INSERT INTO moviecount(movieCd, count) values (?, ?)', [
        movieCd, 1
      ])
      console.log('moviecount 테이블 갱신');
    }
    else{ //moviecount에 해당 영화가 있으면
      db.query('SELECT count FROM moviecount', function(error2, count){
        if(error2){
          throw(error2);
        }
        else{
          db.query('UPDATE moviecount SET count = ? WHERE movieCd = ?', [count + 1, movieCd]);
        }
      })
    }
  })
})

//자정에 todaymovie로 테이블 복사 후 moviecount테이블초기화 -> mysql 내 이벤트 스케쥴러 COPYmoviecount
//main에 todaymovie 출력
get('/', function(req, res){
  db.query('SELECT * FROM todaymovie ORDER BY count DESC LIMIT 10', function(error, movierank){
    if(error){
      throw(error);
    }
    
    console.log(movierank);
  })
})
module.exports = router;