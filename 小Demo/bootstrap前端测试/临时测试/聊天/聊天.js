window.onload = () => {
    readMsg()
}
const msgContainer = document.getElementById("msgContainer");

// 读取消息列表
function readMsg() {
    const msg = [
        {
            clientName: "张三",
            doctorName: "李医生",
            isClient: true,
            msgContent: "你好",
            createTime: "2023-2-25 19:14:22",
            photo: "../../picture/lei-jun.jpg"
        },
        {
            clientName: "张三",
            doctorName: "李医生",
            isClient: false,
            msgContent: "你好",
            createTime: "2023-2-25 19:14:22",
            photo: "../../picture/lei-jun.jpg"
        },
        {
            clientName: "张三",
            doctorName: "李医生",
            isClient: true,
            msgContent: "你好",
            createTime: "2023-2-25 19:14:22",
            photo: "../../picture/lei-jun.jpg"
        },
        {
            clientName: "张三",
            doctorName: "李医生",
            isClient: false,
            msgContent: "你好",
            createTime: "2023-2-25 19:14:22",
            photo: "../../picture/lei-jun.jpg"
        },
        {
            clientName: "张三",
            doctorName: "李医生",
            isClient: true,
            msgContent: "你好",
            createTime: "2023-2-25 19:14:22",
            photo: "../../picture/lei-jun.jpg"
        },
        {
            clientName: "张三",
            doctorName: "李医生",
            isClient: false,
            msgContent: "你好",
            createTime: "2023-2-25 19:14:22",
            photo: "../../picture/lei-jun.jpg"
        }
    ];
    for (let i = 0; i < msg.length; i++) readMsaA(msg[i])
}

// 读取并处理一行消息
function readMsaA(ele) {
    const {clientName, doctorName, isClient, msgContent, createTime, photo} = ele;
    if (isClient) writeClient(clientName, msgContent, createTime, photo)
    else writeDoctor(doctorName, msgContent, createTime, photo)
}

// 写入用户消息
function writeClient(clientName, msgContent, createTime, photo) {
    msgContainer.innerHTML += `<div class="d-flex justify-content-end my-3">
                                <div class="card bg-primary text-light w-50 ">
                                    <div class="card-body">
                                        <div class="card-title">
                                            <b>${clientName} ${createTime}</b>
                                        </div>
                                        <div class="card-text">
                                            ${msgContent}
                                        </div>
                                    </div>
                                </div>
                                <img src="${photo}" class="rounded-circle myImg" alt="" />
                            </div>`
}

// 写入医生消息
function writeDoctor(doctorName, msgContent, createTime, photo) {
    msgContainer.innerHTML += `<div class="d-flex justify-content-start my-3">
                                <img src="${photo}" class="rounded-circle myImg" alt="" />
                                <div class="card w-50">
                                    <div class="card-body">
                                        <div class="card-title">
                                            <b>${doctorName} ${createTime}</b>
                                        </div>
                                        <div class="card-text">
                                            ${msgContent}
                                        </div>
                                    </div>
                                </div>
                            </div>`
}

// 点击其它的大夫
function cutDoctor(doctorID) {
    alert(doctorID)
}

// 点击发送按钮
function sendMsg() {
    const waitSend = document.getElementById("waitSend");
    const content = waitSend.value;
    waitSend.value = "";
    if (content === "") return;
    alert(content)
}
