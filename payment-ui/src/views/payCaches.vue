<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage"
           :thead="['付费时间','交易类型','交易对方','商品名称','金额','支付方式','当前状态','操作']"
           caption="收支缓存"
           @pageChange="getAll">
    <template #searchBtn>
      <MyBtn text="上传csv" type="success" @click="openForm2"/>
      <MyBtn text="清空缓存" type="danger" @click="deleteAll"/>
      <MyBtn text="返回上级" type="primary" @click="toBack"/>
    </template>
    <tr v-for="td in tableData" :key="td.cacheId">
      <td>{{ td.payDate }}</td>
      <td>{{ td.payType }}</td>
      <td>{{ td.payMan }}</td>
      <td>{{ td.wareName }}</td>
      <td>
        <MoneyTag :income="td.isIncome" :money="td.money"/>
      </td>
      <td>{{ td.payWay }}</td>
      <td>{{ td.payState }}</td>
      <td>
        <button class="tb-btn upd-btn" type="button" @click="openUpdForm(td)">
          转正
        </button>
        <button class="tb-btn del-btn" type="button" @click="deleteById(td.cacheId)">
          删除
        </button>
      </td>
    </tr>
  </MyTable>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>缓存转正</legend>
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
        </div>
      </fieldset>
      <div class="form-footer">
        <MyBtn text="关闭" type="secondary" @click="closeDialog"/>
        <MyBtn text="确认提交" type="primary" @click="submitForm"/>
      </div>
    </form>
  </MyDialog>
  <!--上传文件的对话框-->
  <MyDialog ref="myShow2">
    <form class="myForm">
      <fieldset>
        <legend>上传csv</legend>
        <div class="form-row">
          <input accept=".csv" type="file" @change="handleFileChange"/>
          <MyBtn text="上传文件" type="success" @click="uploadFile"/>
        </div>
        <div class="form-row">
          csv需为utf-8编码，且遵循样例格式
          <MyBtn text="样例csv" type="primary" @click="downSampleCsv"/>
        </div>
      </fieldset>
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
import DropSelect from "@/components/button/DropSelect.vue";
import MyBtn from "@/components/button/MyBtn.vue";
import {useRouter} from "vue-router";
import IncomeBtn from "@/components/button/IncomeBtn.vue";
import {TwoTypeOptVo} from "@/model/vo/TwoTypeOptVo";
import {Result} from "@/model/vo/Result";
import SureDelModal from "@/components/message/SureDelModal.vue";
import {
  reqAddCache,
  reqDelAllCache,
  reqDelCache,
  reqPayCachePage,
  reqSampleCsv,
  reqUploadCsv
} from "@/request/payCachesApi";
import {PaymentCache} from "@/model/entity/PaymentCache";
import MoneyTag from "@/components/tags/MoneyTag.vue";
import {reqTwoOption} from "@/request/payDictApi";
import {CacheToRecordDto} from "@/model/dto/CacheToRecordDto";

onMounted(() => {
  getAll();
  reqTwoOption().then(resp => {
    optionTwoData.value = resp
  })
})
/**
 * ===================================[搜索框数据]============================================
 */
const router = useRouter();
// 跳转路由
const toBack = () => {
  router.back();
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
const tableData = ref<PaymentCache[]>([])
const tablePage: TbPage = reactive({current: 1, pages: 1, total: 0, size: 10}) as TbPage
const getAll = () => {
  reqPayCachePage(tablePage.current, tablePage.size).then(resp => {
    tableData.value = resp.records
    tablePage.current = resp.current;
    tablePage.pages = resp.pages
    tablePage.total = resp.total
    tablePage.size = resp.size
  })
}

// 确认删除框
const sureDelModal = ref<InstanceType<typeof SureDelModal> | null>(null);
const deleteAll = async (): Promise<void> => {
  sureDelModal.value?.confirmDel("确认删除全部记录?").then((resp: boolean) => {
    if (resp) reqDelAllCache().then(resp => commonResp(resp))
  })
}
const deleteById = (id: number): void => {
  reqDelCache(id).then(resp => commonResp(resp))
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const payRecord: CacheToRecordDto = reactive({
  isIncome: false,
  money: 0,
  payDate: "",
  paymentType: 0,
  recordId: 0,
  remark: "",
  cacheId: 0
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const openUpdForm = (data: PaymentCache) => {
  payRecord.cacheId = data.cacheId
  payRecord.isIncome = data.isIncome
  payRecord.money = data.money
  payRecord.payDate = data.payDate
  payRecord.remark = data.wareName
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
  reqAddCache(payRecord).then(resp => commonResp(resp))
}

/**
 * ===================================[文件上传下载]============================================
 */
// 表单弹出框(文件)
const myShow2 = ref<InstanceType<typeof MyDialog> | null>(null)
const openForm2 = () => {
  myShow2.value?.showMe();
}

const file = ref<File | null>(null);
// 处理文件选择事件
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files![0];
  if (selectedFile) {
    file.value = selectedFile;
  } else {
    file.value = null;
  }
};

// 上传文件
const uploadFile = async () => {
  if (!file.value) {
    tesTus("err", '请选择一个 CSV 文件');
    return;
  }
  const formData = new FormData() as FormData;
  formData.append('file', file.value);
  reqUploadCsv(formData).then(resp => commonResp(resp));
  file.value = null;
  myShow2.value?.closeMe();
};

const downSampleCsv = () => {
  reqSampleCsv();
}
</script>

<style lang="sass" scoped>
@use "../myCss/myForm"
// ========================[表格样式]===============================
.tb-btn:hover
  //表中按钮
  box-shadow: 0 0 8px 0 #73767a

.del-btn
  //表中删除按钮
  padding: 3px 5px 3px 8px
  font-size: small
  color: white
  background-color: #F56C6C
  border: 2px solid #c45656
  border-radius: 0 12px 12px 0

.upd-btn
  //表中修改按钮
  padding: 3px 8px 3px 5px
  font-size: small
  color: white
  background-color: #409EFF
  border: 2px solid #337ecc
  border-radius: 12px 0 0 12px
</style>