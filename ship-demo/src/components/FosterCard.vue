<template>
  <MyRow>
    <div v-for="pet in cardList"
         :key="pet.fosterId"
         class="img-card">
      <img src="/picture/pet-ex.jpg" alt="头像">
      <div class="card-main">
        <div>{{ pet.petName }}</div>
        <div class="card-three">
          <div>{{ getAge(pet.petAge) }}岁</div>
          <div>{{ pet.petSex ? "公" : "母" }}</div>
          <div>{{ pet.petVariety }}</div>
        </div>
        <div class="item-3"><span>{{ pet.petInfo }}</span></div>
        <div class="item-3">备注：<span>{{ pet.fosterInfo }}</span></div>
        <div class="item-3">寄养人：<span>{{ pet.clientName }}</span></div>
        <div class="item-3">到期时间：<span>{{ pet.fosterTerm }}</span></div>
      </div>
    </div>
  </MyRow>
</template>

<script lang="ts" setup>
import {getAge} from "@/utils/TimeUtil";
import {FosterCardDto} from "@/modal/DO/FosterCardDto";
import MyRow from "@/components/MyRow.vue";
// 接收参数：宠物卡片
defineProps<{
  readonly cardList: FosterCardDto[]
}>()
</script>

<style lang="scss" scoped>
.img-card {
  --txt-color: #b88230;
  --bor-color: #E6A23C;
  --act-color: #eebe77;
  --tit-color: #f3d19e;
  $my-white: #FAFAFA;
  width: 370px;
  max-width: 90vw;
  height: 180px;
  background-color: $my-white;
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
  position: relative;
  user-select: none;

  &:hover {
    /* 悬浮加阴影 */
    z-index: 1000;
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
    border-radius: 12px;
    text-align: center;

    > div {
      /* 卡片中的五行 */
      height: 23px;
      width: 100%;
      overflow-x: hidden;
      white-space: nowrap;

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
        border-radius: 0 0 16px 16px;
        transition: background-color 0.5s;

        &:hover {
          background-color: var(--tit-color);
        }
      }

      &.item-3 {
        /* 特殊文字3 */
        font-size: small;

        span {
          color: var(--bor-color);

          &:hover {
            color: var(--txt-color);
          }
        }
      }
    }

    .card-three {
      /* 一行一分为三 */
      display: flex;
      font-size: small;

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
