const express = require('express');
const router = express.Router();
const schedules = require('../data/schedule.json');

const fs = require('fs');                                       
const path = require('path'); 

router.get('/', function(req, res){                            // 요청하면 해당하는 달만 보낼지, 전체 보낼 지 고려.
    res.send(schedules);
});

module.exports = router;