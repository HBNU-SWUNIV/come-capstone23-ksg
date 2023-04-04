"use strict";


const fs = require("fs").promises;
// 현재 유저 데이터 
class UsersData {
    static #getUserInfo(data, id){
        console.log(JSON.parse(data));
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // users의 key값들만 리스트로 만든다.
        // => {id,password,name}
        const userInfo =usersKeys.reduce((newUser, info)=>{
            newUser[info] = users[info][idx];
            // info에 key값이 들어간다.
            /// users[info][idx] 해당 key값에 맞는 인덱스의 정보 반환
        return newUser;
        },{});
        return userInfo;
    }
    static #getUsers(data,isAll, fields){
        const users =JSON.parse(data);
        if(isAll) return users;
        const newUsers = fields.reduce((newUsers, field) =>{
            if(users.hasOwnProperty(field)){
               newUsers[field] = users[field];
            }
            return newUsers;
           }, {});
           return newUsers;
    }
     static getUsers(isAll,...fields) {
        return fs.readFile("./src/databases/users.json")
        .then((data)=> {
           
         return this.#getUsers(data,isAll,fields);
        })
        .catch((err) => console.error(err));
        //const users = this.#users;
        

    }
    
    static getUserInfo(id){
        return fs.readFile("./src/databases/users.json")
        .then((data)=> {
           
         return this.#getUserInfo(data, id);
        })
        .catch((err) => console.error(err));
       
         
    }
   
    static async save(userInfo){
        const users = await this.getUsers(true);
        // 데이터 추가

        if(users.id.includes(userInfo.id)) {// 클라이언트가 입력한 유저정보의 id가 데이터안에 없을경우
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);

        fs.writeFile("./src/databases/users.json",JSON.stringify(users));
         // 데이터에 저장
     return {success:true};
    }
}


module.exports = UsersData;