<template>
  <div class="find-pwd">
    <PageHead>找回密码</PageHead>
    <img class="cloud" alt="云朵" src="/picture/cloud.png">
    <div class="send-mail">
      <img alt="信封表面" src="/picture/envelope_1.svg">
      <div>
        <div>你好</div>
      </div>
      <img alt="信封背景" src="/picture/envelope_2.svg">
    </div>
    <img class="cloud" alt="云朵" src="/picture/cloud.png">
  </div>
</template>

<script lang="ts" setup>
import PageHead from "@/components/PageHead.vue";</script>

<style lang="scss" scoped>
.find-pwd {
  width: 98vw;
  height: 98vh;
  background-image: linear-gradient(#F0E68C, transparent);

  & > img.cloud {
    position: absolute;

    &:first-of-type {
      mix-blend-mode: screen; /* 设置背景融合 */
      left: 10%;
      top: 10%;
    }

    &:last-of-type {
      left: 55%;
      top: 50%;
      z-index: -1;
    }
  }
}

.send-mail {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 452px;
    height: 456px;

    &:first-of-type {
      position: absolute;
      z-index: 20;

      &:hover + div > div {
        transform: translateY(0);
      }
    }

    & :last-of-type {
      z-index: 10;
    }
  }

  & > div {
    position: absolute;
    z-index: 15;
    inset: 8px;
    border-radius: 24px;
    background-color: transparent;
    overflow-y: hidden;

    & > div {
      position: absolute;
      box-sizing: border-box;
      padding: 8px;
      border-radius: 24px;
      inset: 0;
      background-color: #cccccc;
      transition: transform 1s;
      transform: translateY(50%);
      text-align: center;
    }
  }
}
</style>
