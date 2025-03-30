<template>
  <h2>PayRecords</h2>
  <button @click="tesTus('suc','正确消息')">测试图示</button>
  <button @click="tesTus('err','错误消息')">测试图示2</button>
  <!--搜索框-->
  <section class="mySearch">
    <form role="search" onsubmit="return false">
      <DropSelect :option-data="optionData"/>
      <label for="beginDate">起始日</label><input type="date" id="beginDate">
      <label for="endDate">终止日</label><input type="date" id="endDate">
      <button class="btn-line-suc" type="submit">Search</button>
    </form>
    <div>
      <button type="button" class="my-btn btn-success">添加记录</button>
      <button type="button" class="my-btn btn-secondary">收支类型
      </button>
      <button type="button" class="my-btn">返回首页
      </button>
    </div>
  </section>
  <!-- 表格 -->
  <MyTable caption="收支记录" :thead="['类型','金额','备注','付费时间','操作']" :tb-page="tablePage"
           @pageChange="getAll">
    <tr v-for="td in tableData" :key="td.recordId">
      <td :style="{color:  td.color}" class="weight">{{ td.keyName }}</td>
      <td><span class="weight" :class="[td.isIncome ? 'in' : 'out']">{{ td.isIncome ? '+' : '-' }}{{ td.money }}</span>
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

// 二级下拉框数据
const optionData = ref<TypeSelectVo[]>([])

onMounted(() => {
  getAll();
  reqOption().then(resp => {
    optionData.value = resp
  })
})

// 引用子组件
const childRef = ref<any>(null);
// 调用子组件暴露的方法
const tesTus = (type: "suc" | "err", msg: string) => {
  if (childRef.value) {
    childRef.value.showToast(type, msg);
  }
};

// 表格数据
const tableData = ref<PayRecordVo[]>([])
const tablePage = reactive<TbPage>({current: 1, pages: 1, total: 0, size: 10}) as TbPage
// 分页条件请求体
const reqBody = reactive<PayRecordPageDto>({
  beginDate: "", bigType: 0, endDate: "", paymentType: 0
})
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

<style scoped lang="sass">
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


.mySearch
  /*搜索栏目*/
  display: flex
  justify-content: space-between
  background-color: #F3F3F3
  border: 2px dashed #909399
  border-radius: 12px
  padding: 6px 12px

  > * > *
    height: 36px
    box-sizing: border-box

  > form
    & > input, select
      /*搜索框*/
      padding: 8px
      border: 2px solid #67C23A
      border-radius: 8px
      margin: 0 4px 0 4px

    label
      //搜索label
      color: #529b2e
      font-size: smaller

    > .btn-line-suc
      /*搜索按钮*/
      padding: 3px 10px 3px 5px
      color: #67C23A
      background-color: #f0f9eb
      border: 2px solid #67C23A
      border-radius: 8px

      &:hover
        /*搜索按钮*/
        color: white
        background-color: #67C23A

.my-btn
  padding: 6px 12px
  font-size: 12px
  font-weight: bold
  border-radius: 16px
  transition: 0.5s
  cursor: pointer

  &.btn-secondary
    color: white
    background-color: #909399
    border: 2px solid #73767a

  &.btn-primary
    color: white
    background-color: #409EFF
    border: 2px solid #337ecc

  &.btn-danger
    color: white
    background-color: #F56C6C
    border: 2px solid #c45656

  &.btn-success
    color: white
    background-color: #67C23A
    border: 2px solid #529b2e
</style>