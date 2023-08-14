<template>
  <div class="img-card">
    <img alt="头像" src="/picture/lei-jun.jpg">
    <div class="card-main">
      <div>通的同</div>
      <div class="card-three">
        <div>33岁</div>
        <div>男</div>
        <div>副院长</div>
      </div>
      <div class="item-1"><span>tong-de-t</span></div>
      <div class="item-2"><span>国内著名医学专家，擅长绝育</span></div>
      <div>
        <button>详情</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.img-card {
  $txt-color: #337ecc;
  $bor-color: #409EFF;
  $act-color: #79bbff;
  $tit-color: #a0cfff;
  width: 380px;
  height: 180px;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
  user-select: none;

  &:hover {
    /* 悬浮加阴影 */
    box-shadow: 5px 5px 15px $act-color;
  }

  img {
    /* 头像 */
    width: 128px;
    height: 128px;
    border-radius: 50%;
    border: 3px solid;
    border-color: #f89898 #eebe77 #79bbff #95d475;
  }

  .card-main {
    /* 卡片内容 */
    width: 230px;
    height: 140px;
    margin-left: 8px;
    box-sizing: border-box;
    border-radius: 16px;
    text-align: center;

    > div {
      /* 卡片中的五行 */
      height: 28px;
      width: 100%;

      &:first-child {
        /* 标题 */
        border-radius: 16px 16px 0 0;
        font-weight: bold;

        &:hover {
          background-color: $tit-color;
        }
      }

      &:last-child {
        /* 脚注 */
        button {
          background-color: #FAFAFA;
          color: $bor-color;
          height: 100%;
          border: 2px solid $bor-color;
          width: 50%;
          border-radius: 16px;
          transition: width 0.5s;

          &:hover {
            width: 100%;
            border-radius: 0 0 16px 16px;
            background-color: #409EFF;
            color: #FAFAFA;
          }
        }
      }

      &.item-1 {
        /* 特殊文字1 */
        color: $bor-color;

        &:hover {
          color: $txt-color;
        }
      }

      &.item-2 {
        /* 特殊文字2 */
        font-size: small;
      }
    }

    .card-three {
      /* 一行一分为三 */
      display: flex;

      div {
        width: 33%;

        &:first-child {
          text-align: right;
        }

        &:last-child {
          text-align: left;
        }
      }
    }
  }
}
</style>