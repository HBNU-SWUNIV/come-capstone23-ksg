const express = require('express');
const router = express.Router();
const boards = require('../data/board.json');

const fs = require('fs');                                       // 게시글 저장용 임시
const path = require('path'); 

router.get('/', function(req, res){
    res.send(boards);
});

router.get('/id/:id', function(req, res){                             // 게시글 번호로 검색 했을 시 해당 번호 작성글 리턴
    const id = parseInt(req.params.id, 10);
    const board = boards.filter(function(board){
        return board.id === id;
    });
    res.send(board);
});

router.get('/writer/:writer', function(req, res){                                  // 작성자 이름으로 검색 했을 때.
    const boardwriter = req.params.writer ;
    const board = boards.filter(function(board){
        return board.writer === boardwriter;
    });
    res.send(board);
});

router.post('/:upload', function(req, res){
    let board = req.body;
    
    // get path
    const myPath = path.join(__dirname, '..', 'data', 'board.json');

    // read file
    fs.readFile(myPath, 'utf8', (err, data)=>{
        let parsedData = JSON.parse(data);
        parsedData.push(board);
        fs.writeFile(myPath, JSON.stringify(parsedData), (err)=>{
            if (err) throw err;
            console.log('boards update complete!');
            res.send('end');
        });
    });    
});

module.exports = router;