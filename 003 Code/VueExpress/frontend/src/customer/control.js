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
    const userinfo = {
        id:"",
        pw: "",
        name:""
    }
    pool.query(queries.getCustomer ,(error, results) =>{
        if (error) throw error;
        
        const {id,pw} = req.body;
        users = results.rows;
        const member = users.find(m => m.userid === id && m.userpw == pw);
        if(member) {

            userinfo.id = member.userid;
            userinfo.pw = member.userpw;
            userinfo.name = member.nickname;

            const Options = {
                domain:"localhost",
                Path:"/",
                httpOnly: true
            };
            const token = jwt.sign({
                userid: member.userid,
                name: member.nickname,
                serialID: member.id,
            },'ksg',{
                expiresIn:"20m",
                issuer:"majorleague"
            });
            res.cookie("token", token,Options);
            res.status(200).json(member);
        }
        else {
            res.send(404);
        }
        // res.status(200).json(results.rows);
    });
}
const getpassword = (req, res) =>{
    pool.query(queries.getCustomer, (error, results) =>{
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
    boardid = req.body.id;
    customerid = decoded.serialID;
    writer = decoded.name;
    year = req.body.year;
    month = req.body.month;
    day = req.body.day;
    contents = req.body.contents;
    pool.query(queries.registercomment, [ boardid, writer , year , month,day,contents,customerid],(error,results) => {
        if(error) throw error;
        res.status(201).send("댓글이 등록되었습니다..");
    });
        // res.status(200).json(results.rows);
}
const getcommentdetail=(req , res) =>{
    const boardid = parseInt(req.params.id);
    pool.query(queries.getcommentdetail, [boardid],(error, results) =>{
        if (error) throw error;
        comments = JSON.stringify(results.rows);
        
        const obj = JSON.parse(comments, function(k, v) {
            if (k === "boardid") {
                this.id = v;
                return; 
            }
            return v;
        });
        res.send(obj);
        });
}
const getcommentlist=(req , res) =>{
    pool.query(queries.getcommentlist ,(error, results) =>{
        if (error) throw error;
       
        comments = JSON.stringify(results.rows);
        
        const obj = JSON.parse(comments, function(k, v) {
            if (k === "boardid") {
                this.id = v;
                return; 
            }
            return v;
        });
        res.send(obj);
    });
}
  
const registerCustomer=(req , res) =>{
    userid = req.body.ID;
    userpw = req.body.password;
    nickname = req.body.name;
    email = req.body.email;
    console.log("....");

      pool.query(queries.registerCustomer, [ userid , userpw , nickname , email],(error,results) => {
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
    pool.query(queries.registerboard, [ writer , year , month,day,title,contents,customerid],(error,results) => {
        if(error) throw error;
        res.status(201).send("게시글이 등록되었습니다..");
    });
}
const getboarddetail=(req , res) =>{
    const boardid = parseInt(req.params.id);
    pool.query(queries.getboarddetail, [boardid],(error, results) =>{
        if (error) throw error;
        boards = JSON.stringify(results.rows);
        
        const obj = JSON.parse(boards, function(k, v) {
            if (k === "boardid") {
                this.id = v;
                return; 
            }
            return v;
        });
        res.send(obj);
        });
}

const searchwriter=(req , res) =>{
    const boardwriter = req.params.writer ;
    pool.query(queries.searchwriter, ["%"+boardwriter+"%"],(error, results) =>{
        if (error) throw error;
            res.status(200).json(results.rows);
        });
}

const searchtitle=(req , res) =>{
    const boardtitle = req.params.title;
    pool.query(queries.searchtitle, ["%"+boardtitle+"%"],(error, results) =>{
        if (error) throw error;
            res.status(200).json(results.rows);
        });
}
const getboard=(req , res) =>{
    pool.query(queries.getboard ,(error, results) =>{
        if (error) throw error;
       
        boards = JSON.stringify(results.rows);
        
        const obj = JSON.parse(boards, function(k, v) {
            if (k === "boardid") {
                this.id = v;
                return; 
            }
            return v;
        });
        res.send(obj);
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
}
