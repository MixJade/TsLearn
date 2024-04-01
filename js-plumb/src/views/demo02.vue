<template>
  <h3>2.连接配置抽离(样式定义、箭头)</h3>

  <div id="wrapper">
    <div class="line-wrap" style="margin-left: 70px;">
      <div id="item-1" class="state-item">State 1</div>
      <div id="item-2" class="state-item">State 2</div>
      <div id="item-3" class="state-item">State 3</div>
    </div>
    <div class="line-wrap">
      <div id="item-4" class="state-item">State 4</div>
      <div id="item-5" class="state-item">State 5</div>
    </div>
    <div class="line-wrap" style="margin-left: 215px;">
      <div id="item-6" class="state-item">State 6</div>
      <div id="item-7" class="state-item">State 7</div>
    </div>
  </div>
</template>

<script setup>
import {jsPlumb} from 'jsplumb'
import {onMounted} from "vue";

onMounted(() => {
  jsPlumb.ready(function () {
    // 抽离的连接配置
    const common = {
      connector: ['Flowchart'],
      // 设置连线样式
      paintStyle: {stroke: 'red', strokeWidth: 3},
      endpoint: 'Rectangle',
      // 设置点样式
      endpointStyle: {fill: 'blue', outlineStroke: 'darkgray', outlineWidth: 2},
      // 设置箭头:location 0.5表示箭头位于中间，location 1表示箭头设置在连线末端
      // Arrow(一个可配置的箭头),
      // Label(标签，可以在链接上显示文字信息),
      // PlainArrow(原始类型的箭头),
      // Diamond (菱形箭头),
      // Custom(自定义类型)
      overlays: [['Arrow', {width: 12, length: 12, location: 0.5}]],
    };
    // 抽离的配置如此使用(注意：common在大括号外)
    jsPlumb.connect({
      source: 'item-1',
      target: 'item-2'
    }, common);
    // 抽离的配置如此使用
    jsPlumb.connect({
      source: 'item-3',
      target: 'item-5'
    }, common);
  })
})
</script>

<style scoped>
#wrapper {
  background: radial-gradient(
      ellipse at top left,
      rgba(255, 255, 255, 1) 40%,
      rgba(229, 229, 229, .9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}
</style>
