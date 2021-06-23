const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bcrypt = require('bcrypt');

//닉네임변경
router.post('/nickModify', async(req, res, next) => {
  await db.query('SELECT user_id FROM users where nickname = ?', [req.body.nickname], function(error, result){
    if (error) {
      next(error);
    }
    if (result.length === 0) {
      res.status(200).send({code : 200, message: '사용 가능한 닉네임입니다.'});
      db.query('UPDATE nickname FROM users where user_id = ?;', [req.params.user_id], function(error, result){ //user_id ??
        if(error){
          throw(error);
        }
      })
    }
    else{
      res.status(400).send({code : 400, message : '이미 사용 중인 닉네임입니다.'});
    }
  })
})

//비밀번호 변경
router.post('/passwordModify', async (req, res, next) => {
  //비밀번호 확인
  const input_pw = req.body.oldPassword;
  bcrypt.hash(input_pw, 12, function(err, hash){
    if(err){
      next(err)
    }
    else{
      await db.query('SELECT password FROM users where user_id = ?', [req.user.id], (pw, err)=>{
        if(err){
          throw(err);
        }
        else if (pw != hash){
          res.status(400).send({code : 400, message : '비밀번호가 일치하지 않습니다'});
        }
        else if (pw === hash){
          async(req, res, next) =>{
            let plain_pw = req.body.newPassword;
            if(input_pw === plain_pw){
              res.status(400).send({code : 400, message : '새 비밀번호가 기존 비밀번호와 일치합니다'});
            }
            bcrypt.hash(plain_pw, 12, function(err, hash){
              if(err) next(err);
              else{
                db.query('UPDATE users SET password = ? WHERE user_id = ?', [hash, req.user.id])
                res.status(200).send({code : 200, message : '비밀번호가 변경되었습니다.'});
              }
            })
          }
        }
      })
    }
  })
})

//회원탈퇴
router.get('/withdraw', async(req, res, next) => {
  const user_id = req.params.user_id;
  if(error){
    next(error);
  }
  await db.query('DELETE users WHERE user_id = ?', [user_id]);
  res.status(200).send({code : 200, message : '회원 탈퇴 완료'});
})