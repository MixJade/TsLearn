<template>
  <div class="am-card">
    <div>那个</div>
    <div>你好</div>
    <div>在吗</div>
    <div>不在</div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
$father: #e9e9f5;
$div-w: 60px;
$child-1: #2b772b;
$child-2: #228371;
$child-3: #a9695a;
$child-4: #bb8c38;

.am-card {
  background-color: $father;

  div {
    text: {
      align: center;
      shadow: #213547;
    }
    width: $div-w;
  }

  :nth-child(1) {
    color: $child-1;
  }

  :nth-child(2) {
    color: $child-2;
  }

  :nth-child(3) {
    color: $child-3;
  }

  :nth-child(4) {
    color: $child-3;
  }
}
</style>