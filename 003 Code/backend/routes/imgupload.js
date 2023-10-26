var express = require('express');
const FormData = require('form-data');
var router = express.Router();
var path = require('path');
var httpProxy  = require('http-proxy');
// const { createProxyMiddleware } = require('http-proxy-middleware');
var modifyResponse = require('node-http-proxy-json');

const app = express();

var multer = require('multer');
const axios = require('axios');
var classfi
var Rfilename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      cb(null, `uploads/${classfi}`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      Rfilename =classfi+"/" + file.originalname
    },
  })
var upload = multer({storage:storage});

var upload2 = multer();
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

/*const formData = new FormData();
    formData.append("image", file.buffer, {
    filename: file.originalname,
    });
  const result = axios({
    method: "post", // 요청 방식
    url: "http://127.0.0.1:5000/averCF", // 요청 주소
     data: formData,
    });
*/
var proxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:5000'
});
/*router.post('/averCF', createProxyMiddleware({ target : 'http://127.0.0.1:5000', changeOrigin : true, onProxyRes}))
function onProxyRes (proxyRes, req, res) {

  var _write = res.write;
  var output;
  var body = "";
  proxyRes.on('data', function(data) {
      data = data.toString('utf-8');
      body += data;
  });
  res.write = function (data) {
    try{
      eval("output="+body)
      output = mock.mock(output)
      _write.call(res,JSON.stringify(output));
    } catch (err) {}
  }
  console.log('proxyResponse', _write);  
}*/
proxy.on('proxyRes', function (proxyRes, req, res) {
  modifyResponse(res, proxyRes, function (body) {
      if (body) {
          // modify some information
          body.age = 2;
          delete body.version;
      }
      classfi = body.class_id;
      console.log(classfi);
      return body; // return value can be a promise
  });
});
router.post('/averCF', async function(req, res) {
  proxy.web(req, res);
});
    
    
/*
router.post('/imgtest', async function(req, res) {
  const formData = new FormData();
    formData.append("image", req.buffer)
  const result = axios({
    method: "post", // 요청 방식
    url: "http://127.0.0.1:5000/averCF", // 요청 주소
     data: formData,
    });
/*
router.post('/imgtest', async function(req, res) {
  const formData = new FormData();
    formData.append("image", req.buffer)
  const result = axios({
    method: "post", // 요청 방식
    url: "http://127.0.0.1:5000/averCF", // 요청 주소
     data: formData,
    });
*/
//classfi = result.data.class_id;
//console.log(classfi);

router.post('/img' ,upload.single("image"), async function(req, res) {
console.log(classfi+'테스트'); 
res.send(Rfilename);
}); 

/*
router.post('/',upload.single('image') , async function(req, res) {
  console.log(res.body);
  console.log(filename);
  res.send(filename);
}); */
module.exports = router;