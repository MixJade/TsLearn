<template>
  <div class="login-page">
    <!-- 定义背景图片 -->
    <svg preserveAspectRatio="none" viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg">
      <!-- 定义填充色-->
      <defs>
        <linearGradient id="Gradient" x1="0" x2="1" y1="0" y2="0">
          <stop :stop-color="backColor.begin" offset="0%"/>
          <stop :stop-color="backColor.end" offset="100%"/>
        </linearGradient>
      </defs>
      <!-- 弧形区域-->
      <path d="M0 0,V80,Q500 280,1000 80,V0" fill="url(#Gradient)" stroke="transparent"/>
    </svg>
    <!--登陆卡片-->
    <h2 class="my-h2">轻触牌间喵，进入影中境</h2>
    <!-- 用户登录 -->
    <div :style="{ transform: pairClient }" class="mixJade">
      <img alt="管理员入口" height="48" src="/mia.svg" width="64" @click="clientToAdmin">
      <LoginForm role="USER"/>
      <div>
        <el-button round type="success" @click="$router.push('/reception')">游客登录</el-button>
        <el-button round type="warning" @click="$router.push('/register')">账号注册</el-button>
        <el-button round type="danger" @click="$router.push('/findPwd')">找回密码</el-button>
      </div>
    </div>
    <!-- 管理员登录 -->
    <div :style="{ transform: pairAdmin }" class="mixJade">
      <img alt="普通入口" height="48" src="/mia.svg" width="64" @click="adminToClient">
      <LoginForm role="ADMIN"/>
      <div style="color: #6c757d">智慧唯在沉思中得享</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from "@/components/zoneView/LoginForm.vue";
import {reactive, ref} from "vue";

const pairClient = ref<string>("rotateY(0deg)")
const pairAdmin = ref<string>("rotateY(180deg)")
const backColor = reactive({
  begin: "MediumVioletRed",
  end: "MediumOrchid"
})

const clientToAdmin = () => {
  pairClient.value = "rotateY(180deg)"
  pairAdmin.value = "rotateY(0deg)";
  backColor.begin = "ForestGreen"
  backColor.end = "DeepSkyBlue"
}

const adminToClient = () => {
  pairAdmin.value = "rotateY(-180deg)";
  pairClient.value = "rotateY(0deg)"
  backColor.begin = "MediumVioletRed"
  backColor.end = "MediumOrchid"
}
</script>
<style lang="scss" scoped>
/*整个登录组件*/
.login-page {
  width: 98vw;
  height: 98vh;
  /* 背景的svg */
  svg {
    position: fixed;
    height: 50vh;
    width: 98vw;
  }

  /* 欢迎文字 */
  .my-h2 {
    position: fixed;
    color: #FAFAFA;
    left: 50%;
    transform: translateX(-50%);
  }
}

/* 翻转的卡片 */
.mixJade {
  position: absolute;
  width: 320px;
  margin-top: 8%;
  left: 50%;
  margin-left: -160px;
  text-align: center;
  justify-content: center;
  align-items: center;
  box-shadow: 7px 7px 17px rgba(52, 56, 66, 0.5);
  background-color: #FAFAFA;
  border-radius: 5px;
  backface-visibility: hidden; /* 背向时隐藏 */
  transition: transform 1s;
  -webkit-user-select: none;
  user-select: none;
  padding: 10px;
}
</style>
