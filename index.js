// index.js

const express = require('express');
const app = express();
const cors = require('cors');
const pool =require('./config/database')

// set up port
const PORT = 5000;

app.use(express.json());
app.use(cors());

// add routes
const router = require('./routes/routers');
app.use('/', router);
// app.get("/", (req, resp) => {
//     pool.query("select * from user", (err, result) => {
  
//       if (err) {
//         resp.send("error")
//       }
//       else {
//         resp.send(result)
//       }
//     })
//   });

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));