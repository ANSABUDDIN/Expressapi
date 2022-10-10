// routes/router.js

const express = require('express');
const router = express.Router();
const {genSaltSync , hashSync ,compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../config/database');
const userMiddleware = require('../middleware/users.js');

// routes/router.js
router.get("/", (req, resp) => {
  pool.query("select * from user", (err, result) => {

    if (err) {
      resp.send("error")
    }
    else {
      resp.send(result)
    }
  })
});



router.post('/sign-up', userMiddleware.validateRegister, (req, res, field) => {
  const mydata = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  pool.query(
    `SELECT * FROM user WHERE email = ?;`, [mydata.email],
    (err, result) => {
      if (result && result.length) {
        return res.status(409).send({
          msg: 'This email is already in use!'
        });
      } else {
        const salt = genSaltSync(10);
        mydata.password = hashSync(mydata.password, salt);
        pool.query('INSERT INTO user SET ?', mydata, (error, result) => {

          // if (error) error;
          // resp.send(result);
          if (error) {
            console.log(error);
          }
          return res.status(200).json({
            success: 1,
            message: "User Register Sucessfully",
            data: result
          });
        });

      }
    }
  );
});



// routes/router.js

router.post('/login', (req, res, field) => {
  pool.query(
    `SELECT * FROM users WHERE email = ?;` , [req.body.email],
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }

          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );

            pool.query(
              `UPDATE users SET last_login = now() WHERE id = '?'`
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
});
router.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;