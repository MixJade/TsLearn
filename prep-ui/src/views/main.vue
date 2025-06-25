<template>
  <main>
    <div class="ring">
      <i style="--clr:#00ff0a;"></i>
      <i style="--clr:#ff0057;"></i>
      <i style="--clr:#fffd44;"></i>
      <div class="login">
        <h2>小镇做题家</h2>
        <div class="ipt-box">
          <div class="ipt-btn">
            <router-link to="/sourceCate">图片识别</router-link>
          </div>
          <div class="ipt-btn">
            <router-link to="/examPaper">试卷编辑</router-link>
          </div>
          <div class="ipt-btn">
            <router-link to="/examSubject">科目备忘</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
main
  min-height: 100vh
  background-color: #111
  display: flex
  justify-content: center
  align-items: center
  overflow: hidden

.ring
  //登录卡片
  position: relative
  width: 500px
  height: 500px
  display: flex
  justify-content: center
  align-items: center

  i
    //环绕发光线条
    position: absolute
    border: 6px solid var(--clr)
    filter: drop-shadow(0 0 20px var(--clr))
    inset: 0
    transition: all 0.5s

    &:nth-child(1)
      border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%
      animation: animate 6s linear infinite

    &:nth-child(2)
      border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%
      animation: animate 4s linear infinite

    &:nth-child(3)
      border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%
      animation: animate 10s linear infinite reverse

.login
  //内容物
  position: absolute
  width: 300px
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 20px

  h2
    color: #fff
    font-size: 32px
    margin-bottom: 16px

  .ipt-box
    //存放按钮的div
    position: relative
    width: 100%

    .ipt-btn
      position: relative
      width: 100%
      padding: 8px
      margin-bottom: 3px
      text-align: center

      &:hover
        background: linear-gradient(to right, rgba(255, 53, 122, 0) 0%, rgba(255, 53, 122, 1) 30%, rgba(255, 241, 114, 1) 70%, rgba(255, 241, 114, 0) 100%)

    a
      text-decoration: none
      font-size: larger
      font-weight: bolder
      color: white
      //文字阴影
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)

@keyframes animate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>