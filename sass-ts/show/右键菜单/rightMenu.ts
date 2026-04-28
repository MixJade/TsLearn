const menu = document.querySelector('.menu') as HTMLElement | null;

// 绑定右键菜单事件
document.addEventListener('contextmenu', (e: MouseEvent) => {
    // 空值判断，避免 menu 不存在时报错
    if (!menu) return;
    // 阻止浏览器默认右键菜单
    e.preventDefault();
    // 窗口尺寸
    const winWidth: number = window.innerWidth;
    const winHeight: number = window.innerHeight;
    // 鼠标坐标
    const posX: number = e.pageX;
    const posY: number = e.pageY;
    // 菜单尺寸
    const menuRect: DOMRect = menu.getBoundingClientRect();
    const menuWidth: number = menuRect.width;
    const menuHeight: number = menuRect.height;
    // 定义菜单最终位置
    let posLeft: number, posTop: number;
    // 边界判断逻辑
    if (posX + menuWidth >= winWidth && posY + menuHeight >= winHeight) {
        // 右下都超出
        posLeft = posX - menuWidth;
        posTop = posY - menuHeight;
    } else if (posX + menuWidth >= winWidth) {
        // 右侧超出
        posLeft = posX - menuWidth;
        posTop = posY;
    } else if (posY + menuHeight >= winHeight) {
        // 底部超出
        posLeft = posX;
        posTop = posY - menuHeight;
    } else {
        // 正常显示
        posLeft = posX;
        posTop = posY;
    }
    // 设置样式显示菜单
    menu.style.left = `${posLeft}px`;
    menu.style.top = `${posTop}px`;
    menu.style.opacity = '1';
    menu.style.zIndex = '99';
});

// 点击页面其他位置关闭菜单
document.addEventListener('click', () => {
    if (!menu) return;
    menu.style.opacity = '0';
    menu.style.zIndex = '-1';
});