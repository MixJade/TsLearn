window.onload = function () {
    getAll();
}

function getAll() {
    // 模拟一段JSON数据，实际要从数据库中读取
    const per = [
        {
            "id": 1,
            "name": "saber",
            "variety": "金毛犬",
            "sex": false,
            "petBir": '2005-01-13',
            "status": "怀孕待产",
            "inHos": false
        },
        {
            "id": 2,
            "name": "甘雨",
            "variety": "椰羊",
            "sex": false,
            "petBir": '1905-01-13',
            "status": "频繁掉毛",
            "inHos": true
        },
        {
            "id": 2,
            "name": "甘雨",
            "variety": "椰羊",
            "sex": false,
            "petBir": '1905-01-13',
            "status": "频繁掉毛",
            "inHos": true
        },
        {
            "id": 2,
            "name": "甘雨",
            "variety": "椰羊",
            "sex": false,
            "petBir": '1905-01-13',
            "status": "频繁掉毛",
            "inHos": true
        },
        {
            "id": 2,
            "name": "甘雨",
            "variety": "椰羊",
            "sex": false,
            "petBir": '1905-01-13',
            "status": "频繁掉毛",
            "inHos": true
        },
        {
            "id": 2,
            "name": "甘雨",
            "variety": "椰羊",
            "sex": false,
            "petBir": '1905-01-13',
            "status": "频繁掉毛",
            "inHos": true
        },
        {
            "id": 2,
            "name": "甘雨",
            "variety": "椰羊",
            "sex": false,
            "petBir": '1905-01-13',
            "status": "频繁掉毛",
            "inHos": true
        },
        {
            "id": 2,
            "name": "甘雨",
            "variety": "椰羊",
            "sex": false,
            "petBir": '1905-01-13',
            "status": "频繁掉毛",
            "inHos": true
        },
        {
            "id": 3,
            "name": "泳信羊",
            "variety": "山羊",
            "sex": true,
            "petBir": '2001-01-13',
            "status": "绝育手术",
            "inHos": false
        },
        {
            "id": 4,
            "name": "神里凌华",
            "variety": "柴犬",
            "sex": false,
            "petBir": '2004-01-13',
            "status": "肛裂",
            "inHos": true
        }
    ];
    addTableRow(per);
    pageStripWrite(per.length)
}

// 传来的json变成表格
function addTableRow(per) {
    const tbody = document.getElementById('tb-main');
    for (let i = 0; i < per.length; i++) { //遍历一下json数据
        const trow = getDataRow(per[i]); //定义一个方法,返回tr数据
        tbody.appendChild(trow);
    }
}

// 向表格类动态添加数据
function getDataRow(h) {
    function add_cell(key) {
        const jsCell = document.createElement('td')
        jsCell.innerHTML = key
        return jsCell
    }

    const row = document.createElement('tr'); //创建行
    const {inHos, status, id, variety, name, sex, petBir} = h
    // 添加复选框
    const checkRow = document.createElement('td');
    const checkA = document.createElement('input');
    checkA.type = 'checkbox';
    checkA.className = 'form-check-input ms-2';
    checkA.setAttribute('name', 'checkA');
    checkA.setAttribute('placeholder', id);
    checkRow.appendChild(checkA);
    row.appendChild(checkRow);
    // 添加其他列
    row.appendChild(add_cell(name))
    row.appendChild(add_cell(variety))
    if (sex) {
        row.appendChild(add_cell('公'))
    } else {
        row.appendChild(add_cell('母'))
    }
    row.appendChild(add_cell(getAge(petBir)))
    row.appendChild(add_cell(status))
    if (inHos) {
        row.appendChild(add_cell('是'))
    } else {
        row.appendChild(add_cell('否'))
    }
    //删除与修改按钮
    const delCell = document.createElement('td');
    const btnDel = document.createElement('input');
    btnDel.setAttribute('type', 'button');
    btnDel.setAttribute('class', 'btn btn-warning');
    btnDel.setAttribute('value', '删除');
    delCell.appendChild(btnDel);
    const btnUpd = document.createElement('input');
    btnUpd.setAttribute('type', 'button');
    btnUpd.setAttribute('class', 'btn btn-info ms-1');
    btnUpd.setAttribute("data-bs-toggle", "modal");
    btnUpd.setAttribute("data-bs-target", "#addPetPop");
    btnUpd.setAttribute('value', '修改');
    delCell.appendChild(btnUpd);
    //删除操作
    btnDel.onclick = async function () {
        if (await confirmDel()) {
            //找到按钮所在行的节点，然后删掉这一行
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
            errToast(id)
        }
    }
    // 修改操作
    btnUpd.onclick = function () {
        document.getElementById('addPetPopLa').innerHTML = "修改宠物信息";
        sucToast(id)
    }
    row.appendChild(delCell);
    return row;
}

