<template>
  <header class="header">
    <span>第一题</span>
    <MyBtn text="返回上级" type="secondary" @click="toBack"/>
  </header>

  <main class="main-content">
    <aside class="sidebar">
      <TabLine :tit="imgName" type="primary">
        <BlockBtn style="float: right" text="切换图片" type="primary" @click="openImgDialog"/>
      </TabLine>
      <pre class="ocr-res new-line">{{ ocrRes }}</pre>
    </aside>

    <section class="content">
      <TabLine tit="第一题" type="warning">
        <BlockBtn style="float: right" text="编辑题目" type="warning" @click="openEditDialog('题目内容', questMain)"/>
      </TabLine>
      <pre class="quest new-line">{{ questMain }}</pre>
      <TabLine tit="题目选项" type="success">
        <BlockBtn text="添加选项" type="success"/>
      </TabLine>
      <div class="opt">
        <h4>A</h4>
        <span class="new-line">{{ ocrRes }}</span>
      </div>
      <div class="opt">
        <h4>B</h4>
        <span class="new-line">{{ ocrRes }}</span>
      </div>
      <TabLine tit="题目解析" type="warning">
        <BlockBtn text="编辑解析" type="warning" @click="openEditDialog('题目解析', questAnaly)"/>
      </TabLine>
      <div class="quest">
        <h4>解析</h4>
        <pre class="new-line">{{ questAnaly }}</pre>
      </div>
    </section>
  </main>

  <!--切换图片弹窗-->
  <MyDialog ref="imgDialog">
    <div class="img-list">
      <div v-for="card in imgCardList" :key="card.dataId" class="img-card" @click="selectImg(card)">
        <img :src="card.imageUrl" :alt="card.tit">
        <p class="img-remark">{{ card.remark }}</p>
      </div>
      <div v-if="imgCardList.length === 0" class="no-data">暂无图片</div>
    </div>
  </MyDialog>

  <!--共用编辑弹窗-->
  <MyDialog ref="editDialog">
    <div class="edit-form">
      <div class="edit-header">
        <h3>编辑{{ editTitle }}</h3>
      </div>
      <textarea
        v-model="editContent"
        class="edit-textarea"
        :placeholder="'请输入' + editTitle"
        rows="8"
      ></textarea>
      <div class="edit-footer">
        <MyBtn text="取消" type="secondary" @click="editDialog?.closeMe()"/>
        <MyBtn text="保存" type="primary" @click="saveEditContent"/>
      </div>
    </div>
  </MyDialog>

  <!-- 吐司组件-->
  <ToastBox ref="childRef"/>
</template>

<script lang="ts" setup>
import BlockBtn from "@/components/button/BlockBtn.vue";
import MyBtn from "@/components/button/MyBtn.vue";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ExamQuest} from "@/model/entity/ExamQuest";
import TabLine from "@/components/show/TabLine.vue";
import MyDialog from "@/components/message/MyDialog.vue";
import ToastBox from "@/components/message/ToastBox.vue";
import {CardData} from "@/model/dto/CardData";
import {reqImgSourcePage, reqOneImg} from "@/request/sourceImgApi";
import {reqCateImg, reqGetView, reqUpdQuest} from "@/request/examQuestApi";

onMounted(() => {
  setRouteData()
})

const ocrRes = ref<string>("")
const imgName = ref<string>("")
const questMain = ref<string>("") // 题目主干
const questAnaly = ref<string>("") // 题目解析

// 题目数据（用于API更新）
const questData = ref<ExamQuest>({
  haveImg: false,
  imgName: "",
  paperId: 0,
  questAnalysis: "",
  questContent: "",
  questId: 0,
  questNo: 0,
  questType: 0,
  score: 0
})

/**
 * ===================================[吐司消息]=======================================
 */
const childRef = ref<InstanceType<typeof ToastBox> | null>(null);
const tesTus = (type: "suc" | "err", msg: string) => {
  if (childRef.value) {
    childRef.value.showToast(type, msg);
  }
};

/**
 * ===================================[切换图片弹窗]============================================
 */
const imgCardList = ref<CardData[]>([])
const imgDialog = ref<InstanceType<typeof MyDialog> | null>(null)

const openImgDialog = () => {
  // 获取该题源分类下的所有图片
  if (cateId > 0) {
    reqImgSourcePage(cateId).then(resp => {
      const cardData: CardData[] = [];
      resp.forEach(item => {
        cardData.push({
          remark: item.remark || '无备注',
          childPath: '',
          data: item,
          dataId: item.imageId,
          footer: [`${item.ocrTime || '未识别'}`],
          tit: `图片 ${item.imageId}`,
          imageUrl: `/api/sourceImage/img/${item.imageId}`
        })
      })
      imgCardList.value = cardData;
    })
  } else {
    imgCardList.value = [];
    tesTus("err", "当前题目未关联题源分类");
  }
  imgDialog.value?.showMe();
}

