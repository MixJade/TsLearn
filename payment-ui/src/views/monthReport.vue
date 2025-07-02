<template>
  <ReportBtn style="float: right" text="返回首页" type="info" @click="toCalendar"/>
  <h3>消费总结</h3>
  <table class="yearTable">
    <caption class="weight">{{ year }}-{{ month }}</caption>
    <tbody>
    <tr>
      <td colspan="2">
        <MoneyTag :income="monthData.money>0" :money="monthData.money" label="当月盈余"/>
      </td>
    </tr>
    <tr>
      <td>
        <MoneyTag :income="true" :money="monthData.moneyIn" label="总收入"/>
      </td>
      <td>
        <MoneyTag :income="false" :money="monthData.moneyOut" label="总支出"/>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <MoneyTag :income="monthData.monthAvgMoney>0" :money="monthData.monthAvgMoney" label="日均盈余"/>
      </td>
    </tr>
    <tr>
      <td>
        <MoneyTag :income="true" :money="monthData.monthAvgMoneyIn" label="日均收入"/>
      </td>
      <td>
        <MoneyTag :income="false" :money="monthData.monthAvgMoneyOut" label="日均支出"/>
      </td>
    </tr>
    </tbody>
  </table>
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
  PieController,
  Tooltip,
  TooltipItem
} from 'chart.js';
import {ChartType} from "chart.js/dist/types";
import {useRouter} from "vue-router";
import {reqBigTypePieMonth, reqMonthMoney, reqMonthPie} from "@/request/chartApi";
import {YearPayDo} from "@/model/vo/YearLineVo";
import MoneyTag from "@/components/tags/MoneyTag.vue";
import CheckBtn from "@/components/button/CheckBtn.vue";
import ReportBtn from "@/components/button/ReportBtn.vue";
import {sharedDate} from "@/store/shareDate";

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
const barChartRef = ref<HTMLCanvasElement | null>(null);
const pieChartRef = ref<HTMLCanvasElement | null>(null);
const pieBigTypeChartRef = ref<HTMLCanvasElement | null>(null);
// 展示数据
let year: number = sharedDate.year;
let month: number = sharedDate.month;
let monthData: YearPayDo = reactive({
  money: 0,
  moneyIn: 0,
  moneyOut: 0,
  monthAvgMoney: 0,
  monthAvgMoneyIn: 0,
  monthAvgMoneyOut: 0
});
const isIncome = ref<boolean>(false)
onMounted(() => {
  reqMonthMoney(year, month).then(resp => {
    Object.assign(monthData, resp);
  })

  reqMonthPie(year, month, isIncome.value).then(resp => {
    drawChart(resp.bigTypes, resp.labels, resp.colors, resp.moneys)
  })

  // 默认查询餐饮数据
  reqBigTypePieMonth(year, month, 1, isIncome.value).then(resp => {
    drawBigTypePie(resp.labels, resp.moneys)
  })
});

let barChart: Chart<ChartType, number[], unknown>;
let pieChart: Chart<ChartType, number[], unknown>;
let pieBigTypeChart: Chart<ChartType, number[], unknown>;
const reqDrawChart = () => {
  reqMonthPie(year, month, isIncome.value).then(resp => {
    barChart.destroy()
    pieChart.destroy()
    drawChart(resp.bigTypes, resp.labels, resp.colors, resp.moneys)
  })
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
      onClick: function (_, elements) {
        if (elements.length > 0) {
          const index = elements[0].index;
          bigTypeTit.value = chartData.labels[index];
          pieBigTypeChart.destroy();
          reqBigTypePieMonth(year, month, bigTypes[index], isIncome.value).then(resp => {
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
          reqBigTypePieMonth(year, month, bigTypes[index], isIncome.value).then(resp => {
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