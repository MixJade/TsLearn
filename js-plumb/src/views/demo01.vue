<template>
  <h3>1.连接两个节点(可拖动、基础属性说明)</h3>

  <div class="line-wrap">
    <div id="item_left" class="state-item">卡片1</div>
    <div id="item_right" class="state-item" style="margin-left:50px;">卡片2</div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {jsPlumb} from "jsplumb";
// 注意：`jsPlumb`的使用只能在`mounted`函数中,因为它是在页面加载完成后才开始连线。
onMounted(() => {
  jsPlumb.ready(function () {
    jsPlumb.connect({
      source: 'item_left',
      target: 'item_right',
      // 连接点样式(默认是Dot)
      // Dot(圆点),Rectangle(正方形)
      endpoint: 'Dot',
      // 连线类型(默认是Bezier)
      // Bezier(贝塞尔曲线), Flowchart(具有90度转折点的流程线), StateMachine(状态机), Straight(直线)
      connector: ['Flowchart'],
    })
  })

  // 让这两个节点可拖动
  jsPlumb.draggable('item_left')
  jsPlumb.draggable('item_right')
})
</script>

<style scoped>
</style>
