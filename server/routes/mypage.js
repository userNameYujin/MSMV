const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bcrypt = require('bcrypt');

//닉네임변경
router.post('/nickModify/:id', async(req, res, next) => {
  await db.query('SELECT id FROM users where nickname = ?', [req.body.nickname], function(error, result){
    if (error){
      next(error);
    }
    else if (result.length > 0){
      res.status(200).send({code : 400, message : '이미 사용 중인 닉네임입니다.'});
    }
    else{
      db.query('UPDATE users SET nickname = ? where id = ?;',[req.body.nickname, req.params.id], function(error2, result2){
        if (error2){
          next(error2);
        }
        console.log("체크");
        res.status(200).send({code : 200, message : '닉네임 변경이 완료되었습니다.'});
      })
    }
  })
})


router.post('/passwordModify', async (req, res, next) => {
  const old_pw = JSON.stringify(req.body.oldPassword);
  const new_pw = req.body.newPassword;
  let check = 0;

  await db.query('SELECT password FROM users where id = ?', [req.body.id], function(error, hash){
    if(error){
      console.log("쿼리문 에러");
      next(error);
    }
    console.log("해시는 ", hash);
    bcrypt.compare(old_pw, hash, function(err, result){
      if(err){
        console.log("bcrypt.compare 오류");
        next(err);
      }else if(result == true){
        check = 1;
      }
    })
  })

  if(check == 0){
    console.log("비밀번호 불일치");
    res.status(400).send({code : 400, message : '비밀번호가 일치하지 않습니다.'});
  }else{
    //기존 비밀번호와 동일한지 여부 확인
    if(old_pw === new_pw){
      res.status(400).send({code : 400, message : '기존 비밀번호와 일치합니다.'});
    }
    else{
      bcrypt.hash(new_pw, 12, async (err, hash)=>{
        if(err) next(err);
        await db.query('UPDATE users SET password = ? where id = ?', [hash, req.body.id], (err, result) =>{
          if(err) next(err);
          res.status(200).send({code : 200, message : '비밀번호가 성공적으로 변경되었습니다.'});
        })
      })
    }  
  }
})

//회원탈퇴
router.post('/withdraw', async(req, res, next) => {
  const id = req.body.id;
  await db.query('DELETE FROM users WHERE id = ?', [id], function(err, result){
    if(err){
      next(err);
    }
    else{
      res.status(200).send({code : 200, message : '회원 탈퇴 완료'});
    }
  })
})

module.exports = router;