var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');

var filename; 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      filename =file.originalname;
    },
  })
var upload = multer({storage:storage})
  const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];
  
    if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
        req.fileValidationError = null;
        cb(null, true);
    } else {
        req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
        cb(null, false)
    }
    cb(null, false)
    filename =file.originalname;
  }
  
/*const upload = multer({
  fileFilter : fileFilter,
  limits: { 
      fileSize: 10 * 1024 * 1024 //크기 제한 : 10MB
  }
}); */



router.post('/imgtest' ,upload.single('image'), async function(req, res) {
  res.send(filename);
}); 

/*
router.post('/',upload.single('image') , async function(req, res) {
  console.log(res.body);
  console.log(filename);
  res.send(filename);
}); */
module.exports = router;