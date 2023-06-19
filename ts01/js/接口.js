"use strict";
const getName = (manName) => "姓:" + manName.firstName + "，名；" + manName.secondName;
const name0q = {
    firstName: "李",
    secondName: "四"
};
console.log(getName(name0q));
