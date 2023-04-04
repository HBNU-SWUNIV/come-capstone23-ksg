"use strict";

const id =document.querySelector("#id");
const password =document.querySelector("#password");
const loginBtn = document.querySelector("button");


loginBtn.addEventListener("click", login);

function login(){
    const req = {
     id: id.value,
     password : password.value,
    };
    fetch("/login",
    {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
     .then((res) =>{
        // 로그인 성공시
        if(res.success){
            location.href = "/";
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
