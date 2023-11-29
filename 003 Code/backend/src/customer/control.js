const express = require('express');
const pool = require('../../db');
const queries = require('./queries');
// const { smtpTransport } = require('../../config/email.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const app = express();
app.use(cookieParser());
const getCustomer = (req, res) =>{
    userid=req.body.id;
    userpw=req.body.pw;

    pool.query(queries.getCustomer ,[userid, userpw], function(error, results, fields) {
        if (error) throw error;
        if(results.length > 0) {
            const Options = {
                domain:"localhost",
                Path:"/",
                httpOnly: true
            };
            const token = jwt.sign({
                userid: results[0].userid,
                name: results[0].nickname,
                serialID: results[0].id,
            },'ksg',{
                expiresIn:"1d",
                issuer:"majorleague"
            });
            console.log(results[0].userid);
            res.cookie("token", token,Options);
            res.status(200).json(results[0]);
        }
        else {
            res.send(404);
        }
        // res.status(200).json(results.rows);
    });
}

const checknickname = (req, res) =>{
    nickname=req.body.checkname;

    pool.query(queries.checknickname ,[nickname], function(error, results, fields) {
        if (error) throw error;
        if(results.length > 0) {
            res.send(404);
        }
        else {
            console.log(results);
            res.send(results);
        }
    });
}
const checkregister = (req, res) =>{
    userid=req.body.IDcheck;

    pool.query(queries.checkregister ,[userid], function(error, results, fields) {
        if (error) throw error;
        if(results.length > 0) {
            res.send(404);
        }
        else {
            console.log(results);
            res.send(results);
        }
    });
}
const getpassword = (req, res) =>{
    pool.query(queries.getCustomer, function(error, results, fields){
        if (error) throw error;
        const {email} = req.body;
        users = results.rows;
        const member = users.find(m => m.email === email);
        if(member) {
            res.status(200).json(results.rows);
        }
        else {
            res.send(404);
        }
        // res.status(200).json(results.rows);
    });
}
const registercomment = (req, res) =>{
    let decoded;
    decoded = jwt.verify(req.cookies.token, "ksg");
    boardid =Number(req.body.id);
    customerid = decoded.serialID;
    writer = decoded.name;
    year = req.body.year;
    month = Number(req.body.month);
    day = Number(req.body.day);
    contents = req.body.contents;
    pool.query(queries.registercomment, [customerid,boardid, writer , year , month,day,contents] ,function(error, results, fields) {
        if(error) throw error;
        res.status(201).send("댓글이 등록되었습니다..");
    });
        // res.status(200).json(results.rows);
}
const getcommentdetail=(req , res) =>{
    id = parseInt(req.params.id);
    pool.query(queries.getcommentdetail, [id],function(error, results, fields) {
        if (error) throw error;
        res.send(results);

        });
}
const getcommentlist=(req , res) =>{
    pool.query(queries.getcommentlist ,function(error, results, fields){
        if (error) throw error;
       
        res.send(results);
    });
}
  
const registerCustomer=(req , res) =>{
    userid = req.body.ID;
    userpw = req.body.password;
    nickname = req.body.name;
    email = req.body.email;
    console.log("....");

      pool.query(queries.registerCustomer, [ userid , userpw , nickname , email],function(error, results, fields) {
        if(error) throw error;
        res.status(201).send("회원가입이 완료되었습니다.");
    });
}
const registerboard=(req , res) =>{
    let decoded;
    decoded = jwt.verify(req.cookies.token, "ksg");
    customerid = decoded.serialID;
    writer = decoded.name;
    year = req.body.year;
    month = req.body.month;
    day = req.body.day;
    title = req.body.title;
    contents = req.body.contents;
    pool.query(queries.registerboard, [writer , year , month,day,title,contents,customerid],function(error, results, fields) {
        if(error) throw error;
        res.status(201).send("게시글이 등록되었습니다..");
    });
}
const getboarddetail=(req , res) =>{
    const boardid = parseInt(req.params.id);
    pool.query(queries.getboarddetail, [boardid],function(error, results, fields){
        if (error) throw error;
        res.send(results);
        });
}

const searchwriter=(req , res) =>{
    const boardwriter = req.params.writer ;
    pool.query(queries.searchwriter, ["%"+boardwriter+"%"],function(error, results, fields){
        if (error) throw error;
            res.status(200).json(results.rows);
        });
}

const searchtitle=(req , res) =>{
    const boardtitle = req.params.title;
    pool.query(queries.searchtitle, ["%"+boardtitle+"%"],function(error, results, fields){
        if (error) throw error;
            res.status(200).json(results.rows);
        });
}
const getboard=(req , res) =>{
    pool.query(queries.getboard ,function(error, results, fields){
        if (error) throw error;
        console.log();
        res.send(results);

        
    });
}
/*
/ min ~ max까지 랜덤으로 숫자를 생성하는 함수 
var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }

  const SendEmail = (req, res) => {
        const number = generateRandom(111111,999999)

        const { email } = req.body;

        const mailOptions = {
            from: "gang471342@naver.com",
            to: email,
            subject: "테스트용 메일 인증 관련 이메일 입니다",
            text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
        };


        const result = smtpTransport.sendMail(mailOptions, (error, responses) => {
            return res.status(201).send("메일이 보내졌습니다.");
            smtpTransport.close();

        });
    }*/
// 요청을 컨트롤하는 컨트롤러 
module.exports ={
    getCustomer,
    registerCustomer,
    registerboard,
    getboard,
    getboarddetail,
    searchwriter,
    searchtitle,
    registercomment,
    getcommentdetail,
    getcommentlist,
    checkregister,
    checknickname,
}
