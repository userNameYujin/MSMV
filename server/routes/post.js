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
  db.query('select contents, created, updated, rate, nickname from review left join users on review.commenter = users.user_id WHERE movieCd = ?'), [movieCd],
  (err, result)=>{
    if(error){
      next(error);
    }
    console.log(result);
    res.status(200), send({code:200, result:result})
  }
})

router.post('/review/modify', (req, res, next) => {

}) //modify? update?


router.get('/review/delete', (req, res, next) => {
  
})

module.exports = router;