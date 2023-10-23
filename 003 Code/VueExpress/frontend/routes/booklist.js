const express = require('express');
const router = express.Router();
const books = require('../data/book.json');

const fs = require('fs');                                       // 게시글 저장용 임시
const path = require('path'); 

router.get('/', function(req, res){
    res.send(books);
});

router.get('/:id', function(req, res){                             // 게시글 번호로 검색 했을 시 해당 번호 작성글 리턴
    const bookid = parseInt(req.params.id, 10);
    const book = books.filter(function(book){
        return book.id === bookid;
    });
    res.send(book);
});

router.get('/:writer', function(req, res){                                  // 작성자 이름으로 검색
    const bookwriter = req.params.writer ;
    const book = books.filter(function(book){
        return book.writer === bookwriter;
    });
    res.send(book);
});

router.get('/:title', function(req, res){                             // 게시글 제목으로 검색
    const booktitle = req.params.title;
    const book = books.filter(function(book){
        return book.title === booktitle;
    });
    res.send(book);
});

router.post('/:upload', function(req, res){
    let book = req.body;
    
    // get path
    const myPath = path.join(__dirname, '..', 'data', 'book.json');

    // read file
    fs.readFile(myPath, 'utf8', (err, data)=>{
        let parsedData = JSON.parse(data);
        parsedData.push(book);
        fs.writeFile(myPath, JSON.stringify(parsedData), (err)=>{
            if (err) throw err;a
            console.log('books update complete!');
            res.send('end');
        });
    });    
});

module.exports = router;
