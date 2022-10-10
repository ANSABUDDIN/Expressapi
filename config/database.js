// 
const { createPool } = require("mysql");

const pool = createPool({
    // connectionLimit : 1000,
    // connectTimeout  : 60 * 60 * 1000,
    // acquireTimeout  : 60 * 60 * 1000,
    // timeout         : 60 * 60 * 1000,
    host            : 'sql.freedb.tech',
    user            : 'freedb_ansab',
    password        : 'gwhA#rE2AtG6ZQf',
    database        : 'freedb_marketplace_db'
   
});

module.exports = pool;