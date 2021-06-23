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
router.post('/passwordModify', (req, res, next) => {
  let plain_password = req.body.password;
  bcrypt.hash(plain_password, 12, function(err, hash){
    if(err){
      next(err);
    }
    else{
      db.query('UPDATE users SET password = ? WHERE user_id = ?', [hash, req.params.user_id])
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
})