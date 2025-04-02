<template>
  <div>
    <div class="dashboard">
      <canvas ref="lineChartRef"></canvas>
    </div>
    <div class="dashboard">
      <canvas ref="barChartRef"></canvas>
    </div>
    <div class="dashboard">
      <canvas ref="pieChartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {
  Chart,
  LineElement,
  BarElement,
  PieController,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// 注册所需的元素、控制器和比例尺
Chart.register(
    LineElement,
    BarElement,
    PieController,
    LineController,
    BarController,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
);

// 引用 canvas 元素
const lineChartRef = ref(null);
const barChartRef = ref(null);
const pieChartRef = ref(null);

onMounted(() => {
  // 折线图
  new Chart(lineChartRef.value, {
    type: 'line',
    data: {
      labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
      datasets: [
        {
          label: '折线图示例',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'blue',
          backgroundColor: 'rgba(107,241,17,0.2)',
          fill: false
        },
        {
          label: '折线图示例2',
          data: [15, 14, 6, 8, 5, 7],
          borderColor: 'red',
          backgroundColor: 'rgba(235,54,81,0.2)',
          fill: false
        },
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Custom Chart Title',
          padding: {
            top: 10,
            bottom: 30
          }
        }
      }
    }
  });

  // 柱状图
  new Chart(barChartRef.value, {
    type: 'bar',
    data: {
      labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
      datasets: [
        {
          label: '柱状图示例',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'green'
        }
      ]
    },
    options: {}
  });

  // 扇形图
  new Chart(pieChartRef.value, {
    type: 'pie',
    data: {
      labels: ['苹果', '香蕉', '橙子'],
      datasets: [
        {
          label: '扇形图示例',
          data: [30, 50, 20],
          backgroundColor: ['red', 'yellow', 'orange']
        }
      ]
    },
    options: {}
  });
});


</script>
<style scoped lang="sass">
.dashboard
  width: 600px
  height: 300px
</style>