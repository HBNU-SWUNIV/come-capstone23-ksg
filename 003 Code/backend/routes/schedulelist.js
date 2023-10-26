const express = require('express');
const router = express.Router();
const schedules = require('../data/schedule.json');

const fs = require('fs');                                       
const path = require('path'); 

router.get('/', function(req, res){                            // 요청하면 해당하는 달만 보낼지, 전체 보낼 지 고려.
    res.send(schedules);
});

router.post('/:upload', function(req, res){
    let schedule = req.body;
    
    // let decoded;
    // decoded = jwt.verify(req.cookies.token, "ksg");
    // comment.writer = decoded.name;
    
    // get path
    const myPath = path.join(__dirname, '..', 'data', 'schedule.json');

    // read file
    fs.readFile(myPath, 'utf8', (err, data)=>{
        let parsedData = JSON.parse(data);
        parsedData.push(schedule);
        fs.writeFile(myPath, JSON.stringify(parsedData), (err)=>{
            if (err) throw err;
            console.log('comments update complete!');
            res.send('end');
        });
    });    
}); 

module.exports = router;