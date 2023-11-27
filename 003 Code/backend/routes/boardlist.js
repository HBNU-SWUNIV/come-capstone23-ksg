const express = require('express');
const router = express.Router();
let boards = require('../data/board.json');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path'); 
const control = require('../src/customer/control');

var httpProxy  = require('http-proxy');

app.use(cookieParser());

function reloadBoards() {
    delete require.cache[require.resolve('../data/board.json')]; // 이전에 캐시된 데이터를 삭제
    boards = require('../data/board.json'); // 데이터를 새로 로드
}

router.get('/', function(req, res){
    res.send(boards);
});

router.get('/id/:id', function(req, res){
    const id = parseInt(req.params.id, 10);
    const board = boards.filter(function(board){
        return board.id === id;
    });
    var content = board[0].contents;
    content = content.replace(/snake\/[\w]*.[\w]*/gi, 'filters/filters_snake.png');
    board[0].contents= content;   
    console.log(content);
    res.send(board);
});

router.get('/true/:id', function(req, res){
    reloadBoards(); // 원본 데이터를 최신 상태로 로드
    const id = parseInt(req.params.id, 10);
    const board = boards.filter(function(board){
        return board.id === id;
    });
    res.set('Cache-Control', 'no-store');
    res.send(board);
});

router.get('/writer/:writer', function(req, res){
    const boardwriter = req.params.writer ;
    const board = boards.filter(function(board){
        return board.writer === boardwriter;
    });
    res.send(board);
});

router.get('/:topic', function(req, res){

    var proxy = httpProxy.createProxyServer({
        target: 'http://127.0.0.1:8097'
      });

    proxy.web(req,res)
    res = "주제 추출 시작"
    res.send(res)

});

router.get('/:title', function(req, res){
    const boardtitle = req.params.title;
    const board = boards.filter(function(board){
        return board.title === boardtitle;
    });
    res.send(board);
});

router.post('/:upload', async function(req, res){
    let board = req.body;
    let decoded;
    decoded = jwt.verify(req.cookies.token, "ksg");
    board.writer = decoded.name;

    const myPath = path.join(__dirname, '..', 'data', 'board.json');

    fs.readFile(myPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).send("Error reading the file.");
        }
        let parsedData = JSON.parse(data);
        parsedData.push(board);
        fs.writeFile(myPath, JSON.stringify(parsedData), (err) => {
            if (err) {
                console.error("Error writing the file:", err);
                return res.status(500).send("Error writing the file.");
            }
            console.log('boards update complete!');
            reloadBoards(); // 파일을 수정한 후 데이터를 다시 로드
            res.send('end');
        });
    });    
});

module.exports = router;
