<template>
  <div
      @mousemove="onMousemove"
      :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
      class="move-area"
  >
    <p>Move your mouse across this div...</p>
    <p>x: {{ x }}</p>
  </div>
</template>

<script setup>
import {ref} from "vue";

const x = ref(0)
function onMousemove(e) {
  x.value = e.clientX
}
</script>

<style scoped>
.move-area {
  transition: 0.3s background-color ease;
  width: 290px;
  height: 60px;
}
</style>