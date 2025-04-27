<template>
  <dialog ref="dialog" class="sureDelModal">
    <p class="content">{{ showTxt }}</p>
    <div style="text-align: right">
      <button class="sure-btn btn-confirm" type="button" @click="confirm">确认</button>
      <button class="sure-btn btn-cancel" type="button" @click="cancel">取消</button>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
// 删除确认时的弹出框
// 定义模态框和确定按钮的引用
const dialog = ref<HTMLDialogElement>()
// 组件状态
const resolvePromise = ref<(value: boolean) => void>();
const showTxt = ref<string>("一旦删除，数据无法找回，是否删除");
// 暴露 confirmDel 方法
const confirmDel = (txt: string): Promise<boolean> => {
  showTxt.value = txt;
  return new Promise<boolean>((resolve) => {
    dialog.value?.showModal();
    resolvePromise.value = resolve;
  });
};

// 确认操作
const confirm = () => {
  dialog.value?.close()
  resolvePromise.value?.(true);
};

// 取消操作
const cancel = () => {
  dialog.value?.close()
  resolvePromise.value?.(false);
};
defineExpose({confirmDel})

</script>

<style lang="sass" scoped>
dialog.sureDelModal
  //dialog标签只能这样定位
  margin-top: 5vh
  //通用样式
  border-radius: 20px
  box-shadow: 0 0 36px 0 #606266
  min-width: 320px
  text-align: center
  //自定义颜色
  border: 3px solid #F56C6C
  background-color: #fef0f0
  color: #F56C6C
  //入场动画
  animation: slide-down 0.3s ease-out

  .content
    padding: 16px

@keyframes slide-down
  0%
    margin-top: 0
    opacity: 0
  100%
    margin-top: 5vh
    opacity: 1

.sure-btn
  padding: 6px 12px
  margin-right: 6px
  font-weight: bolder
  border-radius: 6px
  transition: 0.5s
  cursor: pointer

  &.btn-confirm
    color: white
    background-color: #F56C6C
    border: 2px solid #c45656

  &.btn-cancel
    color: #909399
    background-color: #e9e9eb
    border: 2px solid #73767a

    &:hover
      color: white
      background-color: #909399
</style>
