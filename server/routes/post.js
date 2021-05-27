const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.post('/review/write', async(req,res,next)=> {
  console.log("REVIEW");
  const contents = req.body.contents;
  const commenter = req.body.commenter;
  const rate = req.body.rate;
  const movieCd = req.body.movieCd;

  await db.query(`INSERT into review(contents, commenter, rate, movieCd) values (?, ?, ?, ?)`, [
    contents, commenter, rate, movieCd
  ], (error, result) =>{
    if(error) {
      next(error);
    }
    
    db.query(`select * from table where movieCd = ?`, [movieCd],
       (err, result) => {
       console.log(result);
       res.status(200),send({code: 200, result: result})
      });
  });
})