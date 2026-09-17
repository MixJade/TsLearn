<template>
  <header class="header">
    <span>第一题</span>
    <MyBtn text="返回上级" type="secondary" @click="toBack"/>
  </header>

  <main class="main-content">
    <aside class="sidebar">
      <header class="tab-line">
        <h3 class="primary">{{ imgName }}</h3>
        <div>
          <BlockBtn text="切换图片" type="primary" @click="openImgDialog"/>
        </div>
      </header>
      <pre class="ocr-res new-line">{{ ocrRes }}</pre>
    </aside>

    <section class="content">
      <!-- 中部可滚动正文 -->
      <div class="content-body">
        <h3 class="primary">题目</h3>
        <!--题目主干：悬停右上角浮出编辑按钮-->
        <div class="hover-box">
          <pre class="quest new-line">{{ questMain }}</pre>
          <div class="hover-actions">
            <button class="icon-btn" type="button" title="编辑题目"
                    @click="openEditDialog('题目内容', questMain, 'main')">
              <img src="/editBtn.svg" alt="编辑">
            </button>
          </div>
        </div>

        <header class="tab-line">
          <h3 class="success">题目选项</h3>
          <div>
            <BlockBtn text="添加选项" type="success" @click="addOpt"/>
          </div>
        </header>
        <!--选项：悬停右上角浮出编辑 + 删除按钮-->
        <div v-for="(opt, idx) in optList" :key="opt.label" class="opt">
          <div class="hover-actions">
            <button class="icon-btn" type="button" title="编辑选项" @click="editOpt(idx)">
              <img src="/editBtn.svg" alt="编辑">
            </button>
            <button class="icon-btn" type="button" title="删除选项" @click="delOpt(idx)">
              <img src="/delBtn.svg" alt="删除">
            </button>
          </div>
          <h4>
            {{ opt.label }}
            <span v-if="opt.isCorrect" class="correct-tag">正确答案</span>
          </h4>
          <span class="new-line">{{ opt.content || ocrRes }}</span>
        </div>

        <h3 class="warning">题目解析</h3>
        <div class="hover-box">
          <pre class="quest new-line">{{ questAnaly }}</pre>
          <div class="hover-actions">
            <button class="icon-btn" type="button" title="编辑解析"
                    @click="openEditDialog('题目解析', questAnaly, 'analy')">
              <img src="/editBtn.svg" alt="编辑">
            </button>
          </div>
        </div>
      </div>

      <!-- 底部固定长条：保存 / 取消 -->
      <footer class="content-footer">
        <div class="footer-actions">
          <MyBtn text="取消" type="secondary" @click="onCancel"/>
          <MyBtn text="保存" type="primary" @click="onSave"/>
        </div>
      </footer>
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
      <!--仅选项编辑 / 新增时显示“是否正确”-->
      <div v-if="editMode === 'optionEdit' || editMode === 'optionNew'" class="edit-correct">
        <label>
          <input type="checkbox" v-model="editOptCorrect">
          <span>是否正确（将此选项标记为正确答案）</span>
        </label>
      </div>
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
 * ===================================[题目选项]============================================
 */
const optList = ref<{ label: string; content: string; isCorrect: boolean }[]>([
  {label: "A", content: "", isCorrect: false},
  {label: "B", content: "", isCorrect: false}
])

// 添加选项：用共用编辑弹窗输入内容，新增项的标签按现有数量顺序生成（A/B/C…）
const addOpt = () => {
  openEditDialog('新选项', '', 'optionNew')
}

// 编辑选项：复用共用编辑弹窗，回填当前内容（未编辑过则回填 OCR 原文）
const editOpt = (idx: number) => {
  const opt = optList.value[idx]
  openEditDialog(`选项 ${opt.label}`, opt.content || ocrRes.value, 'optionEdit', idx)
}

// 删除选项
const delOpt = (idx: number) => {
  const [removed] = optList.value.splice(idx, 1)
  tesTus("suc", `已删除选项 ${removed.label}`)
}

/**
 * ===================================[共用编辑弹窗]============================================
 */
type EditMode = 'main' | 'analy' | 'optionEdit' | 'optionNew'

const editDialog = ref<InstanceType<typeof MyDialog> | null>(null)
const editTitle = ref<string>("") // 弹窗标题
const editContent = ref<string>("") // 编辑内容
const editMode = ref<EditMode>('main') // 编辑目标的语义
const editOptIdx = ref<number>(-1) // 编辑现有选项时的下标
const editOptCorrect = ref<boolean>(false) // 选项编辑 / 新增时是否标记为正确答案

const openEditDialog = (
    title: string,
    content: string,
    mode: EditMode,
    optIdx: number = -1
) => {
  editTitle.value = title
  editContent.value = content
  editMode.value = mode
  editOptIdx.value = optIdx
  // 选项编辑时回填当前“是否正确”，新增时默认 false
  if (mode === 'optionEdit') {
    editOptCorrect.value = optList.value[optIdx].isCorrect
  } else if (mode === 'optionNew') {
    editOptCorrect.value = false
  }
  editDialog.value?.showMe();
}

