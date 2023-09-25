<template>
  <div class="am-card">
    <div>那个</div>
    <div>你好</div>
    <div>在吗</div>
    <div>不在</div>
    <div>
      <button type="button" @click="myShow?.showMe()">展示弹出框</button>
    </div>
    <MyDialog :tit="notices[0].noticeTitle" :content="notices[0].textNotice" ref="myShow"/>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {exampleNotice, NoticeDto} from "@/modal/DO/NoticeDto";
import MyDialog from "@/components/show/MyDialog.vue";

const notices: NoticeDto[] = reactive(exampleNotice())
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
</script>

<style lang="scss" scoped>
$father: #e9e9f5;
$div-w: 120px;
$child-1: #2b772b;
$child-2: #228371;
$child-3: #a9695a;
$child-4: #bb8c38;

.am-card {
  background-color: $father;

  div {
    width: $div-w;
    text-align: center;
    text-shadow: #213547;
    background: {
      color: #cccccc;
      size: auto;
    };
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
