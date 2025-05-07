<template>
  <ReportBtn style="float: right" text="返回首页" type="info" @click="toCalendar"/>
  <h3>消费时序</h3>
  <div class="yearReport">
    <div style="width: 900px">
      <canvas ref="dayBarChartRef"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  PieController,
  Tooltip
} from 'chart.js';
import {ChartType} from "chart.js/dist/types";
import {useRoute, useRouter} from "vue-router";
import {reqBarDay} from "@/request/chartApi";
import ReportBtn from "@/components/button/ReportBtn.vue";

// 注册所需的元素、控制器和比例尺
Chart.register(
    BarElement,
    PieController,
    BarController,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
);

// 引用 canvas 元素
const dayBarChartRef = ref<HTMLCanvasElement | null>(null);
// 展示数据
let year: number = 2025;
let month: number = 1;
onMounted(() => {
  // 如此获取路由传参
  const route = useRoute();
  if (typeof route.query.year === 'string') {
    year = parseInt(route.query.year, 10);
    month = parseInt(<string>route.query.month, 10);
  }
  reqBarDay(year, month).then(resp => {
    drawChart(resp.labels, resp.moneyOuts, resp.moneyIns)
  })
});

let barChart: Chart<ChartType, number[], unknown>;

const drawChart = (labels: string[], moneyOut: number[], moneyIn: number[]): void => {
  if (dayBarChartRef.value === null) return;
  // 柱状图
  barChart = new Chart(dayBarChartRef.value, {
    type: 'bar' as ChartType,
    data: {
      labels: labels,
      datasets: [{label: '支出', data: moneyOut, backgroundColor: 'rgb(102,239,56)', fill: false}, {
        label: '收入',
        data: moneyIn,
        backgroundColor: 'rgb(239,33,118)',
        fill: false
      }]
    },
  });
}

const router = useRouter();
const toCalendar = (): void => {
  router.push({name: "calendar", query: {date: `${year}-${month}`}})
}
</script>
<style lang="sass" scoped src="../myCss/myReport.sass">
</style>