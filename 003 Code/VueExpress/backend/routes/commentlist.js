const express = require('express');
const router = express.Router();
const comments = require('../data/comment.json');

const fs = require('fs');                                       // 게시글 저장용 임시
const path = require('path'); 

router.get('/', function(req, res){
    res.send(comments);
});

router.get('/id/:id', function(req, res){                             // 게시글 번호로 검색 했을 시 해당 번호 작성글 리턴
    const id = parseInt(req.params.id, 10);
    const comment = comments.filter(function(comment){
        return comment.id === id;
    });
    res.send(comment);
});

router.post('/:upload', function(req, res){
    let comment = req.body;
    
    // get path
    const myPath = path.join(__dirname, '..', 'data', 'comment.json');

    // read file
    fs.readFile(myPath, 'utf8', (err, data)=>{
        let parsedData = JSON.parse(data);
        parsedData.push(comment);
        fs.writeFile(myPath, JSON.stringify(parsedData), (err)=>{
            if (err) throw err;
            console.log('comments update complete!');
            res.send('end');
        });
    });    
});

module.exports = router;