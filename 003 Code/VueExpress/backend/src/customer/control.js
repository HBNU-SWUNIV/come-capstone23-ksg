
const pool = require('../../db');
const queries = require('./queries');

const getCustomer = (req, res) =>{
    pool.query(queries.getCustomer ,(error, results) =>{
        if (error) throw error;
        
        const {id,pw} = req.body;
        users = results.rows;
        const member = users.find(m => m.userid === id && m.userpw == pw);
        if(member) {
            res.status(200).json(results.rows);
        }
        else {
            res.send(404);
        }
        // res.status(200).json(results.rows);
    });
}

const registerCustomer=(req , res) =>{
    userid = req.body.ID;
    userpw = req.body.password;
    nickname = req.body.name;
    email = req.body.email;


    pool.query(queries.registerCustomer, [ userid , userpw , nickname , email],(error,results) => {
        if(error) throw error;
        res.status(201).send("회원가입이 완료되었습니다.");

    });
}
// 요청을 컨트롤하는 컨트롤러 
module.exports ={
    getCustomer,
    registerCustomer,
}
