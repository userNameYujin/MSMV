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

//비밀번호 변경
router.post('/passwordModify', async (req, res, next) => {
  //비밀번호 확인'
  //console.log("아이디",req.body.id);
  const input_pw = req.body.oldPassword;
  //compare로 비교{
  db.query('SELECT password FROM users where id = ?', [req.body.id], function(hash, error){
    bcrypt.compare(input_pw, hash, function(err, result){
      if(err){
        console.log("hash", hash);
        console.log("bcrypt.compare error");
        next(err);
      }
      else{
        if(!result){
          res.status(200).send({code : 400, message : '비밀번호가 일치하지 않습니다.'});
        }
        else{
            const plain_pw = req.body.newPassword;
            //기존 비밀번호와 일치
            bcrypt.compare(plain_pw, hash, function(err, result){
              if(err){
                next(err);
              }
              if(result){
                res.status(200).send({code : 400, message : '기존 비밀번호와 일치합니다.'});
              }
              else{
                db.query('UPDATE users SET password = ? where id = ?', [plain_pw, req.body.id], function(err, result){
                  if(err) next(err);
                })
                res.status(200).send({code : 200, message : '비밀번호가 변경되었습니다.'});
              }
            })
          }
        }
      })
    })
})

  // bcrypt.hash(input_pw, 12, async function(err, hash){
  //   if(err){
  //     next(err)
  //   }
  //   else{
  //     await db.query('SELECT password FROM users where id = ?', [req.body.id], (pw, err)=>{
  //       if(err){
  //         throw(err);
  //       }
  //       else if (pw != hash){
  //         res.status(400).send({code : 400, message : '비밀번호가 일치하지 않습니다'});
  //       }
  //       else if (pw === hash){
  //         async(req, res, next) =>{
  //           let plain_pw = req.body.newPassword;
  //           if(input_pw === plain_pw){
  //             res.status(400).send({code : 400, message : '새 비밀번호가 기존 비밀번호와 일치합니다'});
  //           }
  //           bcrypt.hash(plain_pw, 12, function(err, hash){
  //             if(err) next(err);
  //             else{
  //               db.query('UPDATE users SET password = ? WHERE id = ?', [hash, req.body.id])
  //               res.status(200).send({code : 200, message : '비밀번호가 변경되었습니다.'});
  //             }
  //           })
  //         }
  //       }
  //     })
  //   }
  // })

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