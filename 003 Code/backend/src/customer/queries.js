const getCustomer ="SELECT * FROM customer WHERE userid = ? AND userpw = ?";
const registerCustomer =  "INSERT INTO customer (userid,userpw,nickname,email) VALUES (?, ?, ?, ?)";
const checkregister = "SELECT * FROM customer WHERE userid = ?";
const checknickname = "SELECT * FROM customer WHERE nickname = ?";

const getboard ="SELECT * FROM board";
const registerboard = 
 "INSERT INTO board (writer,year,month,day,title,contents,customerid) VALUES (?,?,?,?,?,?,?)";

 const registercomment = 
 "INSERT INTO comment (customerid,id,writer,year,month,day,contents) VALUES (?,?,?,?,?,?,?)";

 const getcommentdetail ="SELECT * FROM comment WHERE id = ?";
 const getcommentlist ="SELECT * FROM comment";
const getboarddetail = "SELECT * FROM board WHERE id = ?";
const searchwriter = "SELECT * FROM board WHERE writer LIKE ?";
const searchtitle = "SELECT * FROM board WHERE title LIKE ?";


module.exports = {
    checkregister,
    checknickname,
    getCustomer,
    registerCustomer,
    registerboard,
    getboard,
    getboarddetail,
    searchwriter,
    searchtitle,
    registercomment,
    getcommentdetail,
    getcommentlist,

}; 
