# Vue的nextTick函数

> 2024年5月14日11:25:47

## 概述

* 在修改了 DOM 元素的数据后，需要立即对新的DOM 执行 JS 操作时，这时就需使用 nextTick() 方法。 

* 通俗的理解是：当你将**更新数据**与**操作新dom**放一起时，操作新dom需要使用 nextTick。

## 样例

```vue
<template>
  <div>
    <p ref="refP">消息：{{ message }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const message = ref('第一条消息')

const refP = ref(null)
console.log(refP.value)
</script>
```

* 这个场景中，会打印出null，这是因为**"设置message的值"**与**"获取p标签value"**其实是同时进行的，即：都在组件正式渲染之前。
* 这时需要使用**nextTick**让获取**"获取p标签value"**这个操作等一会即可，比如下面这样。

```js
nextTick(() => {
  console.log(refP.value)
})
```