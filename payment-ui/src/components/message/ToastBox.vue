<template>
  <div>
    <Toast v-for="toast in toasts.values()" :key="toast.id" :type="toast.type" :msg="toast.msg"/>
  </div>
</template>

<script lang="ts" setup>
import {ref, onBeforeUnmount} from 'vue';
import Toast from '@/components/message/Toast.vue';

// 使用 Map 来管理 toasts 和对应的定时器
const toasts = ref(new Map());
let toastId = 0; // 自增主键

const showToast = (type: "suc" | "err", msg: string): void => {
  toastId++
  const newToast = {type, msg, id: toastId};
  toasts.value.set(newToast.id, {
    ...newToast,
    timer: setTimeout(() => {
      toasts.value.delete(newToast.id);
    }, 3500)
  });
};

// 暴露方法给父组件
defineExpose({
  showToast
});

onBeforeUnmount(() => {
  // 组件卸载时,清除所有未执行的定时器
  toasts.value.forEach((toast) => {
    clearTimeout(toast.timer);
  });
});
</script>