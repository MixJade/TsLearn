<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage" :thead="['码值','收支','大类','名称','颜色','数量','操作']" caption="收支字典"
           @pageChange="getAll">
    <template #searchForm>
      <label class="search-lab" for="sear-bigType">大类</label>
      <select id="sear-bigType" v-model="reqBody.bigType" aria-label="Search" class="search-inp" @change="getAll">
        <option value=""></option>
        <option v-for="bt in bigTypes" :key="bt.typeKey" :style="{color:bt.color}" :value="bt.typeKey">
          {{ bt.typeName }}
        </option>
      </select>
      <label class="search-lab" for="sear-income">收支</label>
      <select id="sear-income" v-model="reqBody.isIncome" aria-label="Search" class="search-inp" @change="getAll">
        <option :value="null"></option>
        <option :value="0">支出</option>
        <option :value="1">收入</option>
      </select>
    </template>
    <template #searchBtn>
      <MyBtn text="添加字典" type="success" @click="openAddForm"/>
      <MyBtn text="返回首页" type="secondary" @click="toBack"/>
    </template>
    <tr v-for="td in tableData" :key="td.paymentType">
      <td>{{ td.paymentType }}</td>
      <td :class="[td.isIncome ? 'in' : 'out']" class="weight">{{ td.isIncome ? "收入" : "支出" }}</td>
      <td :style="{color: td.bigTypeColor}" :title="td.typeDesc " class="weight">{{ td.bigTypeName }}</td>
      <td :style="{color: td.color}" class="weight">{{ td.keyName }}</td>
      <td :style="{color: td.color}" class="weight canCopy">{{ td.color }}</td>
      <td :style="{color: td.color}" class="weight">{{ td.recordNum }}</td>
      <td>
        <button class="tb-btn upd-btn" type="button" @click="openUpdForm(td)">
          <img alt="edit" src="/icon/editBtn.svg">
        </button>
        <button class="tb-btn del-btn" type="button" @click="deleteById(td.paymentType)">
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
          <label>收支</label>
          <IncomeBtn v-model="payDict.isIncome"/>
        </div>
        <div class="form-row">
          <label for="bigType">大类</label>
          <select id="bigType" v-model="payDict.bigType" aria-label="Search" class="search-inp" @change="changeBigType">
            <option v-for="bt in bigTypes" :key="bt.typeKey" :style="{color:bt.color}" :value="bt.typeKey">
              {{ bt.typeName }}
            </option>
          </select>
          <span :style="{color:payDict.color}" class="weight">{{ payDict.color }}</span>
        </div>
        <div class="form-row">
          <label for="keyName">名称</label>
          <input id="keyName" v-model="payDict.keyName" type="text">
        </div>
        <div class="form-row">
          <label for="color">颜色</label>
          <input id="color" v-model="payDict.color" type="color">
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
</template>

<script lang="ts" setup>
import ToastBox from "@/components/message/ToastBox.vue";
import {onMounted, reactive, ref} from "vue";
import MyTable, {TbPage} from "@/components/show/MyTable.vue";
import MyDialog from "@/components/message/MyDialog.vue";
import {reqAddDict, reqBigType, reqDelDict, reqDictPage, reqUpdDict} from "@/request/payDictApi";
import MyBtn from "@/components/button/MyBtn.vue";
import {useRouter} from "vue-router";
import IncomeBtn from "@/components/button/IncomeBtn.vue";
import {Result} from "@/model/vo/Result";
import SureDelModal from "@/components/message/SureDelModal.vue";
import {PayBigType} from "@/model/entity/PayBigType";
import {PaymentDictVo} from "@/model/vo/PaymentDictVo";
import {PayDictPageDto} from "@/model/dto/PayDictPageDto";
import {PaymentDict} from "@/model/entity/PaymentDict";

onMounted(() => {
  reqBigType().then(resp => {
    bigTypes.value = resp;
  })
  getAll();
})
/**
 * ===================================[搜索框数据]============================================
 */

// 下拉框数据
const bigTypes = ref<PayBigType[]>([])

// 跳转路由
const router = useRouter();
const toBack = () => {
  router.push("/")
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
const tableData = ref<PaymentDictVo[]>([])
const tablePage: TbPage = reactive({current: 1, pages: 1, total: 0, size: 10}) as TbPage
// 分页条件请求体
const reqBody: PayDictPageDto = reactive({
  bigType: 0,
  isIncome: null
})
const getAll = () => {
  reqDictPage(tablePage.current, tablePage.size, reqBody).then(resp => {
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
  sureDelModal.value?.confirmDel("是否删除该字典").then((resp: boolean) => {
    if (resp) reqDelDict(id).then(resp => commonResp(resp))
  })
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const payDict: PaymentDict = reactive({
  bigType: 0, color: "", isIncome: false, keyName: "", paymentType: 0
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const formTit = ref<"添加字典" | "修改字典">("添加字典")
const openAddForm = () => {
  formTit.value = "添加字典";
  payDict.paymentType = 0;
  payDict.bigType = 0;
  payDict.isIncome = false;
  payDict.keyName = "";
  payDict.color = "#000000";
  myShow.value?.showMe();
}
const openUpdForm = (data: PaymentDictVo) => {
  formTit.value = "修改字典";
  // 直接替换 reactive 对象
  Object.assign(payDict, data);
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 校验
  if (payDict.bigType === 0) {
    tesTus("err", "请选择大类")
    return;
  } else if (payDict.keyName === "") {
    tesTus("err", "请填写名称");
    return;
  }
  // 开始提交
  closeDialog()
  if (formTit.value === "修改字典")
    reqUpdDict(payDict).then(resp => commonResp(resp))
  else
    reqAddDict(payDict).then(resp => commonResp(resp))
}

const changeBigType = (): void => {
  payDict.color = bigTypes.value.find(i => i.typeKey === payDict.bigType)!.color
}
</script>

<style lang="sass" scoped>
// ========================[表格样式]===============================
.in
  //收入的字体
  color: #c45656

.out
  //支出的字体
  color: #17bd17
</style>