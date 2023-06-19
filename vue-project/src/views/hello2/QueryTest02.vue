<template>
<ul>
  <li>参数一：{{ $route.query.msg1 }}</li>
  <li>参数二：{{ $route.query.msg2 }}</li>
  <li>总参数：{{ $route.query}}</li>
</ul>
</template>

<script>
export default {
  name: "QueryTest02",
  "mounted"() {
    console.log(this.$route["query"])
  }
}
</script>

<style scoped>

</style>