const selectImg = (card: CardData) => {
  imgDialog.value?.closeMe();
  imgName.value = card.tit
  reqOneImg(card.dataId).then(resp => {
    ocrRes.value = resp.ocrResult
    tesTus("suc", "已切换图片内容");
  })
}

/**
 * ===================================[共用编辑弹窗]============================================
 */
const editDialog = ref<InstanceType<typeof MyDialog> | null>(null)
const editTitle = ref<string>("") // 弹窗标题
const editContent = ref<string>("") // 编辑内容
const editTarget = ref<string>("") // 编辑目标字段名

const openEditDialog = (title: string, currentContent: string) => {
  editTitle.value = title
  editContent.value = currentContent
  // 根据标题确定编辑目标
  editTarget.value = title === '题目内容' ? 'questMain' : 'questAnaly'
  editDialog.value?.showMe();
}

const saveEditContent = () => {
  if (editTarget.value === 'questMain') {
    questMain.value = editContent.value
    questData.value.questContent = editContent.value
  } else if (editTarget.value === 'questAnaly') {
    questAnaly.value = editContent.value
    questData.value.questAnalysis = editContent.value
  }
  editDialog.value?.closeMe();
  // 实时更新到后端
  reqUpdQuest(questData.value).then(resp => {
    if (resp.code === 1) {
      tesTus("suc", "保存成功");
    } else {
      tesTus("err", resp.msg || "保存失败");
    }
  })
}

/**
 * ===================================[路由跳转]============================================
 */
let cateId = 0;
let questId = 0;
// 如此获取路由传参
const route = useRoute();
const setRouteData = (): void => {
  if (Object.keys(route.query).length > 0) {
    questId = parseInt(route.query.questId as string)
    questData.value.questId = questId
    // 加载题目初始数据
    reqGetView(questId).then(resp => {
      questData.value = resp.examQuest
      questMain.value = resp.examQuest.questContent || ""
      questAnaly.value = resp.examQuest.questAnalysis || ""
    })
  }
  reqCateImg(questId).then(resp => {
    cateId = resp.categoryId
  })
}
const router = useRouter();
// 返回上级页面
const toBack = () => {
  router.back()
}
</script>

<style lang="sass" scoped>
$spacing-md: 1rem
$spacing-lg: 1.5rem
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)

// 顶部导航栏
.header
  background: linear-gradient(135deg, #409eff, #909399)
  color: #f8f9fa
  font-weight: bold
  height: 36px
  display: flex
  justify-content: space-between
  align-items: center
  padding: 2px $spacing-md
  box-shadow: $shadow-md

// 主内容区
.main-content
  display: flex
  min-height: calc(100vh - 36px)

  // 左侧边栏
  .sidebar
    width: 33.333%
    background-color: #e9e9eb
    padding: 16px

    .ocr-res
      background-color: white
      padding: 16px
      border-radius: 8px
      box-shadow: $shadow-md
      margin-top: 16px
      font-size: 1rem


  // 右侧内容区
  .content
    width: 66.666%
    padding: 16px

    .quest
      background-color: white
      padding: 16px
      border-radius: 8px
      box-shadow: $shadow-md
      margin-bottom: 12px
      font-size: 1rem


    h4
      font-weight: 600
      color: #111827
      margin-top: 0
      margin-bottom: 6px

    .opt
      background-color: white
      padding: 8px
      border-radius: 8px
      margin-bottom: 12px
      border: #909399 dashed 2px

// 图片列表弹窗
.img-list
  display: flex
  flex-wrap: wrap
  gap: 16px
  max-height: 60vh
  overflow-y: auto
  padding: 8px

.img-card
  width: 150px
  border: 2px solid #e9e9eb
  border-radius: 8px
  overflow: hidden
  cursor: pointer
  transition: all 0.3s ease

  &:hover
    border-color: #409eff
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3)
    transform: translateY(-2px)

  img
    width: 100%
    height: 120px
    object-fit: cover

.img-remark
  padding: 8px
  margin: 0
  font-size: 12px
  color: #606266
  text-align: center
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.no-data
  width: 100%
  text-align: center
  color: #909399
  padding: 40px

// 共用编辑弹窗
.edit-form
  min-width: 500px

.edit-header
  margin-bottom: 12px

  h3
    margin: 0
    color: #409eff
    font-size: 16px

.edit-textarea
  width: 100%
  padding: 12px
  border: 1px solid #dcdfe6
  border-radius: 4px
  font-size: 14px
  font-family: inherit
  resize: vertical
  min-height: 150px
  box-sizing: border-box

  &:focus
    outline: none
    border-color: #409eff
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1)

.edit-footer
  display: flex
  justify-content: flex-end
  gap: 12px
  margin-top: 16px
</style>