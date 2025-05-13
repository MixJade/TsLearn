<template>
  <h2>Js代码</h2>
  <pre class="line-numbers" contenteditable="true">
    <code class='language-js'>
      function curry(func) {
        return function curried(...args) {
          if (args.length >= func.length) {
            return func.apply(this, args);
          } else {
            return function(...args2) {
              return curried.apply(this, args.concat(args2));
            }
          }
        };
      }
    </code>
  </pre>
  <h2>Sql代码</h2>
  <pre class="line-numbers" contenteditable="true">
    <code class='language-sql'>
      SELECT * FROM good;
    </code>
  </pre>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import Prism from 'prismjs';

onMounted(() => {
  Prism.highlightAll();
})
</script>

<style lang="sass" scoped>
</style>