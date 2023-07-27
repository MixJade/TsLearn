<template>
  <h3 @click="printData">流程图样例</h3>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Graph, Model} from '@antv/x6';
import FromJSONData = Model.FromJSONData;

/**
 * 容器的HTML对象
 */
const container = ref<HTMLElement>()
let graph: Graph

/**
 * 节点数据
 */
const data: FromJSONData = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
};

/**
 * 画布初始化
 */
onMounted(() => {
  graph = new Graph({
    container: container.value,
    width: 1000,
    height: 500,
    background: {
      color: '#cccccc', // 设置画布背景颜色
    },
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
  });
  graph.fromJSON(data)
})

/**
 * 新建一个节点
 */
const printData = () => {
  graph.addNode({
    x: 100,
    y: 200,
    width: 80,
    height: 40,
    label: 'Hello',
    // 链接桩
    ports: [
      {
        id: 'port1',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      }
    ],
  })
}
</script>

<style scoped>
</style>
