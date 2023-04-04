"user strict";

const UsersData = require("./UsersData");

class User{
    constructor(body)
    {
        this.body= body;
    }
    async login(){
        const client = this.body;
        const {id, password }= await UsersData.getUserInfo(client.id);
        
        if(id) {// id가 존재한다면
            if(id === client.id && password == client.password) {
                // id가 패스워드가 같다면 
                return{success:true}; // true 리턴
            }
            return{success:false, msg:"비밀번호가 틀렸습니다."}
            // id는 존재하지만, 비밀번호가 다름 
        }
        return{success:false, msg:"아이디가 존재하지 않습니다."}
        // id가 아예 존재하지 않음
    }
    async register(){
        const client = this.body;
        try{
        const response = await UsersData.save(client);
        return response;
        }
        catch(err){
            return{success: false, msg:err};
        }
    }

}

module.exports =User;