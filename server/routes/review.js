const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.post('/', async(req,res,next)=> {
    console.log("REVIEW");
    const contents = req.body.contents;
    const commenter = req.body.commenter;
    const rate = req.body.rate;
    const movieCd = req.body.movieCd;
    const movieTitle = req.body.movieTitle;
  
    await db.query('INSERT INTO review(contents, commenter, rate, movieCd, movieTitle) values (?, ?, ?, ?, ?)', [
      contents, commenter, rate, movieCd, movieTitle], async (error, result) =>{
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
  
  
  
  
  router.patch('/', async(req, res, next) => {
    console.log("Update review");
    //req.body.id 는 리뷰의 id
    await db.query('SELECT commenter FROM review WHERE id=?',[req.body.id], async(error,result)=>{
      if(error){
        next(error);
      }
      if(req.body.user_id===result[0].commenter){
        await db.query('UPDATE review SET comments = ?, updated = ? WHERE id = ?', [req.body.contents, now(), req.body.id]);
        res.status(200).send({code:200, result:result});
      } else{
        res.status(400).send({code:400, message : "내가 쓴 리뷰가 아닙니다."});
      }
    })
  
  })
  
  
  
  
  router.delete('/:id/:user_id', async (req, res, next) => {
    console.log("Delete review");
    console.log(`req.params.id ${req.params.id}`);
    console.log(`req.params.user_id ${req.params.user_id}`);
    await db.query('SELECT commenter FROM review WHERE id=?',[req.params.id], async(error,result)=>{
      if(error){
        next(error);
      }
      
      if(Number(req.params.user_id)===result[0].commenter){
        await db.query('DELETE FROM review WHERE id = ?', [req.params.id]);
        res.status(200).send({code:200, message : "리뷰가 삭제되었습니다."});
      } else{
        res.status(400).send({code:400, message : "내가 쓴 리뷰가 아닙니다."});
        console.log(400);
      }
    })
  })


  module.exports = router;