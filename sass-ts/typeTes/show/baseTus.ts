// noinspection JSUnusedGlobalSymbols
const baseTus = (() => {
    // 将新元素添加到 body 元素的末尾
    document.body.innerHTML += `<div class="tus" id="myTus">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <circle cx="12" cy="12" r="11" fill="#67C23A"/>
                <path d="M7 12 L12 17 L17 7" stroke="#e1f3d8" stroke-width="2" fill="none"/>
            </svg>
            <span id="myTusTxt">复制成功</span>
        </div>`;
    // 获得对象
    const myTus = document.getElementById("myTus") as HTMLDivElement;
    const myTusTxt = document.getElementById("myTusTxt") as HTMLSpanElement;
    // 用于保存定时器 ID
    let tusTimer: number;
    /**
     * 展示吐司消息
     * @param msg 展示消息
     */
    const showTus = (msg?: string): void => {
        // 清除之前的定时器
        if (tusTimer) {
            clearTimeout(tusTimer);
            // 立即隐藏吐司
            myTus.classList.remove('visible');
            // 强制重绘
            void myTus.offsetWidth
        }
        myTus.classList.add('visible')
        // 设置消息展示
        if (msg !== undefined) myTusTxt.innerText = msg;
        // 设定3秒后隐藏这个元素
        tusTimer = setTimeout(() => {
            myTus.classList.remove('visible');
        }, 3000);
    };

    return {
        showTus
    }
})();
