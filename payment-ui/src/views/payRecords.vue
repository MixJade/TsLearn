<template>
  <button @click="tesTus('suc','正确消息')">测试图示</button>
  <button @click="tesTus('err','错误消息')">测试图示2</button>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage" :thead="['类型','金额','备注','付费时间','操作']" caption="收支记录"
           @pageChange="getAll">
    <template #searchForm>
      <span class="search-lab">类别</span>
      <DropSelect :option-data="optionData" :disable-one="false" @changeSel="changeSel"/>
      <label class="search-lab" for="beginDate">起始日</label>
      <input class="search-inp" id="beginDate" v-model="reqBody.beginDate" type="date" @change="getAll">
      <label class="search-lab" for="endDate">终止日</label>
      <input class="search-inp" id="endDate" v-model="reqBody.endDate" type="date" @change="getAll">
    </template>
    <template #searchBtn>
      <MyBtn text="添加记录" type="success" @click="openDialog"/>
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
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm" id="addPetForm">
      <fieldset>
        <legend id="dialogTit">添加记录</legend>
        <div class="form-row">
          <label>收支</label>
          <div style="display: inline-block">
            <input name="sex" id="isIncome_1" type="radio" autocomplete="off">
            <label for="isIncome_1">收入</label>
            <input name="sex" id="isIncome_2" type="radio" autocomplete="off"
                   checked>
            <label for="isIncome_2">支出</label>
          </div>
        </div>
        <div class="form-row">
          <label>收支类型</label>
          <DropSelect :option-data="optionData" :disable-one="true" @changeSel="changeSel"/>
        </div>
        <div class="form-row">
          <label for="money">金额(绝对值)</label>
          <input id="money" type="number" step="0.1" min="0.01" max="10000"
                 value="1">
        </div>
        <div class="form-row">
          <label for="remark">备注</label>
          <input id="remark" type="text">
        </div>
        <div class="form-row">
          <label for="payDate">付费时间</label>
          <input id="payDate" type="date">
          <button type="button" @click="dateAddWhenAdd">+1天</button>
        </div>
      </fieldset>
      <div class="form-footer">
        <MyBtn text="关闭" type="secondary" @click="closeDialog"/>
        <MyBtn text="确认提交" type="primary"/>
      </div>
    </form>
  </MyDialog>
  <!-- 吐司组件-->
  <ToastBox ref="childRef"/>
</template>

<script lang="ts" setup>
import ToastBox from "@/components/message/ToastBox.vue";
import {onMounted, reactive, ref} from "vue";
import {PayRecordPageDto} from "@/model/dto/PayRecordPageDto";
import {reqPayRecordPage} from "@/request/payRecordApi";
import MyTable, {TbPage} from "@/components/show/MyTable.vue";
import MyDialog from "@/components/message/MyDialog.vue";
import {PayRecordVo} from "@/model/vo/PayRecordVo";
import TbBtn from "@/components/button/TbBtn.vue";
import DropSelect from "@/components/input/DropSelect.vue";
import {reqOption} from "@/request/payDictApi";
import {TypeSelectVo} from "@/model/vo/TypeSelectVo";
import MyBtn from "@/components/button/MyBtn.vue";
import {useRouter} from "vue-router";
import {PaymentRecord} from "@/model/entity/PaymentRecord";

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
/**
 * ===================================[表单数据]============================================
 */
// 公告弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const openDialog = () => myShow.value?.showMe();
const closeDialog = () => myShow.value?.closeMe();

// 添加的实体类
const paymentRecord: PaymentRecord = reactive<PaymentRecord>({
  isIncome: false,
  money: 0,
  payDate: "",
  paymentType: 0,
  recordId: 0,
  remark: ""
})
// 添加时日期加一天
const dateAddWhenAdd = () => {
  if (paymentRecord.payDate === '') return;
  const date = new Date(paymentRecord.payDate);
  date.setDate(date.getDate() + 1);
  paymentRecord.payDate = date.toISOString().slice(0, 10);
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

// ========================[搜索框样式]===============================
.search-inp
  /*搜索框*/
  padding: 8px
  border: 2px solid #67C23A
  border-radius: 8px
  margin: 0 4px 0 4px

.search-lab
  //搜索label
  color: #529b2e
  font-size: smaller


// ========================[表单样式]===============================
.myForm
  > fieldset
    /*外包装虚线*/
    border-style: dashed
    border-width: 2px
    border-color: #606266

    > legend
      /*表单标题*/
      color: #606266

  .form-row
    /*表单行*/
    padding-top: 12px

    > label
      /*表单行的标签*/
      display: inline-block
      width: 10ch
      font-weight: bold

    > input, select
      /*表单行的输入框*/
      border: none
      border-bottom: 2px solid #515151
      padding: 6px

      &:focus
        /*输入框聚焦事件*/
        outline: none
        border-color: #5b88ea

  > .form-footer
    /*表单底部按钮组*/
    padding-top: 8px
    text-align: right
</style>