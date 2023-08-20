<template>
  <div class="login-card">
    <h3>{{ getRoleName }}登录</h3>
    <div class="my-input">
      <input type="text" v-model="formLogin.username" placeholder="username"
             style="background-image: url('/icon/username.svg')">
      <label>帐号</label>
    </div>
    <div class="my-input">
      <input type="password" v-model="formLogin.password" placeholder="password"
             style="background-image: url('/icon/password.svg')">
      <label>密码</label>
    </div>
    <el-form-item label="记住我">
      <el-switch v-model="formLogin.remember"/>
    </el-form-item>
    <MyBtn @click="toLogin">登录</MyBtn>
  </div>
</template>

<script lang="ts" setup>
import {computed, reactive} from "vue";
import {ElMessage} from "element-plus"
import MyBtn from "@/components/button/MyBtn.vue";
// 定义登录的角色
const prop = defineProps(['role'])
// 根据传来的角色设置展示
const getRoleName = computed(() => {
  switch (prop.role) {
    case "ADMIN":
      return "管理员";
    case "DOCTOR":
      return "医生";
    default:
      return "用户";
  }
})
// 登录的数据
const formLogin = reactive({
  username: "",
  password: "",
  remember: true
})
// 点击登录之后
const toLogin = () => {
  ElMessage({
    showClose: true,
    message: `登录成功!账号:${formLogin.username},密码:${formLogin.password},记住我:${formLogin.remember}`,
    type: 'success',
  })
}
</script>

<style lang="scss" scoped>
/*登录的小卡片*/
.login-card {
  width: 320px;
  text-align: center;
}

/* 自己写的浮动输入框 */
.my-input {
  position: relative;
  text-align: left;
  margin-top: 5px;
  left: 40px;
  /* 输入框 */
  input {
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 200px;
    height: 36px;
    padding: 10px 0 0 36px;
    border: #cfcfcf 2px solid;
    border-radius: 5px;
    background: {
      size: 24px 24px;
      repeat: no-repeat;
      position-y: center;
    };
    /*将占位符设为透明*/
    &::placeholder {
      color: transparent;
    }

    /* 获取焦点显示阴影 */
    &:focus {
      color: #212529;
      background-color: #fff;
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    /* 标签上浮 */
    &:not(:placeholder-shown) ~ label, &:focus ~ label {
      color: #c9ab0a;
      opacity: 0.65;
      transform: scale(0.8) translateY(-3px) translateX(3px);
    }
  }

  /*标签样式*/
  label {
    position: absolute;
    font-size: medium;
    color: #6c757d;
    top: 0;
    left: 28px;
    height: 46px;
    line-height: 46px;
    overflow: hidden;
    white-space: nowrap;
    pointer-events: none;
    border: 1px solid transparent;
    transform-origin: 0 0;
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }
}
</style>