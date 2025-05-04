<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage" :thead="['类型','金额','备注','付费时间','操作']" caption="收支记录"
           @pageChange="getAll">
    <template #searchForm>
      <span class="search-lab">类别</span>
      <DropSelect :disable-one="false" :option-data="optionData" @changeSel="changeSel"/>
      <label class="search-lab" for="beginDate">起始日</label>
      <input id="beginDate" v-model="reqBody.beginDate" class="search-inp" type="date" @change="getAll">
      <label class="search-lab" for="endDate">终止日</label>
      <input id="endDate" v-model="reqBody.endDate" class="search-inp" type="date" @change="getAll">
    </template>
    <template #searchBtn>
      <MyBtn text="添加记录" type="success" @click="openAddForm"/>
      <MyBtn text="缓存转正" type="warning" @click="toRoute('/payCaches')"/>
      <MyBtn text="收支类型" type="secondary" @click="toRoute('/payDicts')"/>
      <MyBtn text="返回首页" type="primary" @click="toCalendar"/>
    </template>
    <tr v-for="td in tableData" :key="td.recordId">
      <td :style="{color: td.color}" class="weight">{{ td.keyName }}</td>
      <td>
        <MoneyTag :income="td.isIncome" :money="td.money"/>
      </td>
      <td class="canCopy">{{ td.remark }}</td>
      <td>{{ td.payDate }}</td>
      <td>
        <button class="tb-btn upd-btn" type="button" @click="openUpdForm(td)">
          <img alt="edit" src="/icon/editBtn.svg">
        </button>
        <button class="tb-btn del-btn" type="button" @click="deleteById(td.recordId)">
          <img alt="del" src="/icon/delBtn.svg">
        </button>
      </td>
    </tr>
  </MyTable>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>{{ formTit }}</legend>
        <div class="form-row">
          <label>收支类型</label>
          <IncomeBtn v-model="payRecord.isIncome"/>
          <DropSelect v-if="payRecord.isIncome" :disable-one="true" :option-data="optionTwoData.inList"
                      :show-val="optionShowTxt"
                      @changeSel2="changeFormSel"/>
          <DropSelect v-else :disable-one="true" :option-data="optionTwoData.outList" :show-val="optionShowTxt"
                      @changeSel2="changeFormSel"/>
        </div>
        <div class="form-row">
          <label for="money">金额(绝对值)</label>
          <input id="money" v-model="payRecord.money" max="10000" min="0.01" step="0.1"
                 type="number">
        </div>
        <div class="form-row">
          <label for="remark">备注</label>
          <input id="remark" v-model="payRecord.remark" type="text">
        </div>
        <div class="form-row">
          <label for="payDate">付费时间</label>
          <input id="payDate" v-model="payRecord.payDate" type="date">
          <button type="button" @click="dateAddWhenAdd">+1天</button>
        </div>
      </fieldset>
      <div class="form-footer">
        <MyBtn text="关闭" type="secondary" @click="closeDialog"/>
        <MyBtn text="确认提交" type="primary" @click="submitForm"/>
      </div>
    </form>
  </MyDialog>
  <!-- 吐司组件-->
  <ToastBox ref="childRef"/>
  <SureDelModal ref="sureDelModal"/>
  <DragBall @click="openAddForm"/>
</template>

<script lang="ts" setup>
import ToastBox from "@/components/message/ToastBox.vue";
import DragBall from "@/components/button/DragBall.vue";
import {onMounted, reactive, ref} from "vue";
import {PayRecordPageDto} from "@/model/dto/PayRecordPageDto";
import {reqAddRecord, reqDelRecord, reqPayRecordPage, reqUpdRecord} from "@/request/payRecordApi";
import MyTable, {TbPage} from "@/components/show/MyTable.vue";
import MyDialog from "@/components/message/MyDialog.vue";
import {PayRecordVo} from "@/model/vo/PayRecordVo";
import DropSelect from "@/components/button/DropSelect.vue";
import {reqOption, reqTwoOption} from "@/request/payDictApi";
import {TypeSelectVo} from "@/model/vo/TypeSelectVo";
import MyBtn from "@/components/button/MyBtn.vue";
import {useRoute, useRouter} from "vue-router";
import {PaymentRecord} from "@/model/entity/PaymentRecord";
import IncomeBtn from "@/components/button/IncomeBtn.vue";
import {TwoTypeOptVo} from "@/model/vo/TwoTypeOptVo";
import {Result} from "@/model/vo/Result";
import SureDelModal from "@/components/message/SureDelModal.vue";
import MoneyTag from "@/components/tags/MoneyTag.vue";

