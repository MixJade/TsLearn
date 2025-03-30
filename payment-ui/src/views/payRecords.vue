<template>
  <button @click="tesTus('suc','正确消息')">测试图示</button>
  <button @click="tesTus('err','错误消息')">测试图示2</button>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage" :thead="['类型','金额','备注','付费时间','操作']" caption="收支记录"
           @pageChange="getAll">
    <template #searchForm>
      <DropSelect :option-data="optionData" @changeSel="changeSel"/>
      <label for="beginDate">起始日</label>
      <input id="beginDate" v-model="reqBody.beginDate" type="date" @change="getAll">
      <label for="endDate">终止日</label>
      <input id="endDate" v-model="reqBody.endDate" type="date" @change="getAll">
    </template>
    <template #searchBtn>
      <MyBtn text="添加记录" type="success"/>
      <MyBtn text="收支类型" type="secondary"/>
      <MyBtn text="返回首页" type="primary" @click="toRoute('/')"/>
    </template>
    <tr v-for="td in tableData" :key="td.recordId">
      <td :style="{color:  td.color}" class="weight">{{ td.keyName }}</td>
      <td><span :class="[td.isIncome ? 'in' : 'out']" class="weight">{{ td.isIncome ? '+' : '-' }}{{ td.money }}</span>
      </td>
      <td>{{ td.remark }}</td>
      <td>{{ td.payDate }}</td>
      <td>
        <TbBtn/>
      </td>
    </tr>
  </MyTable>
  <!-- 吐司组件-->
  <ToastBox ref="childRef"/>
</template>

<script lang="ts" setup>
import ToastBox from "@/components/message/ToastBox.vue";
import {onMounted, reactive, ref} from "vue";
import {PayRecordPageDto} from "@/model/dto/PayRecordPageDto";
import {reqPayRecordPage} from "@/request/payRecordApi";
import MyTable, {TbPage} from "@/components/show/MyTable.vue";
import {PayRecordVo} from "@/model/vo/PayRecordVo";
import TbBtn from "@/components/button/TbBtn.vue";
import DropSelect from "@/components/button/DropSelect.vue";
import {reqOption} from "@/request/payDictApi";
import {TypeSelectVo} from "@/model/vo/TypeSelectVo";
import MyBtn from "@/components/button/MyBtn.vue";
import {useRouter} from "vue-router";

onMounted(() => {
  getAll();
  reqOption().then(resp => {
    optionData.value = resp
  })
})
/**
 * ===================================[搜索框数据]============================================
 */

// 二级下拉框数据
const optionData = ref<TypeSelectVo[]>([])
const changeSel = (oneKey: number, twoKey: number | null) => {
  reqBody.bigType = oneKey
  reqBody.paymentType = twoKey
  getAll();
}

const router = useRouter();
// 跳转路由
const toRoute = (url: string) => {
  router.push(url)
}

/**
 * =======================================[吐司消息]=======================================
 */
// 引用子组件
const childRef = ref<any>(null);
// 调用子组件暴露的方法
const tesTus = (type: "suc" | "err", msg: string) => {
  if (childRef.value) {
    childRef.value.showToast(type, msg);
  }
};

/**
 * ===================================[表格数据]============================================
 */
// 表格数据
const tableData = ref<PayRecordVo[]>([])
const tablePage = reactive<TbPage>({current: 1, pages: 1, total: 0, size: 10}) as TbPage
// 分页条件请求体
const reqBody = reactive<PayRecordPageDto>({
  beginDate: "", bigType: 0, endDate: "", paymentType: 0
}) as PayRecordPageDto
const getAll = () => {
  reqPayRecordPage(tablePage.current, tablePage.size, reqBody).then(resp => {
    tableData.value = resp.records
    tablePage.current = resp.current;
    tablePage.pages = resp.pages
    tablePage.total = resp.total
    tablePage.size = resp.size
  })
}
</script>

<style lang="sass" scoped>
// ========================[表格样式]===============================
.weight
  font-weight: bolder

.in
  //收入的字体
  color: #c45656
  font-weight: bolder

.out
  //支出的字体
  color: #17bd17
  font-weight: bolder


input, select
  /*搜索框*/
  padding: 8px
  border: 2px solid #67C23A
  border-radius: 8px
  margin: 0 4px 0 4px

label
  //搜索label
  color: #529b2e
  font-size: smaller
</style>