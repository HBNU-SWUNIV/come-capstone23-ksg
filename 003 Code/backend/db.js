const maria = require('mysql');


const pool = maria.createConnection({
    host:'localhost',
    port:3306,
    user:'ksg',
    password:'Wildturkey101',
    database:'projectDB'
});

module.exports = pool;




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