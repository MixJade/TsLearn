import {onMounted,onBeforeUnmount} from "vue";

export default ()=>{
    const body = document.body;// 卡哇伊的弹出文字
    const textArr = ["乐观", "❤", "积极", "向上", "自由", "正能量", "(*^▽^*)", "元气满满", "开心", "快乐", "善良", "可爱", "|ू･ω･` )", "卡哇伊", "(ﾟ▽ﾟ*) ", "ヽ(￣▽￣)ﾉ"];
    const popText = (ev: MouseEvent): void => {
        const baseX = ev.pageX;
        const baseY = ev.pageY;
        const new_span = document.createElement('span');
        new_span.innerText = textArr[~~(Math.random() * textArr.length)]
        new_span.style.position = 'fixed';
        new_span.style.left = baseX - 10 + 'px';
        new_span.style.top = baseY + 'px';
        new_span.style.color = 'RGB(255,0,0)';
        new_span.style.userSelect = 'none';
        body.appendChild(new_span);
        const timer = window.setInterval(() => {
            new_span.style.top = parseInt(window.getComputedStyle(new_span, null)['top']) - 2 + 'px';
            new_span.style.opacity = String(Number(window.getComputedStyle(new_span, null)['opacity']) - 0.02);
        }, 30);
        window.setTimeout(() => {
            window.clearInterval(timer);
            body.removeChild(new_span);
        }, 1000);
    }
    onMounted(() => {
        document.addEventListener('click', popText)
    })
    onBeforeUnmount(() => {
        document.removeEventListener('click', popText)
    })
}

