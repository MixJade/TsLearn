"use strict";
(() => {
    let count = 2488;
    // 这里的global会报错,因为Node.js没有window对象,只能用global代替
    // 这也是一种方法,但不推荐使用
    // @ts-ignore
    const base64Str = global.btoa(String(count));
    console.log(base64Str);
})();
