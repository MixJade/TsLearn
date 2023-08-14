<template>
  <div class="img-card">
    <img :src="'/picture/'+data.photo" alt="头像">
    <div class="card-main">
      <div>{{ data.tit }}</div>
      <div class="card-three">
        <div>{{ data.age }}</div>
        <div>{{ data.sex }}</div>
        <div>{{ data.job }}</div>
      </div>
      <div class="item-1">{{ data.info1 }}</div>
      <div class="item-2">{{ data.info2 }}</div>
      <div>
        <button type="button" @click="$router.push(data.link)">详情</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps<{
  type: "primary" | "success"
  data: CardData
}>()


const myColorTxt = ref<string>("#337ecc")
const myColorBor = ref<string>("#409EFF")
const myColorAct = ref<string>("#79bbff")
const myColorTit = ref<string>("#a0cfff")


if (props.type === "success") {
  myColorTxt.value = "#529b2e"
  myColorBor.value = "#67C23A"
  myColorAct.value = "#95d475"
  myColorTit.value = "#b3e19d"
}

export interface CardData {
  photo: string;
  tit: string;
  age: string;
  sex: string;
  job: string;
  info1: string;
  info2: string;
  link: string;
}
</script>

<style lang="scss" scoped>
.img-card {
  --txt-color: v-bind(myColorTxt);
  --bor-color: v-bind(myColorBor);
  --act-color: v-bind(myColorAct);
  --tit-color: v-bind(myColorTit);
  $my-white: #FAFAFA;
  width: 370px;
  height: 180px;
  background-color: $my-white;
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
  user-select: none;

  &:hover {
    /* 悬浮加阴影 */
    box-shadow: 5px 5px 15px var(--act-color);
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
    margin-left: 5px;
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
        transition: background-color 0.5s;

        &:hover {
          background-color: var(--tit-color);
        }
      }

      &:last-child {
        /* 脚注 */
        button {
          background-color: $my-white;
          color: var(--bor-color);
          height: 100%;
          border: 2px solid var(--bor-color);
          width: 50%;
          border-radius: 16px;
          transition: width 0.5s;

          &:hover {
            width: 100%;
            border-radius: 0 0 16px 16px;
            background-color: var(--bor-color);
            color: $my-white;
          }
        }
      }

      &.item-1 {
        /* 特殊文字1 */
        color: var(--bor-color);

        &:hover {
          color: var(--txt-color);
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
        overflow-x: hidden;
        white-space: nowrap;

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