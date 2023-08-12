<template>
  <div class="my-input">
    <input type="text" placeholder="username" style="background-image: url('/icon/username.svg')">
    <label>帐号</label>
  </div>
  <div class="my-input">
    <input type="password" placeholder="password" style="background-image: url('/icon/password.svg')">
    <label>密码</label>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.my-input {
  position: relative;
  text-align: left;
  margin-top: 5px;
  /* 输入框 */
  input {
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 200px;
    height: 36px;
    padding: 10px 0 0 44px;
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
    font-weight: bold;
    color: #606266;
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