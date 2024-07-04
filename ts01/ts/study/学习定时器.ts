(() => {
    let count = 0;
    let timerId = setInterval(function () {
        count++;
        console.log(`第${count}次输出`);
        if (count > 20) {
            clearInterval(timerId); // 停止定时器
        }
    }, 1000); // 1000 ms = 1s
})()