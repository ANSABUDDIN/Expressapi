// index.js

const express = require('express');
const app = express();
const cors = require('cors');
const pool =require('./config/database');
const {genSaltSync , hashSync ,compareSync } = require('bcrypt');
const userMiddleware = require('./middleware/users.js');
const jwt = require('jsonwebtoken');
// set up port
const PORT = 5000;

app.use(express.json());
app.use(cors());

// add routes
// const router = require('./routes/routers');
// app.post('/sign-up', userMiddleware.validateRegister, (req, res, field) => {
//   const mydata = {
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password
//   }
//   pool.query(
//     `SELECT * FROM user WHERE email = ?;`, [mydata.email],
//     (err, result) => {
//       if (result && result.length) {
//         return res.status(409).send({
//           msg: 'This email is already in use!'
//         });
//       } else {
//         const salt = genSaltSync(10);
//         mydata.password = hashSync(mydata.password, salt);
//         pool.query('INSERT INTO user SET ?', mydata, (error, result) => {

//           // if (error) error;
//           // resp.send(result);
//           if (error) {
//             console.log(error);
//           }
//           return res.status(200).json({
//             success: 1,
//             message: "User Register Sucessfully",
//             data: result
//           });
//         });

//       }
//     }
//   );
// });
app.get("/", (req, resp) => {
    pool.query("select * from user", (err, result) => {
  
      if (err) {
        resp.send("error")
      }
      else {
        resp.send(result)
      }
    })
});

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));