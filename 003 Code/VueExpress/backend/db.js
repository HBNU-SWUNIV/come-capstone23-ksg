const Pool = require('pg').Pool;

const pool = new Pool ({
    user:"postgres",
    host:"localhost",
    database:"customer",
    password: "arsenalsaka7",
    port:5432,
});

module.exports = pool;


// db와 연결해주는 모듈