<template>
  <div class="ai-control-page">
    <div class="ai-card">
      <!-- 头部图标 -->
      <div class="ai-icon">
        <img src="/icon/ai.svg" alt="AI" />
      </div>

      <h1 class="ai-title">AI 控制台</h1>

      <!-- 状态指示器 -->
      <div class="status-area">
        <div class="status-dot" :class="{ alive: aiAlive, dead: !aiAlive }"></div>
        <span class="status-text">{{ aiAlive ? '运行中' : '已停止' }}</span>
      </div>

      <!-- 切换按钮 -->
      <button
        class="toggle-btn"
        :class="{ alive: aiAlive, dead: !aiAlive }"
        :disabled="toggling"
        @click="doToggle"
      >
        <span v-if="toggling" class="spinner"></span>
        {{ toggling ? '切换中...' : (aiAlive ? '停止 AI' : '启动 AI') }}
      </button>

      <!-- 提示信息 -->
      <p class="hint">* 切换后系统将仅更新状态标识，不实际启停 llama-server 进程</p>

      <!-- 返回按钮 -->
      <button class="back-btn" @click="$router.push('/')">
        ← 返回主页
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { reqIsAlive, reqToggleAlive } from "@/request/llamaApi";

const aiAlive = ref(false);
const toggling = ref(false);

onMounted(() => {
  checkStatus();
});

const checkStatus = () => {
  reqIsAlive().then(res => {
    aiAlive.value = res.flag;
  });
};

const doToggle = () => {
  toggling.value = true;
  reqToggleAlive()
    .then(res => {
      aiAlive.value = res.flag;
    })
    .finally(() => {
      toggling.value = false;
    });
};
</script>

<style lang="sass" scoped>
$green-light: #e8f5e9
$green-mid: #4caf50
$green-dark: #2e7d32
$green-deep: #1b5e20

.ai-control-page
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)

.ai-card
  background: rgba(255, 255, 255, 0.85)
  backdrop-filter: blur(10px)
  border-radius: 24px
  padding: 48px 40px
  text-align: center
  box-shadow: 0 8px 32px rgba(46, 125, 50, 0.15)
  border: 1px solid rgba(76, 175, 80, 0.2)
  max-width: 380px
  width: 90%

.ai-icon
  width: 80px
  height: 80px
  margin: 0 auto 24px
  animation: float 3s ease-in-out infinite

  img
    width: 100%
    height: 100%

.ai-title
  font-size: 28px
  font-weight: 700
  color: $green-deep
  margin: 0 0 28px
  letter-spacing: 2px

.status-area
  display: flex
  align-items: center
  justify-content: center
  gap: 10px
  margin-bottom: 32px

.status-dot
  width: 14px
  height: 14px
  border-radius: 50%
  transition: background-color 0.4s ease, box-shadow 0.4s ease

  &.alive
    background-color: $green-mid
    box-shadow: 0 0 12px rgba(76, 175, 80, 0.6)
    animation: pulse 2s ease-in-out infinite

  &.dead
    background-color: #9e9e9e
    box-shadow: 0 0 4px rgba(158, 158, 158, 0.3)

.status-text
  font-size: 18px
  font-weight: 600
  color: $green-dark

.toggle-btn
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 8px
  width: 200px
  height: 48px
  border: none
  border-radius: 24px
  font-size: 16px
  font-weight: 600
  cursor: pointer
  transition: all 0.3s ease
  letter-spacing: 1px

  &.alive
    background-color: #ef5350
    color: white
    box-shadow: 0 4px 16px rgba(239, 83, 80, 0.3)

    &:hover:not(:disabled)
      background-color: #e53935
      box-shadow: 0 6px 20px rgba(239, 83, 80, 0.4)
      transform: translateY(-1px)

  &.dead
    background: linear-gradient(135deg, $green-mid, $green-dark)
    color: white
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3)

    &:hover:not(:disabled)
      background: linear-gradient(135deg, #43a047, #2e7d32)
      box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4)
      transform: translateY(-1px)

  &:disabled
    opacity: 0.7
    cursor: not-allowed

.spinner
  display: inline-block
  width: 16px
  height: 16px
  border: 2px solid rgba(255, 255, 255, 0.3)
  border-top-color: white
  border-radius: 50%
  animation: spin 0.6s linear infinite

.hint
  margin-top: 20px
  font-size: 12px
  color: #66bb6a
  letter-spacing: 0.5px

.back-btn
  margin-top: 28px
  border: none
  background: none
  color: $green-dark
  font-size: 14px
  cursor: pointer
  transition: color 0.3s ease
  padding: 8px 16px
  border-radius: 20px

  &:hover
    color: $green-deep
    background-color: rgba(76, 175, 80, 0.08)

@keyframes float
  0%, 100%
    transform: translateY(0)
  50%
    transform: translateY(-8px)

@keyframes pulse
  0%, 100%
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.4)
  50%
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.7)

@keyframes spin
  to
    transform: rotate(360deg)
</style>
