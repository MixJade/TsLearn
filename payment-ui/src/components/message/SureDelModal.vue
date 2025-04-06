<template>
  <dialog ref="dialog" class="sureDelModal">
    <p>{{ showTxt }}</p>
    <div style="text-align: right">
      <MyBtn text="确认" type="danger" @click="confirm"/>
      <MyBtn text="取消" type="secondary" @click="cancel"/>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import MyBtn from "@/components/button/MyBtn.vue";
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
</style>
