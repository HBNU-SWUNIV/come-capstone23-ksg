const maria = require('mysql');


const conn = maria.createConnection({
    host:'localhost',
    port:3306,
    user:'',
    passwod:'ksg5678!',
    database:'projectDB',
});

module.exports = conn;




/* const Pool = require('pg').Pool;

const pool = new Pool ({
    user:"postgres",
    host:"localhost",
    database:"customer",
    password: "arsenalsaka7",
    port:5432,
});

module.exports = pool; */


// db와 연결해주는 모듈