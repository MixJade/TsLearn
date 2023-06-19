<template>
  <p>姓名：{{ name }}</p>
  <p>薪水：{{ job.j1.salary }}k</p>
<!--  <button @click="job.j1.salary++">数字增加</button>-->
  <button @click="name+='i'">文字增加</button>
</template>

<script lang="ts">
import {reactive, readonly, toRefs} from "vue";

export default {
  "setup"() {
    const person = readonly(reactive({
      name: "li",
      job: {
        j1: {
          salary: 20
        }
      }
    }))
    // toRefs测试
    return {
      ...toRefs(person)
    }
  }
}

</script>

<style scoped>

</style>