const saveEditContent = () => {
  const val = editContent.value
  editDialog.value?.closeMe();

  switch (editMode.value) {
    case 'optionEdit':
      optList.value[editOptIdx.value].content = val
      optList.value[editOptIdx.value].isCorrect = editOptCorrect.value
      tesTus("suc", "选项已更新");
      return
    case 'optionNew': {
      // 标签按当前选项数量生成：A、B、C…（> 26 时回落字母 + 数字）
      const len = optList.value.length
      const label = len < 26
          ? String.fromCharCode(65 + len)
          : `${String.fromCharCode(65 + (len % 26))}${Math.floor(len / 26)}`
      optList.value.push({label, content: val, isCorrect: editOptCorrect.value})
      tesTus("suc", `已添加选项 ${label}`);
      return
    }
    case 'main':
      questMain.value = val
      questData.value.questContent = val
      break
    case 'analy':
      questAnaly.value = val
      questData.value.questAnalysis = val
      break
  }

  // 题目主干 / 解析需要实时同步到后端
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

/**
 * ===================================[底部保存 / 取消]============================================
 */
// 保存：题目主干 / 解析已经在每次编辑时实时同步过 questData，这里做一次整体兜底提交
const onSave = () => {
  // 兜底：把当前页面状态写回 questData（防止用户走别的路径跳过编辑弹窗）
  questData.value.questContent = questMain.value
  questData.value.questAnalysis = questAnaly.value
  reqUpdQuest(questData.value).then(resp => {
    if (resp.code === 1) {
      tesTus('suc', '保存成功')
    } else {
      tesTus('err', resp.msg || '保存失败')
    }
  })
}

// 取消：返回上级（选项修改保留在本地，不自动提交）
const onCancel = () => {
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

// 主内容区：固定铺满屏幕（扣除 36px 顶部 header）
.main-content
  display: flex
  height: calc(100vh - 40px)
  overflow: hidden

  // 左侧边栏：自然高度撑满，内部可独立滚动（图片 + OCR）
  .sidebar
    width: 33.333%
    background-color: #e9e9eb
    padding: 16px
    overflow-y: auto
    box-sizing: border-box

    .ocr-res
      background-color: white
      padding: 16px
      border-radius: 8px
      box-shadow: $shadow-md
      margin-top: 16px
      font-size: 1rem


  // 右侧内容区：垂直 flex，上方 body 可滚动，底部 footer 固定
  .content
    width: 66.666%
    display: flex
    flex-direction: column
    min-height: 0
    // 关键：允许 flex 子项收缩到小于内容高度，从而让 overflow 生效

    .content-body
      flex: 1
      min-height: 0
      overflow-y: auto
      overflow-x: hidden
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

        // 选项被标记为正确时的“正确答案”徽标
        .correct-tag
          display: inline-block
          vertical-align: middle
          margin-left: 6px
          padding: 1px 6px
          background: #f0f9eb
          color: #67c23a
          border: 1px solid #c2e7b0
          font-size: 11px
          font-weight: 600
          border-radius: 3px

      .opt
        background-color: white
        padding: 8px
        border-radius: 8px
        margin-bottom: 12px
        border: #909399 dashed 2px

      // ========================[悬停浮出操作按钮]============================
      // pre（题目主干 / 解析）与 opt 通用：鼠标移入时右上角浮现按钮
      .hover-box,
      .opt
        position: relative

        .hover-actions
          position: absolute
          top: 8px
          right: 8px
          display: flex
          gap: 6px
          // 默认隐藏，避免遮挡正文
          opacity: 0
          visibility: hidden
          transition: opacity 0.2s ease, visibility 0.2s ease

        &:hover .hover-actions,
        &:focus-within .hover-actions
          opacity: 1
          visibility: visible

      // 浮层内的图标按钮：淡蓝色背景 + svg 图标
      .icon-btn
        width: 24px
        height: 24px
        padding: 0
        display: flex
        align-items: center
        justify-content: center
        border: none
        border-radius: 4px
        background-color: #ecf5ff
        cursor: pointer
        transition: background-color 0.2s, box-shadow 0.2s

        &:hover
          background-color: #d9ecff
          box-shadow: 0 1px 4px rgba(64, 158, 255, 0.35)

        &:active
          background-color: #c6e2ff

        img
          width: 16px
          height: 16px
          display: block

    // 底部固定长条：右侧放保存 / 取消
    .content-footer
      flex-shrink: 0
      display: flex
      align-items: center
      justify-content: flex-end
      padding: 12px 24px
      background-color: #f5f7fa
      border-top: 1px solid #e4e7ed
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.04)

      .footer-actions
        display: flex
        gap: 12px

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

// 选项编辑 / 新增时弹窗里出现的“是否正确”复选框
.edit-correct
  margin-top: 12px
  padding: 8px 12px
  background: #f5f7fa
  border-radius: 4px

  label
    display: flex
    align-items: center
    gap: 6px
    cursor: pointer
    font-size: 13px
    color: #606266

  input[type="checkbox"]
    width: 16px
    height: 16px
    cursor: pointer
    accent-color: #67c23a

.edit-footer
  display: flex
  justify-content: flex-end
  gap: 12px
  margin-top: 16px

.tab-line
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  box-sizing: border-box
  padding-right: 24px
</style>