const express = require('express');
const router = express.Router();
const app = express();

const control = require('../src/customer/control');
const users = require('../data/users.json');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());
  
  router.post('/', function(req, res){                                              //전송 받음 user 정보
    const {id,pw} = req.body;
    const member = users.find(m => m.id === id && m.password == pw);
    console.log(member);
    if(member) {
        const Options = {
            domain:"localhost",
            Path:"/",
            httpOnly: true
        };
        const token = jwt.sign({
            userid: member.id,
            name: member.name,
        },'ksg',{
            expiresIn:"20m",
            issuer:"majorleague"
        });
        res.cookie("token", token,Options);
        return res.status(200).json(member);
    }
    else {
        res.send(404);
    }

    //console.log(user.id, user.pw)
    //res.json({ user }) ;                 // res.json({ return 할 것 }) -> true, false 로만 보내는 게 좋아 보임
    
}); 
/*
router.post('/', function(req, res){         
    console.log(req.cookies);  
    console.log("dfdfdf");
    
    // 요청이 들어오면 user의 [] 번째 데이터를 반환.
    if(req.cookies && req.cookies.account){
        const member = JSON.parse(req.cookies.account);

        if(member.id){
            return res.send(member);
        }
    }
});
*/
// router.post("/", control.getCustomer); // 요청을 control.js 에서 처리함

/*
router.get('/', function(req, res){                         // 요청이 들어오면 user의 [] 번째 데이터를 반환.
    res.json({ user: users[2] });
    console.log('요청 오기는 왔음')
});
*/

module.exports = router;
