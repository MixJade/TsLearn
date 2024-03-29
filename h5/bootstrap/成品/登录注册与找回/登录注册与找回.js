const pairJade = document.getElementById("pairJade")
const pairJade02 = document.getElementById("pairJade02")
const pairJade03 = document.getElementById("pairJade03")
const pairJade04 = document.getElementById("pairJade04")
document.getElementById("myImg01").onclick = () => {
    pairJade.style.transform = "rotateY(180deg)";
    pairJade02.style.transform = "rotateY(0deg)";
}
document.getElementById("myImg02").onclick = () => {
    pairJade02.style.transform = "rotateY(180deg)";
    pairJade.style.transform = "rotateY(0deg)";
}
document.getElementById("toReg").onclick = () => {
    pairJade.style.transform = "rotateX(180deg)";
    pairJade03.style.transform = "rotateX(0deg)";
}
document.getElementById("toLog").onclick = () => {
    pairJade03.style.transform = "rotateX(180deg)";
    pairJade.style.transform = "rotateX(0deg)";
}
document.getElementById("toFin").onclick = () => {
    pairJade.style.transform = "rotate3d(1, 1, 0, 180deg)";
    pairJade04.style.transform = "rotate3d(1, 1, 0, 0deg)";
}
document.getElementById("toLog02").onclick = () => {
    pairJade04.style.transform = "rotate3d(1, 1, 0, 180deg)";
    pairJade.style.transform = "rotate3d(1, 1, 0, 0deg)";
}

function settime(val) {
    let countDown = 30;
    val.setAttribute("disabled", "disabled");
    let intval = setInterval(function () {
        if (countDown === 0) {
            clearInterval(intval)
            val.removeAttribute("disabled");
            val.value = "发送验证码";
            return
        }
        val.value = "重新发送(" + countDown + ")";
        countDown--;
    }, 1000)
}
