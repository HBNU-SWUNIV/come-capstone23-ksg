const express = require('express');
const router = express.Router();

const control = require('../src/customer/control');
const users = require('../data/users.json');

router.post("/", control.getCustomer); // 요청을 control.js 에서 처리함

 /*router.get('/', function(req, res){                         // 요청이 들어오면 user의 [] 번째 데이터를 반환.
    res.json({ user: users[2] });
    console.log('요청 오기는 왔음')
});

  router.post('/', function(req, res){
    let user = req.body;                                                //전송 받음 user 정보
    // 여기에서 다른 API(DB와 아이디 대조 API)로 데이터 보내고
    
    // 맞다 아니다만 여기로 보내서, res에 넣어주기.
  

    const member = users.find(m => m.id === user.id && m.password == user.pw);
    
    if(member) {
        res.send(member);

    }
    else {
        res.send(404);
    }
    user.id = user.id + '아이디 수정'                 // 수정 확인용
    user.pw = user.pw 
    user.name = user.name 

    //console.log(user.id, user.pw)
    //res.json({ user }) ;                 // res.json({ return 할 것 }) -> true, false 로만 보내는 게 좋아 보임
    
}); */

module.exports = router;
