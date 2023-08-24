<template>
  <div>
    <div class="radio-group">
      <label>
        <input value="/reception" v-model="checkValue" type="radio" name="radio">
        <span style="color: red">返回主页</span>
      </label>
      <label>
        <input value="/reception/clientCenter" v-model="checkValue" type="radio" name="radio">
        <span>个人资料</span>
      </label>
      <label>
        <input value="/reception/clientCenter/clientPet" v-model="checkValue" type="radio" name="radio">
        <span>宠物信息</span>
      </label>
      <label>
        <input value="/reception/clientCenter/clientAppoint" v-model="checkValue" type="radio" name="radio">
        <span>挂号查看</span>
      </label>
    </div>
    <div class="one-basePage">
      <div class="really">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import router from "@/router";

const checkValue = ref<string>(router.currentRoute.value.fullPath)
watch(checkValue, () => {
  router.push(checkValue.value)
})
</script>

<style scoped src="public/css/one-basePage.css"/>
<style lang="scss" scoped>
$txt-color: #337ecc;
$round-color: #DBA21C;
$bord-color: #887456;
.radio-group {
  @media (max-width: 800px) {
    display: flex;
  }

  label {
    display: flex;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.375em;

    input {
      display: none;

      &:checked + span {
        background-color: $txt-color;
        color: white;

        &:before {
          box-shadow: inset 0 0 0 0.4375em $round-color;
        }
      }
    }

    span {
      display: flex;
      align-items: center;
      padding: 0.375em 0.75em 0.375em 0.375em;
      border-radius: 99em;
      transition: 0.25s ease;
      color: $txt-color;

      &:hover {
        background-color: #b3e19d;
      }

      &:before {
        display: flex;
        flex-shrink: 0;
        content: "";
        background-color: #fff;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        margin-right: 0.375em;
        transition: 0.25s ease;
        box-shadow: inset 0 0 0 0.125em $bord-color;
      }
    }
  }
}
</style>
