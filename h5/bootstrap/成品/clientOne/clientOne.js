"use strict";

(function () {// 表单允许与禁止访问
    const opTwo_1 = document.getElementById("opTwo_1")
    const opTwo_2 = document.getElementById("opTwo_2")
    document.getElementById("op_2").onclick = () => {
        document.getElementById("fieldset").removeAttribute("disabled");
        opTwo_1.style.transform = "rotateY(180deg)"
        opTwo_2.style.transform = "rotateY(0deg)";
    }
    document.getElementById("op_4").onclick = () => {
        document.getElementById("fieldset").setAttribute("disabled", "disabled");
        opTwo_2.style.transform = "rotateY(180deg)"
        opTwo_1.style.transform = "rotateY(0deg)";
    }
    const rolePa = document.getElementsByClassName("rolePa");
    let a = 0;
    window.sayHi = b => {
        rolePa[a].style.animation = "byeBye 1.2s forwards";
        rolePa[b].style.display = "";
        rolePa[b].style.animation = "hello 1.2s forwards";
        a = b;
    }
}());