// 设置表单标题(添加)
function setPopTitle() {
    document.getElementById('addPetForm').reset();
    document.getElementById('addPetPopLa').innerHTML = "添加宠物"
}

// 提交表单信息
function submitForm() {
    console.log(formToJson())
}

//表单数据转json
function formToJson() {
    var formJson = {"name": '', "variety": '', "sex": '', "petDate": '', "status": '', "inHos": ''};
    formJson.name = document.getElementById('petName').value;
    formJson.variety = document.getElementById('petVariety').value;
    formJson.sex = document.getElementById("petSexRad_1").checked
    formJson.petDate = document.getElementById('petDate').value;
    formJson.status = document.getElementById('petStatus').value;
    formJson.inHos = document.getElementById("inHos_2").checked;
    return formJson;
}

// 通用js,可以封装为一个js文件
// 根据出生日期算年龄(简化版)
const nowYear = new Date().getFullYear()

function getAge(birthday) {
    const birthYear = birthday.split("-")[0]
    return nowYear - birthYear
}

// 多选与反选
const checkALL = document.getElementById("checkALL");
const checkAS = document.getElementsByName("checkA");
checkALL.onclick = function () {
    for (let i = 0; i < checkAS.length; i++) {
        checkAS[i].checked = this.checked;
    }
}
// 批量删除获取id
const delALL = document.getElementById("delALL");
delALL.onclick = async function () {
    if (await confirmDel()) {
        const delGroup = [];
        for (let i = 0; i < checkAS.length; i++) {
            if (checkAS[i].checked) {
                delGroup.push(checkAS[i].placeholder)
            }
        }
        if (delGroup.length === 0) {
            return
        }
        errToast(delGroup)
    }
}
// 吐司消息
const toastText = document.querySelector(".toast-body");
const toastColor = document.querySelector('.toast');

function sucToast(msg) {
    toastColor.classList.remove("bg-danger")
    toastColor.classList.add("bg-success")
    toastText.innerHTML = msg;
    new bootstrap.Toast(toastColor).show();
}

function errToast(msg) {
    toastColor.classList.remove("bg-success")
    toastColor.classList.add("bg-danger")
    toastText.innerHTML = msg;
    new bootstrap.Toast(toastColor).show();
}

// 确认删除框
const delModalFirst = document.getElementById("delModal")
const delModal = new bootstrap.Modal(delModalFirst, {keyboard: false})
const sureDelBtn = document.getElementById("sureDelBtn")

function confirmDel() {
    delModal.show();
    return new Promise(function (resolve, reject) {
        delModalFirst.addEventListener('hide.bs.modal', function (event) {
            resolve(false)
        })
        sureDelBtn.onclick = function () {
            resolve(true);
            delModal.hide();
        }
    })
}

// 分页条
// 分页条设置长度
const pageStrip = document.getElementById("pageStrip");

function pageStripWrite(itemNum) {
    var pageNum = itemNum / (getPageSize())
    pageStrip.innerHTML = '<li class="page-item active"><a class="page-link" onclick="cutP(1)">1</a></li>'
    for (let i = 2; i < pageNum + 1; i++) {
        pageStrip.innerHTML += '<li class="page-item"><a class="page-link" onclick="cutP(' + i + ')">' + i + '</a></li>'
    }
}

// 分页条设置选中效果
const pageLA = pageStrip.getElementsByTagName("a");

function cutP(numPage) {
    pageStrip.querySelector(".active").classList.remove("active");
    pageLA[numPage - 1].parentNode.classList.add("active");
    alert(numPage + ',' + getPageSize());
}

// 获取分页大小下拉表选中值
const pageSize = document.getElementById("pageSize");

function getPageSize() {
    var index = pageSize.selectedIndex;
    return pageSize.options[index].value;
}

// 向前翻页操作
function addPageNum() {
    var currentPage = pageStrip.querySelector(".active").getElementsByTagName("a")[0].innerHTML
    if (currentPage != 1) {
        cutP(currentPage - 1)
    }
}

// 向后翻页操作
function reducePageNum() {
    var currentPageLength = pageStrip.getElementsByTagName("li").length;
    var currentPage02 = pageStrip.querySelector(".active").getElementsByTagName("a")[0].innerHTML
    if (currentPage02 != currentPageLength) {
        cutP(parseInt(currentPage02) + 1)
    }
}

// 改变每页条数
function refreshPage() {
    pageStripWrite(50)
}
