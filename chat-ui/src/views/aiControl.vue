<template>
  <div class="ai-control-page">
    <!-- 导航条 -->
    <Header/>
    <!-- AI 配置卡片区 -->
    <div class="ai-cards-container">
      <!-- 单个 AI 小卡片 -->
      <div class="ai-card">
        <div class="ai-card-header">
          <span class="ai-title">（本地）Qwen3-0.6B</span>
        </div>

        <div class="status-area">
          <div class="status-dot" :class="{ alive: aiAlive, dead: !aiAlive }"></div>
          <span class="status-text">{{ aiAlive ? '运行中' : '已停止' }}</span>
        </div>

        <button
            class="toggle-btn"
            :class="{ alive: aiAlive, dead: !aiAlive }"
            :disabled="toggling"
            @click="doToggle"
        >
          {{ toggling ? '切换中...' : (aiAlive ? '停止 AI' : '启动 AI') }}
        </button>

        <p class="hint">* 仅更新状态标识，不实际启停 llama-server 进程</p>
      </div>
      <!-- 未来其他 AI 卡片加在这里 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {reqIsAlive, reqToggleAlive} from "@/request/llamaApi";
import Header from "@/components/Header.vue";

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
$green-mid: #4caf50
$green-dark: #2e7d32
$green-deep: #1b5e20

.ai-control-page
  min-height: 100vh
  background: #f5f5f5

// ── 卡片容器（左上角排列） ──
.ai-cards-container
  padding: 16px
  display: flex
  flex-wrap: wrap
  gap: 12px
  align-items: flex-start

// ── 单个 AI 小卡片 ──
.ai-card
  background: #ffffff
  border-radius: 8px
  padding: 16px
  border: 1px solid #e0e0e0
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
  width: 260px

.ai-card-header
  display: flex
  align-items: center
  gap: 8px
  margin-bottom: 14px

.ai-title
  font-size: 15px
  font-weight: 700
  color: $green-deep

.status-area
  display: flex
  align-items: center
  gap: 8px
  margin-bottom: 14px

.status-dot
  width: 10px
  height: 10px
  border-radius: 50%

  &.alive
    background-color: $green-mid

  &.dead
    background-color: #9e9e9e

.status-text
  font-size: 13px
  font-weight: 600
  color: $green-dark

.toggle-btn
  display: inline-flex
  align-items: center
  justify-content: center
  width: 100%
  height: 36px
  border: none
  border-radius: 6px
  font-size: 14px
  font-weight: 600
  cursor: pointer

  &.alive
    background-color: #ef5350
    color: white

  &.dead
    background-color: $green-mid
    color: white

  &:disabled
    opacity: 0.7
    cursor: not-allowed

.hint
  margin-top: 10px
  margin-bottom: 0
  font-size: 11px
  color: #999
  line-height: 1.4
</style>
