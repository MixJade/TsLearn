"use strict";
const baseTus = (() => {
    document.body.innerHTML += `<div class="baseTus" id="myTus">
        <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" fill="#67C23A" r="9"/>
          <path d="M5 9 L9 13 L13 5" fill="none" stroke="#e1f3d8" stroke-width="2"/>
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
