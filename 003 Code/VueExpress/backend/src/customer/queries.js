const getCustomer ="SELECT * FROM customer";
const registerCustomer =  "INSERT INTO customer (userid,userpw,nickname,email) VALUES ($1, $2, $3, $4)";

module.exports = {
    getCustomer,
    registerCustomer,
};

// 각종 sql 쿼리들을 모듈화 
