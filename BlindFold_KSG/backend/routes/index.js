var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
res.sendFile(path.join(__dirname,'../public/index.html'));

  //res.render('index', { title: 'Express' });

});

module.exports = router;
