<template>
  <LineCard tit="图片分类" :card-data-list="listCardData" @openAddForm="openAddForm" @openUpdForm="openUpdForm"
            @deleteById="deleteById"/>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>{{ isAddForm ? "新增" : "修改" }}分类</legend>
        <div class="form-row">
          <label for="remark">分类名</label>
          <input id="remark" v-model="sourceCategory.categoryName" type="text">
        </div>
        <div class="form-row">
          <label for="remark">备注</label>
          <input id="remark" v-model="sourceCategory.remark" type="text">
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
import MyDialog from "@/components/message/MyDialog.vue";
import MyBtn from "@/components/button/MyBtn.vue";
import {Result} from "@/model/vo/Result";
import SureDelModal from "@/components/message/SureDelModal.vue";
import {SourceCategory} from "@/model/entity/SourceCategory";
import {reqAddCate, reqDelCate, reqSourceCate, reqUpdCate} from "@/request/sourceCateApi";
import LineCard, {CardData} from "@/components/show/LineCard.vue";

onMounted(() => {
  getAll();
})

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
const listCardData = ref<CardData[]>([])
const getAll = () => {
  reqSourceCate().then(resp => {
    const cardData: CardData[] = [];
    resp.forEach(item => {
      cardData.push({
        remark: item.remark,
        childPath: `/sourceImg?cateId=${item.categoryId}`,
        data: item,
        dataId: item.categoryId,
        footer: [`创建时间：${item.createDate}`, `文件数：${item.recordNum}`],
        tit: item.categoryName
      })
    })
    listCardData.value = cardData;
  })
}

// 确认删除框
const sureDelModal = ref<InstanceType<typeof SureDelModal> | null>(null);
const deleteById = (id: number): void => {
  sureDelModal.value?.confirmDel("确定删除？删除后数据无法找回").then((resp: boolean) => {
    if (resp) reqDelCate(id).then(resp => commonResp(resp))
  })
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const sourceCategory: SourceCategory = reactive({
  categoryId: 0, categoryName: "", createDate: "", remark: ""
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const isAddForm = ref<boolean>(false)
const openAddForm = () => {
  isAddForm.value = true;
  sourceCategory.categoryId = 0
  sourceCategory.categoryName = ""
  sourceCategory.remark = ""
  myShow.value?.showMe();
}
const openUpdForm = (data: SourceCategory) => {
  isAddForm.value = false;
  sourceCategory.categoryId = data.categoryId
  sourceCategory.categoryName = data.categoryName
  sourceCategory.remark = data.remark
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 校验
  if (sourceCategory.categoryName === "") {
    tesTus("err", "请填写名称");
    return;
  }
  // 开始提交
  closeDialog()
  if (isAddForm.value)
    reqAddCate(sourceCategory).then(resp => commonResp(resp))
  else
    reqUpdCate(sourceCategory).then(resp => commonResp(resp))
}
</script>

<style lang="sass" scoped>
</style>