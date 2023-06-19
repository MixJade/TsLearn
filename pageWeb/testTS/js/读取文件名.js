"use strict";
const fs = require("fs");
const explorer = (name) => {
    let absPath = `C:/MixJs/pageWeb/docs/${name}/`;
    fs.readdir(absPath, (err, files) => {
        if (err) {
            console.log('这不是一个有效文件夹:\n' + err);
            return;
        }
        files.forEach(function (file) {
            fs.stat(absPath + file, (err, stat) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stat.isDirectory()) {
                    explorer(`${name}/${file}`);
                }
                else {
                    console.log(`'/${name}/${file}',`);
                }
            });
        });
    });
};
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
readline.question("请输入文件夹名(如：note2022)：", (name) => {
    console.log(`HELLO! ${name}!`);
    explorer(name);
    readline.close();
});
