<template>
  <ReportBtn style="float: right" text="返回首页" type="info" @click="toCalendar"/>
  <h3>消费总结</h3>
  <table class="yearTable">
    <caption class="weight">{{ year }}</caption>
    <tbody>
    <tr>
      <td colspan="2">
        <MoneyTag :income="yearData.money>0" :money="yearData.money" label="当年盈余"/>
      </td>
    </tr>
    <tr>
      <td>
        <MoneyTag :income="true" :money="yearData.moneyIn" label="总收入"/>
      </td>
      <td>
        <MoneyTag :income="false" :money="yearData.moneyOut" label="总支出"/>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <MoneyTag :income="yearData.monthAvgMoney>0" :money="yearData.monthAvgMoney" label="月均盈余"/>
      </td>
    </tr>
    <tr>
      <td>
        <MoneyTag :income="true" :money="yearData.monthAvgMoneyIn" label="月均收入"/>
      </td>
      <td>
        <MoneyTag :income="false" :money="yearData.monthAvgMoneyOut" label="月均支出"/>
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
  <CheckBtn v-model="isIncome" @change="reqDrawChart"/>
  <h3>消费分析</h3>
  <div class="yearReport">
    <div class="dashboard">
      <canvas ref="barChartRef"></canvas>
    </div>
    <div class="dashboard">
      <canvas ref="pieChartRef"></canvas>
    </div>
  </div>
  <h3>消费构成({{ bigTypeTit }})</h3>
  <div class="yearReport">
    <div class="dashboard">
      <canvas ref="pieBigTypeChartRef"></canvas>
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
  Tooltip,
  TooltipItem
} from 'chart.js';
import {ChartType} from "chart.js/dist/types";
import {useRouter} from "vue-router";
import {reqBigTypePie, reqYearLine, reqYearPie} from "@/request/chartApi";
import {YearPayDo} from "@/model/vo/YearLineVo";
import MoneyTag from "@/components/tags/MoneyTag.vue";
import CheckBtn from "@/components/button/CheckBtn.vue";
import ReportBtn from "@/components/button/ReportBtn.vue";
import {sharedDate} from "@/store/shareDate";

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
const pieBigTypeChartRef = ref<HTMLCanvasElement | null>(null);
// 展示数据
let year: number = sharedDate.year;
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
  reqYearLine(year).then(resp => {
    Object.assign(yearData, resp.yearMoney);
    drawLine(resp.moneyOut, resp.moneyIn, resp.money)
  })

  reqYearPie(year, isIncome.value).then(resp => {
    drawChart(resp.bigTypes, resp.labels, resp.colors, resp.moneys)
  })

  // 默认查询餐饮数据
  reqBigTypePie(year, 1, isIncome.value).then(resp => {
    drawBigTypePie(resp.labels, resp.moneys)
  })
});

let barChart: Chart<ChartType, number[], unknown>;
let pieChart: Chart<ChartType, number[], unknown>;
let pieBigTypeChart: Chart<ChartType, number[], unknown>;
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
    data: {
      labels: labels,
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
  const chartData = {
    labels: labels,
    datasets: [{
      label: '总' + (isIncome.value ? '收入' : '支出'),
      data: moneys,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1
    }]
  }
  // 柱状图
  barChart = new Chart(barChartRef.value, {
    type: 'bar' as ChartType,
    data: chartData,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      onClick: (_, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          bigTypeTit.value = chartData.labels[index];
          pieBigTypeChart.destroy();
          reqBigTypePie(year, bigTypes[index], isIncome.value).then(resp => {
            drawBigTypePie(resp.labels, resp.moneys)
          })
        }
      }
    }
  });

  // 饼状图
  pieChart = new Chart(pieChartRef.value, {
    type: 'pie' as ChartType,
    data: chartData,
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem: TooltipItem<'pie'>) => {
              // 获取当前数据点的值
              let label = tooltipItem.label || '';
              if (label) {
                label += ': ';
              }
              // 计算当前数据点的百分比
              const total = tooltipItem.dataset.data.reduce((sum, value) => {
                return sum + value;
              }, 0);
              const percentage = ((Number(tooltipItem.parsed) / total) * 100).toFixed(2);
              label += `${tooltipItem.parsed} (${percentage}%)`;
              return label;
            }
          }
        }
      },
      onClick: (_, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          bigTypeTit.value = chartData.labels[index];
          pieBigTypeChart.destroy();
          reqBigTypePie(year, bigTypes[index], isIncome.value).then(resp => {
            drawBigTypePie(resp.labels, resp.moneys)
          })
        }
      }
    }
  });
}

const bigTypeTit = ref<string>("餐饮")
// 定义颜色数组
const colors = ['#36a2eb', '#ff6384', '#4bc0c0', '#ff9f40', '#9966ff', '#ffcd56', '#c9cbcf'];
// 生成循环颜色数组的函数
const getLoopedColors = (dataLength: number): string[] => {
  const result = [];
  for (let i = 0; i < dataLength; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
}
const drawBigTypePie = (labels: string[], moneys: number[]): void => {
  if (pieBigTypeChartRef.value === null) return;
  // 饼状图
  pieBigTypeChart = new Chart(pieBigTypeChartRef.value, {
    type: 'doughnut' as ChartType,
    data: {
      labels: labels,
      datasets: [{
        label: (isIncome.value ? '收入' : '支出'),
        data: moneys,
        backgroundColor: getLoopedColors(moneys.length),
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem: TooltipItem<'doughnut'>) => {
              // 获取当前数据点的值
              let label = tooltipItem.label || '';
              if (label) {
                label += ': ';
              }
              // 计算当前数据点的百分比
              const total = tooltipItem.dataset.data.reduce((sum, value) => {
                return sum + value;
              }, 0);
              const percentage = ((Number(tooltipItem.parsed) / total) * 100).toFixed(2);
              label += `${tooltipItem.parsed} (${percentage}%)`;
              return label;
            }
          }
        }
      }
    }
  });
}

const router = useRouter();
const toCalendar = (): void => {
  router.push("/")
}
</script>
<style lang="sass" scoped src="../myCss/myReport.sass">
</style>