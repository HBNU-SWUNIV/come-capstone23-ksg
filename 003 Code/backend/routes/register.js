const express = require('express');
const router = express.Router();

const control = require('../src/customer/control');
router.post("/", control.registerCustomer); // 요청을 control.js 에서 처리함
router.post("/check", control.checkregister);
router.post("/checknickname", control.checknickname);

module.exports = router;
