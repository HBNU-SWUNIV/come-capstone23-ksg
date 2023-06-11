const getCustomer ="SELECT * FROM customer";
const registerCustomer =  "INSERT INTO customer (userid,userpw,nickname,email) VALUES ($1, $2, $3, $4)";

const getboard ="SELECT * FROM board";
const registerboard = 
 "INSERT INTO board (writer,year,month,day,title,contents,customerid) VALUES ($1,$2,$3,$4,$5,$6,$7)";

 const registercomment = 
 "INSERT INTO comment (boardid,writer,year,month,day,contents,customerid) VALUES ($1,$2,$3,$4,$5,$6,$7)";

 const getcommentdetail ="SELECT * FROM comment WHERE boardid = $1";
 const getcommentlist ="SELECT * FROM comment";
const getboarddetail = "SELECT * FROM board WHERE id = $1";
const searchwriter = "SELECT * FROM board WHERE writer LIKE $1";
const searchtitle = "SELECT * FROM board WHERE title LIKE $1";


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
