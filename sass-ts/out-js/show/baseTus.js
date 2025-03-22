"use strict";
const baseTus = (() => {
    document.body.innerHTML += `<div class="tus" id="myTus">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <circle cx="12" cy="12" r="11" fill="#67C23A"/>
                <path d="M7 12 L12 17 L17 7" stroke="#e1f3d8" stroke-width="2" fill="none"/>
            </svg>
            <span id="myTusTxt">复制成功</span>
        </div>`;
    const myTus = document.getElementById("myTus");
    const myTusTxt = document.getElementById("myTusTxt");
    let tusTimer;
    const showTus = (msg) => {
        if (tusTimer) {
            clearTimeout(tusTimer);
            myTus.classList.remove('visible');
            void myTus.offsetWidth;
        }
        myTus.classList.add('visible');
        if (msg !== undefined)
            myTusTxt.innerText = msg;
        tusTimer = setTimeout(() => {
            myTus.classList.remove('visible');
        }, 3000);
    };
    return {
        showTus
    };
})();
