"use strict";

const id =document.querySelector("#id");
const name =document.querySelector("#name");
const verifyPassword =document.querySelector("#verify-password");
const password =document.querySelector("#password");
const registerBtn = document.querySelector("button");

 registerBtn.addEventListener("click", register);

function register(){
    if(!id.value) return alert("아이디를 입력해주세요")
    // 아이디가 없을때 
    
    if(password.value != verifyPassword.value){
        return alert("비밀번호가 일치하지 않습니다.");
    }
    // 비밀번호가 일치하지 않을때
    const req = {
     id: id.value,
     name: name.value,
     password : password.value,
    };
    fetch("/register",
    {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
     .then((res) =>{
        // 회원가입 성공시
        if(res.success){
            location.href = "/login"; // 로그인 페이지 이동
            alert("환영합니다.");
        }
        // 실패시
        else{
            alert(res.msg);
        }
     })
     .catch((err) =>{
        console.error(new Error("잘못된 접근입니다."));
     });
}
