const fs = require("fs");

/**
 * 这个是为了方便获取博客的子页面而设置的
 * @param name 存放md文件的文件夹名称
 */
const explorer = (name: string): void => {
    // 下面是我自己电脑上的绝对路径
    let absPath = `C:/MixJs/pageWeb/docs/${name}/`
    fs.readdir(absPath, (err: any, files: string[]) => {
        // err为错误 , files文件名列表包含文件夹与文件
        if (err) {
            console.log('这不是一个有效文件夹:\n' + err);
            return;
        }
        files.forEach(function (file) {
            fs.stat(absPath + file, (err: any, stat: any): void => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stat.isDirectory()) {
                    // 如果是文件夹遍历
                    explorer(`${name}/${file}`);
                } else {
                    // 读出所有的文件
                    console.log(`'/${name}/${file}',`);
                }
            });
        });
    });
}

// 此处输入文件名
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("请输入文件夹名(如：note)：", (name: string): void => {
    console.log(`HELLO! ${name}!`);
    explorer(name)
    readline.close();
});
