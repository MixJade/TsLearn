<template>
  <table class="yearTable">
    <caption class="weight">{{ year }}</caption>
    <tbody>
    <tr>
      <td colspan="2">
        <MoneyTag label="当年盈余" :income="yearData.money>0" :money="yearData.money"/>
      </td>
    </tr>
    <tr>
      <td>
        <MoneyTag label="总收入" :income="true" :money="yearData.moneyIn"/>
      </td>
      <td>
        <MoneyTag label="总支出" :income="false" :money="yearData.moneyOut"/>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <MoneyTag label="月均盈余" :income="yearData.monthAvgMoney>0" :money="yearData.monthAvgMoney"/>
      </td>
    </tr>
    <tr>
      <td>
        <MoneyTag label="月均收入" :income="true" :money="yearData.monthAvgMoneyIn"/>
      </td>
      <td>
        <MoneyTag label="月均支出" :income="false" :money="yearData.monthAvgMoneyOut"/>
      </td>
    </tr>
    </tbody>
  </table>
  <h3>收支分析</h3>
  <div class="yearReport">
    <!-- 年度柱状图-->
    <div class="dashboard">
      <canvas ref="barYearChartRef"></canvas>
    </div>
    <!-- 年度线性图-->
    <div class="dashboard">
      <canvas ref="lineYearChartRef"></canvas>
    </div>
  </div>
  <CheckBtn v-model="isIncome" left="收" right="支" @change="reqDrawChart"/>
  <h3>消费分析</h3>
  <div class="yearReport">
    <div class="dashboard">
      <canvas ref="barChartRef"></canvas>
    </div>
    <div class="dashboard">
      <canvas ref="pieChartRef"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  Tooltip
} from 'chart.js';
import {ChartType} from "chart.js/dist/types";
import {useRoute} from "vue-router";
import {reqYearLine, reqYearPie} from "@/request/chartApi";
import {YearPayDo} from "@/model/vo/YearLineVo";
import MoneyTag from "@/components/tags/MoneyTag.vue";
import CheckBtn from "@/components/button/CheckBtn.vue";

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
const lineYearChartRef = ref<HTMLCanvasElement | null>(null);
const barYearChartRef = ref<HTMLCanvasElement | null>(null);
const barChartRef = ref<HTMLCanvasElement | null>(null);
const pieChartRef = ref<HTMLCanvasElement | null>(null);
// 展示数据
let year: number = 2025;
let yearData: YearPayDo = reactive({
  money: 0,
  moneyIn: 0,
  moneyOut: 0,
  monthAvgMoney: 0,
  monthAvgMoneyIn: 0,
  monthAvgMoneyOut: 0
});
const isIncome = ref<boolean>(false)
onMounted(() => {
  // 如此获取路由传参
  const route = useRoute();
  year = route.query.year as number;
  reqYearLine(year).then(resp => {
    Object.assign(yearData, resp.yearMoney);
    drawLine(resp.moneyOut, resp.moneyIn, resp.money)
  })

  reqYearPie(year, isIncome.value).then(resp => {
    drawChart(resp.bigTypes, resp.labels, resp.colors, resp.moneys)
  })
});

let barChart: Chart<ChartType, number[], unknown>;
let pieChart: Chart<ChartType, number[], unknown>;
const reqDrawChart = () => {
  reqYearPie(year, isIncome.value).then(resp => {
    barChart.destroy()
    pieChart.destroy()
    drawChart(resp.bigTypes, resp.labels, resp.colors, resp.moneys)
  })
}

const drawLine = (moneyOut: number[], moneyIn: number[], money: number[]): void => {
  if (lineYearChartRef.value === null || barYearChartRef.value === null) return;
  const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  new Chart(lineYearChartRef.value, {
    type: 'line' as ChartType,
    data: {
      labels: labels,
      datasets: [
        {
          label: '支出',
          data: moneyOut,
          borderColor: 'rgb(102,239,56)',
          backgroundColor: 'rgba(107,241,17,0.2)',
          fill: false
        },
        {
          label: '收入',
          data: moneyIn,
          borderColor: 'rgb(239,33,118)',
          backgroundColor: 'rgba(235,54,81,0.2)',
          fill: false
        },
        {
          label: '盈余',
          data: money,
          borderColor: 'rgb(21,183,218)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false
        }
      ]
    },
  });
  // 柱状图
  new Chart(barYearChartRef.value, {
    type: 'bar' as ChartType,
    data: {labels: labels,
      datasets: [{label: '支出', data: moneyOut, backgroundColor: 'rgb(102,239,56)', fill: false}, {
        label: '收入',
        data: moneyIn,
        backgroundColor: 'rgb(239,33,118)',
        fill: false
      }, {label: '盈余', data: money, backgroundColor: 'rgb(21,183,218)', fill: false},]
    },
  });
}

const drawChart = (bigTypes: number[], labels: string[], colors: string[], moneys: number[]): void => {
  if (barChartRef.value === null || pieChartRef.value === null) return;
  const label = '总' + (isIncome.value ? '收入' : '支出');
  // 柱状图
  barChart = new Chart(barChartRef.value, {
    type: 'bar' as ChartType,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: moneys,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      onClick: function (event, elements) {
        if (elements.length > 0) {
          const firstElement = elements[0];
          const index = firstElement.index;
          const label = this.data.labels[index];
          alert(`你点击了 ${label} id ${bigTypes[index]}`);
        }
      }
    }
  });

  // 饼状图
  pieChart = new Chart(pieChartRef.value, {
    type: 'pie' as ChartType,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: moneys,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    }
  });
}
</script>
<style lang="sass" scoped>
.yearReport
  display: flex
  padding: 12px
  //子元素间隙
  gap: 48px

.yearTable
  border-collapse: collapse

  tr
    text-align: center

  td
    border: 2px solid #909399
    padding: 8px

.dashboard
  width: 600px
  height: 300px
</style>