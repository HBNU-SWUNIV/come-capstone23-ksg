const getCustomer ="SELECT * FROM customer WHERE userid = ? AND userpw = ?";
const registerCustomer =  "INSERT INTO customer (userid,userpw,nickname,email) VALUES (?, ?, ?, ?)";

const getboard ="SELECT * FROM board";
const registerboard = 
 "INSERT INTO board (writer,year,month,day,title,contents,customerid) VALUES (?,?,?,?,?,?,?)";

 const registercomment = 
 "INSERT INTO comment (boardid,writer,year,month,day,contents,customerid) VALUES (?,?,?,?,?,?,?)";

 const getcommentdetail ="SELECT * FROM comment WHERE boardid = ?";
 const getcommentlist ="SELECT * FROM comment";
const getboarddetail = "SELECT * FROM board WHERE id = ?";
const searchwriter = "SELECT * FROM board WHERE writer LIKE ?";
const searchtitle = "SELECT * FROM board WHERE title LIKE ?";


module.exports = {
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
