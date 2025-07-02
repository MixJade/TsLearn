<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage"
           :thead="['日期','时间','交易类型','交易对方','商品名称','金额','支付方式','当前状态','操作']"
           caption="收支缓存"
           @pageChange="getAll">
    <template #searchForm>
      <label class="search-lab" for="wareName">交易对方</label>
      <input id="wareName" v-model="reqBody.payMan" class="search-inp" type="text">
      <label class="search-lab" for="wareName">商品名称</label>
      <input id="wareName" v-model="reqBody.wareName" class="search-inp" type="text">
    </template>
    <template #searchBtn>
      <MyBtn text="上传csv" type="success" @click="openForm2"/>
      <MyBtn text="清空缓存" type="danger" @click="deleteAll"/>
      <MyBtn text="返回上级" type="secondary" @click="toBack"/>
    </template>
    <tr v-for="td in tableData" :key="td.cacheId">
      <td>{{ td.payDate }}</td>
      <td>{{ td.payTime }}</td>
      <td>{{ td.payType }}</td>
      <td class="canCopy">{{ td.payMan }}</td>
      <td class="canCopy">{{ td.wareName }}</td>
      <td>
        <MoneyTag :income="td.isIncome" :money="td.money"/>
      </td>
      <td>{{ td.payWay }}</td>
      <td>{{ td.payState }}</td>
      <td>
        <button class="tb-btn upd-btn" type="button" @click="openUpdForm(td)">
          <img alt="del" src="/icon/yesBtn.svg">
        </button>
        <button class="tb-btn del-btn" type="button" @click="deleteById(td.cacheId)">
          <img alt="del" src="/icon/delBtn.svg">
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
          <button type="button" title="同步上一次的备注" @click="remarkLast">同上</button>
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
  reqAddRec,
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
import {PayCachePageDto} from "@/model/dto/PayCachePageDto";

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
// 分页条件请求体
const reqBody: PayCachePageDto = reactive({
  payMan: "", wareName: ""
})
const getAll = () => {
  reqPayCachePage(tablePage.current, tablePage.size, reqBody).then(resp => {
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
  sureDelModal.value?.confirmDel("确定删除？删除后数据需手动找回").then((resp: boolean) => {
    if (resp) reqDelCache(id).then(resp => commonResp(resp))
  })
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
// “同上”文本
const lastRemark = ref<string>("");

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
  lastRemark.value = payRecord.remark
  reqAddRec(payRecord).then(resp => commonResp(resp))
}

/**
 * 设置上一次的备注
 */
const remarkLast = () => {
  payRecord.remark = lastRemark.value
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
</style>