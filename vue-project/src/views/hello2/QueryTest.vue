<template>
  <ul>
    <li>参数一：{{ msg.msg1 }}</li>
    <li>参数二：{{ msg.msg2 }}</li>
    <li>总参数：{{ msg }}</li>
  </ul>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";

interface Query {
  msg1: string,
  msg2: string
}

let msg: Query = {
  msg1: "无", msg2: "无"
}
// const query = <Query>useRouter().currentRoute.value.query.valueOf()
const query = <Query>useRoute().query.valueOf()
const setMsg = (q: Query) => {
  msg.msg1 = q?.msg1
  msg.msg2 = q?.msg2
}
setMsg(query)
</script>

<style scoped>

</style>