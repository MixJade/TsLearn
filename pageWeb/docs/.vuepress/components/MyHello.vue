<template>
  <h1>{{ role }}</h1>
  <h2>你好世界</h2>
  <h2>当前功德：{{ count }}</h2>
  <div>
    <span>当前台词：{{ man.line }}</span>
    <br>
    <span>当前薪水：{{ testComputed }}</span>
  </div>
  <button @click="update">敲木鱼</button>
  <button @click="updateLine">改台词</button>
</template>

<script setup lang="ts">
defineProps<{
  role: string
}>()
import {computed, reactive, ref} from "vue";
// 定义响应式数据 ref对象，一般设置基本类型的数据
const count = ref(1)
// 调用reactive，取值比较方便
const man = reactive({
  line: "你好",
  money: 2500
})
const lines = reactive(["南无", "阿唎耶", "婆卢羯帝", "烁钵啰耶", "菩提萨埵婆耶", "摩诃萨埵婆耶"])
// 更新响应式数据的函数
const update = () => {
  count.value = count.value + 1
  // 取值更加方便
  man.line = lines[count.value % (lines.length - 1)]
  man.money += 50
}
// 根据索引，更改数组的某一元素，reactive的特点
const updateLine = () => {
  const index=count.value % (lines.length - 1)
  lines[index]="这个台词被更改了"
  man.line=lines[index]
}
// 计算属性测试
const testComputed=computed(()=>man.money+"元")
</script>

<style scoped>
button {
  height: 50px;
  width: 100px;
  color: whitesmoke;
  background-color: #725f0d;
  border: 2px solid #057915;
  border-radius: 10px;
  font-size: large;
}
</style>