const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../lib/db');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'password',
      },
      function (username, password, done) {
        db.query('SELECT * FROM users WHERE user_id=?', [username],(err, result) => {
          if (err) {
            return done(err);
          }
          if (result[0]) {
            bcrypt.compare(password, result[0].password, function (err, check) {
              if (check) {
                return done(null, result[0]);
              } else {
                return done(null, false, { message: '비밀번호가 올바르지 않습니다.' });
              }
            });
          } else {
            return done(null, false, { message: '아이디가 올바르지 않습니다.' });
          }
        });
      }
    )
  );
};