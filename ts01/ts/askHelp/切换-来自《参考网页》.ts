(function () {// 表单允许与禁止访问
    // 为左侧导航绑定点击事件
    const rb: HTMLCollectionOf<Element> = document.getElementsByClassName("radio-button");
    for (let i = 0; i < rb.length; i++) {
        rb[i].addEventListener("click", () => sayHi(i))
    }
    // 设置展示内容上移与消失
    let a: number = 0;
    const rolePa: HTMLCollectionOf<Element> = document.getElementsByClassName("rolePa");
    const sayHi = (b: number): void => {
        rolePa[a].setAttribute("style", "animation:byeBye 1.2s forwards;")
        rolePa[b].setAttribute("style", "animation:hello 1.2s forwards;display: block")
        a = b;
    }
}());

// 以下为对应的CSS

/*/!*向上消失动画*!/
@keyframes byeBye {
    100% {
        transform: translateY(-110%);
        opacity: 0;
    }
}

/!*向下出现动画*!/
@keyframes hello {
    from {
        transform: translateY(100%);
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}*/
