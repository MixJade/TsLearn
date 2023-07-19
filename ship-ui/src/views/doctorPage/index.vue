<template>
  <h3>医生主页</h3>
  <ul>
    <li>
      <router-link to="/doctorPage/d-appoint">挂号</router-link>
    </li>
    <li>
      <router-link to="/doctorPage/d-chat">聊天</router-link>
    </li>
    <li>
      <router-link to="/doctorPage/doctorOne">个人资料</router-link>
    </li>
  </ul>
  <div class="circle">
    <div class="part one">
      <div class="con">
        <el-button type="primary" plain round size="large" @click="this.$router.push('/doctorPage/d-chat')">
          在线咨询
        </el-button>
      </div>
    </div>
    <div class="part two">
      <div class="con">
        <el-button type="warning" plain round size="large" @click="this.$router.push('/doctorPage/d-appoint')">
          挂号信息
        </el-button>
      </div>
    </div>
    <div class="part three">
      <div class="con">
        <el-button type="danger" plain round size="large" @click="this.$router.push('/')">
          退出登录
        </el-button>
      </div>
    </div>
    <div class="happy hover-effect">
      <el-avatar src="/picture/doctor-ex.jpg" @click="this.$router.push('/doctorPage/doctorOne')"/>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  /*扇形图*/
  .part {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: polygon(50% 50%, -35% 0, 135% 0);
    display: grid; /* 利用grid布局实现居中 */
    justify-items: center; /* 水平居中 */
    align-items: start; /* 垂直居中 */
    .con {
      padding-top: 50px;
    }
  }

  /*头像区域*/
  .happy {
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    width: 64px;
    height: 64px;
    margin-left: -32px;
    margin-top: -32px;
    text-align: center;
    /*头像图片*/
    .el-avatar {
      width: 64px;
      height: 64px;
    }
  }

  .hover-effect {
    transition: transform .2s;
    /*悬停放大*/
    &:hover {
      transform: scale(1.5);
    }
  }

  .one {
    background-color: #a0cfff;
    transform: rotate(-60deg);
  }

  .two {
    background-color: #f3d19e;
    transform: rotate(60deg);
  }

  .three {
    background-color: #fab6b6;
    transform: rotate(180deg);
  }
}
</style>