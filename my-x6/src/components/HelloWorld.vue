<template>
  <h3>流程图样例</h3>
  <p>当前选中节点: {{ selectCellId }}
    <button @click="delSelectCell">删除</button>
  </p>
  <p>
    <button @click="printData">新增节点</button>
    <button @click="getJson">数据导出</button>
  </p>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Graph, Model} from '@antv/x6';
import {Snapline} from '@antv/x6-plugin-snapline'
import {Attr} from "@antv/x6/src/registry";
// 自定义连接桩颜色
const portCss: Attr.CellAttrs = {
  circle: {
    r: 7,
    magnet: true,
    stroke: 'transparent', // 连接桩圈颜色
    strokeWidth: 1,
    fill: 'transparent', // 连接桩填充颜色
  }
}

// 自定义节点
Graph.registerNode(
    'custom-node',
    {
      inherit: 'rect', // 继承于 rect 节点
      width: 120,
      height: 40,
      markup: [
        {
          tagName: 'rect', // 标签名称
          selector: 'body', // 选择器
        },
        {
          tagName: 'image',
          selector: 'img',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
        img: {
          'xlink:href': '/vite.svg',
          width: 16,
          height: 16,
          x: 12,
          y: 12,
        },
      },
      // 连接桩
      ports: {
        groups: {
          top: {
            position: 'top',
            attrs: portCss,
            // 配置从连接桩拉出的边的类型
            'port-connection-config': {
              edge: {
                shape: 'my-edge', // 指定边的类型为 my-edge
              },
            },
          },
          right: {
            position: 'right',
            attrs: portCss,
          },
          bottom: {
            position: 'bottom',
            attrs: portCss,
          },
          left: {
            position: 'left',
            attrs: portCss,
          },
        },
        // 定义每个连接桩的位置和所属组
        items: [
          {
            id: 'port-top',
            group: 'top',
          },
          {
            id: 'port-right',
            group: 'right',
          },
          {
            id: 'port-bottom',
            group: 'bottom',
          },
          {
            id: 'port-left',
            group: 'left',
          },
        ],
      },
    },
    true,)

/**
 * 节点数据
 */
const data: Model.FromJSONData = {
  // 节点
  nodes: [
    {
      shape: 'custom-node',
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
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
      labels: ['边标签'],
      attrs: {
        line: {
          stroke: '#2d3033', // 设置边的颜色为红色
          strokeWidth: 2, // 设置边的宽度为 2px
          strokeDasharray: '5 5', // 设置虚线样式
        },
      },
      connector: {
        name: 'smooth', // 平滑连接器，用三次贝塞尔曲线线连接起点、路由点和终点
        args: {
          radius: 20,
        },
      },
    },
  ],
};


/**
 * 生成节点主键
 */
const timeId = () => {
  const now = new Date();
  // 获取年份的后两位
  const year = String(now.getFullYear()).slice(-2);
  // 获取月份，并保证为两位数字
  const month = String(now.getMonth() + 1).padStart(2, '0');
  // 获取日期，并保证为两位数字
  const day = String(now.getDate()).padStart(2, '0');
  // 获取小时，并保证为两位数字
  const hours = String(now.getHours()).padStart(2, '0');
  // 获取分钟，并保证为两位数字
  const minutes = String(now.getMinutes()).padStart(2, '0');
  // 获取秒数，并保证为两位数字
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

/**
 * 容器的HTML对象
 */
const container = ref<HTMLElement>()
let graph: Graph
let selectCellId = ref<string | null>(null);
/**
 * 画布初始化
 */
onMounted(() => {
  graph = new Graph({
    container: container.value,
    width: 1000,
    height: 500,
    background: {
      color: '#F2F7FA', // 设置画布背景颜色
    },
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee', // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: '#ddd', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
    connecting: {
      connector: 'smooth', // 全局连接配置：平滑连接器
      allowBlank: false, // 不允许连接空白地方
      allowEdge: false, // 不允许连接到边
      allowNode: false, // 不允许连接节点
      allowLoop: false, // 不允许循环连接
      allowMulti: true, // 全局允许连接桩创建多条边
      createEdge() {
        return this.createEdge!({
          id: timeId(),
          shape: 'edge',
          attrs: {
            line: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
            },
          },
        })
      },
    },
  });
  graph.fromJSON(data)
  // 使用对齐线组件
  graph.use(
      new Snapline({
        enabled: true,
      }),
  )
  // 设置节点选中，删除
  graph.on("node:click", (node) => {
    selectCellId.value = node.cell.id;
  });
  graph.on("edge:click", (edge) => {
    selectCellId.value = edge.cell.id;
  });
})

/**
 * 新建一个节点
 */
const printData = () => {
  graph.addNode({
    id: timeId(),
    shape: 'custom-node',
    x: 100,
    y: 200,
    label: 'Hello',
  })
}

const getJson = () => {
  console.log("导出的JSON:", graph.toJSON())
}

/**
 * 删除选中节点
 */
const delSelectCell = () => {
  const cellId = selectCellId.value;
  if (cellId != null) {
    // graph.getCellById :可以根据id获取线或者节点的信息； graph.getCells获取所有节点和边的信息
    const cell = graph.getCellById(cellId);
    graph.removeCell(cell);
  }
}
</script>

<style scoped>
</style>