onMounted(() => {
  setRouteData();
  getAll();
  reqOption().then(resp => {
    optionData.value = resp
  })
  reqTwoOption().then(resp => {
    optionTwoData.value = resp
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

// 如此获取路由传参
const route = useRoute();
const setRouteData = (): void => {
  if (Object.keys(route.query).length > 0)
    getStartAndEndOfMonth(route.query.month as string)
}

/**
 * 设置一月的第一天和最后一天
 *
 * @param monthStr 形如 2024、2024-1、2024-1-1
 */
const getStartAndEndOfMonth = (monthStr: string): void => {
  const dateStr: string[] = monthStr.split("-");
  if (dateStr.length === 1) {
    // 只有年
    // 本年第一天
    const startDateV = new Date(Number(dateStr[0]), 0, 1);
    startDateV.setHours(8) //东八时区
    // 本年最后一天
    const endDateV = new Date(Number(dateStr[0]), 11, 31);
    endDateV.setHours(8) //东八时区
    // 设值
    reqBody.beginDate = startDateV.toISOString().slice(0, 10);
    reqBody.endDate = endDateV.toISOString().slice(0, 10);
  } else if (dateStr.length === 2) {
    // 只有年+月
    // 本月第一天
    const startDateV = new Date(Number(dateStr[0]), Number(dateStr[1]) - 1, 1);
    startDateV.setHours(8) //东八时区
    // 本月最后一天
    const endDateV = new Date(Number(dateStr[0]), Number(dateStr[1]), 0);
    endDateV.setHours(8) //东八时区
    // 设值
    reqBody.beginDate = startDateV.toISOString().slice(0, 10);
    reqBody.endDate = endDateV.toISOString().slice(0, 10);
  } else {
    // 有 年+月+日
    const clickDate = `${dateStr[0]}-${dateStr[1].padStart(2, '0')}-${dateStr[2].padStart(2, '0')}`
    reqBody.beginDate = clickDate;
    reqBody.endDate = clickDate;
  }
}

const router = useRouter();
// 跳转路由
const toRoute = (url: string) => {
  router.push(url)
}
// 跳转首页路由
const toCalendar = (): void => {
  if (Object.keys(route.query).length > 0)
    router.push({name: "calendar", query: {date: route.query.month}})
  else router.push("/")
}

/**
 * =======================================[吐司消息]=======================================
 */
// 引用子组件
const childRef = ref<InstanceType<typeof ToastBox> | null>(null);
// 调用子组件暴露的方法
const tesTus = (type: "suc" | "err", msg: string) => {
  if (childRef.value) {
    childRef.value.showToast(type, msg);
  }
};

// 删改增操作通用解析
const commonResp = (resp: Result): void => {
  if (resp.code === 1) {
    tesTus("suc", resp.msg);
    getAll();
  } else if (resp.code === 0) {
    tesTus("err", resp.msg);
  } else {
    tesTus("err", "服务器无响应");
  }
}

/**
 * ===================================[表格数据]============================================
 */
// 表格数据
const tableData = ref<PayRecordVo[]>([])
const tablePage: TbPage = reactive({current: 1, pages: 1, total: 0, size: 10}) as TbPage
// 分页条件请求体
const reqBody: PayRecordPageDto = reactive({
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

// 确认删除框
const sureDelModal = ref<InstanceType<typeof SureDelModal> | null>(null);
const deleteById = async (id: number): Promise<void> => {
  sureDelModal.value?.confirmDel("一旦删除，数据无法找回，是否删除该记录").then((resp: boolean) => {
    if (resp) reqDelRecord(id).then(resp => commonResp(resp))
  })
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const payRecord: PaymentRecord = reactive({
  isIncome: false,
  money: 0,
  payDate: "",
  paymentType: 0,
  recordId: 0,
  remark: ""
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const formTit = ref<"添加记录" | "修改记录">("添加记录")
const openAddForm = () => {
  formTit.value = "添加记录";
  payRecord.recordId = 0;
  payRecord.remark = "";
  myShow.value?.showMe();
}
const openUpdForm = (data: PayRecordVo) => {
  formTit.value = "修改记录";
  // 直接替换 reactive 对象
  Object.assign(payRecord, data);
  optionShowTxt.value = data.keyName
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 下拉框的两个分类
const optionTwoData = ref<TwoTypeOptVo>({inList: [], outList: []})
const optionShowTxt = ref<string>("无")
const changeFormSel = (opKey: number, opVal: string) => {
  payRecord.paymentType = opKey
  optionShowTxt.value = opVal
}

// 添加时日期加一天
const dateAddWhenAdd = () => {
  if (payRecord.payDate === '') return;
  const date = new Date(payRecord.payDate);
  date.setDate(date.getDate() + 1);
  payRecord.payDate = date.toISOString().slice(0, 10);
}

// 提交表单
const submitForm = (): void => {
  // 校验
  if (payRecord.paymentType === 0) {
    tesTus("err", "请选择分类")
    return;
  } else if (payRecord.payDate === "") {
    tesTus("err", "请填写日期");
    return;
  }
  // 开始提交
  closeDialog()
  if (formTit.value === "修改记录")
    reqUpdRecord(payRecord).then(resp => commonResp(resp))
  else
    reqAddRecord(payRecord).then(resp => commonResp(resp))
}
</script>

<style lang="sass" scoped>
</style>