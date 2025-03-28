<template>
  <h2>PayRecords</h2>
  <button @click="tesTus('suc','正确消息')">测试图示</button>
  <button @click="tesTus('err','错误消息')">测试图示2</button>
  <ToastBox ref="childRef"/>
  <MyTable caption="收支记录" :thead="['类型','金额','备注','付费时间','操作']">
    <tr v-for="td in tableData" :key="td.recordId">
      <td style="color: #ccc;font-weight: bolder">{{ td.keyName }}</td>
      <td><span :class="[td.isIncome ? 'in' : 'out']">{{ td.isIncome ? '+' : '-' }}{{ td.money }}</span></td>
      <td>{{ td.remark }}</td>
      <td>{{ td.payDate }}</td>
      <td>
        <TbBtn/>
      </td>
    </tr>
  </MyTable>
</template>

<script lang="ts" setup>
import ToastBox from "@/components/message/ToastBox.vue";
import {onMounted, reactive, ref} from "vue";
import {PayRecordPageDto} from "@/model/dto/PayRecordPageDto";
import {reqPayRecordPage} from "@/request/payRecordApi";
import MyTable from "@/components/show/MyTable.vue";
import {PayRecordVo} from "@/model/vo/PayRecordVo";
import TbBtn from "@/components/button/TbBtn.vue";

onMounted(() => {
  getAll();
})

// 引用子组件
const childRef: ToastBox = ref(null);
// 调用子组件暴露的方法
const tesTus = (type: "suc" | "err", msg: string) => {
  if (childRef.value) {
    childRef.value.showToast(type, msg);
  }
};

// 表格数据
const tableData = ref<PayRecordVo[]>([])
// 分页条件请求体
const reqBody = reactive<PayRecordPageDto>({
  beginDate: "", bigType: 0, endDate: "", paymentType: 0
})
const getAll = () => {
  reqPayRecordPage(1, 10, reqBody).then(resp => {
    tableData.value = resp.records
  })
}
</script>

<style scoped lang="sass">
// ========================[表格样式]===============================
.in
  //收入的字体
  color: #c45656
  font-weight: bolder

.out
  //支出的字体
  color: #17bd17
  font-weight: bolder

</style>