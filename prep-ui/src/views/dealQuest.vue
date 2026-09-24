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
        <!--选项：按住右上角排序按钮拖动调整顺序；落点线按拖动方向贴在目标选项上/下方，换位时由 TransitionGroup 播上下位移动画-->
        <TransitionGroup name="opt" tag="div" class="opt-list">
          <div v-for="(opt, idx) in optList" :key="opt.uid" class="opt"
               :ref="el => setCardRef(el, opt.uid)"
               :class="{
                 'is-dragging': dragIdx === idx,
                 'is-drop-before': dragIdx > -1 && overIdx === idx && lineSide === 'before',
                 'is-drop-after': dragIdx > -1 && overIdx === idx && lineSide === 'after'
               }"
               @dragstart.prevent>
            <div class="hover-actions">
              <button class="icon-btn sort-btn" type="button" title="按住拖动可调整选项顺序"
                      @pointerdown.left.prevent="onHandleDown(idx, $event)">
                <img src="/sortBtn.svg" alt="排序" draggable="false">
              </button>
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
        </TransitionGroup>

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
import {onBeforeUnmount, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ExamQuest} from "@/model/entity/ExamQuest";
import MyDialog from "@/components/message/MyDialog.vue";
import ToastBox from "@/components/message/ToastBox.vue";
import {CardData} from "@/model/dto/CardData";
import {reqImgSourcePage, reqOneImg} from "@/request/sourceImgApi";
import {reqCateImg, reqGetView, reqSaveQuestAll} from "@/request/examQuestApi";
import {ExamQuestOpt} from "@/model/entity/ExamQuestOpt";

onMounted(() => {
  setRouteData()
})

// 拖拽是在 window 上监听指针事件的，页面销毁时要一并摘掉（并清掉拖拽期间的临时样式）
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onDragUp)
  window.removeEventListener('pointercancel', onDragUp)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  dragMoved = false
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
// 页面内的选项结构：label 只是本地展示用的字母（由下标生成），content 对应后端 optCont
interface OptItem {
  uid: number // 本地自增，仅用于 v-for 的稳定 key（拖拽排序时避免 DOM 复用错乱）
  label: string
  content: string
  isCorrect: boolean
}

// 本地自增序号 + 统一构造，保证每个选项 uid 唯一
let optUid = 0
const newOpt = (label: string, content: string, isCorrect: boolean): OptItem => ({
  uid: ++optUid, label, content, isCorrect
})

// 按下标生成选项名：A、B、C…（> 26 时回落字母 + 数字）
const genOptLabel = (idx: number): string =>
    idx < 26
        ? String.fromCharCode(65 + idx)
        : `${String.fromCharCode(65 + (idx % 26))}${Math.floor(idx / 26)}`

// 顺序变化后按新位置重排 A/B/C 标签，保证「标签 = 展示顺序」
const relabelOpts = () => {
  optList.value.forEach((opt, idx) => {
    opt.label = genOptLabel(idx)
  })
}

const optList = ref<OptItem[]>([
  newOpt("A", "", false),
  newOpt("B", "", false)
])

const buildOptPayload = (): ExamQuestOpt[] =>
    optList.value.map(opt => ({
      optId: 0,
      questId: questData.value.questId,
      optCont: opt.content,
      haveImg: false,
      imgName: "",
      isCorrect: opt.isCorrect
    }))

// 添加选项：用共用编辑弹窗输入内容，新增项的标签按现有数量顺序生成（A/B/C…）
const addOpt = () => {
  openEditDialog('新选项', '', 'optionNew')
}

// 编辑选项：复用共用编辑弹窗，回填当前内容（未编辑过则回填 OCR 原文）
const editOpt = (idx: number) => {
  const opt = optList.value[idx]
  openEditDialog(`选项 ${opt.label}`, opt.content || ocrRes.value, 'optionEdit', idx)
}

// 删除选项：删完按新位置重排标签，避免出现 A、C、D 这类断号与重号
const delOpt = (idx: number) => {
  optList.value.splice(idx, 1)
  relabelOpts()
}

/**
 * ===================================[选项拖拽排序]============================================
 */
const dragIdx = ref<number>(-1) // 正在拖拽的选项下标
const overIdx = ref<number>(-1) // 落点线贴在哪个选项上（-1 表示当前不画线）
const lineSide = ref<'before' | 'after'>('after') // 落点线贴在目标选项的上方还是下方
const dropIdx = ref<number>(-1) // 落点：插到第 dropIdx 项之前（取值 0..optList.length）

// uid → 卡片元素。用函数式 ref 收集，不再走「容器 ref + querySelectorAll」：
// 查询式取元素一旦容器 ref 没绑上（热更新残留的旧实例等）就会抛错或静默失效
const cardEls = new Map<number, HTMLElement>()
const setCardRef = (el: unknown, uid: number) => {
  if (el instanceof HTMLElement) cardEls.set(uid, el)
  else cardEls.delete(uid)
}

let dragStartY = 0 // 按下时的指针纵坐标，用于区分「拖动」与「只按了一下」
let dragMoved = false // 本次是否真的拖动过

// 按住手柄开始拖拽
const onHandleDown = (idx: number, e: PointerEvent) => {
  dragIdx.value = idx
  // 按下时指针还在本项上（等于没换位），先不画线，等拖到别的选项上再显示落点线
  overIdx.value = -1
  dropIdx.value = -1
  dragStartY = e.clientY
  dragMoved = false
  try {
    // 捕获指针：在窗口外松手、或触屏移出手柄后，事件仍会回到手柄，不会卡在拖拽态
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  } catch (err) {
    // 少数环境不支持指针捕获，忽略即可：window 上的监听仍能兜住
  }
  // 拖拽期间整页保持“抓取中”光标（cursor 可继承，改 body 即可），并禁止选中文字
  document.body.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onDragUp)
  window.addEventListener('pointercancel', onDragUp)
}

// 先按指针纵向位置找到「指针所在的选项」，再按拖动方向决定落点线贴在它的哪一侧：
//   往下拖（目标在自身之后）→ 线贴在目标下方，表示松手后插到它后面
//   往上拖（目标在自身之前）→ 线贴在目标上方，表示松手后插到它前面
// 指针回到自身所在项上则视为原地不动，不画线
const onDragMove = (e: PointerEvent) => {
  if (dragIdx.value < 0) return
  // 轻微抖动不算拖动，避免只按一下就闪出落点线
  if (!dragMoved) {
    if (Math.abs(e.clientY - dragStartY) < 4) return
    dragMoved = true
  }

  const items = optList.value
  const from = dragIdx.value
  // 第一个「底边在指针下方」的选项就是指针所在项；落在选项之间的间隙里时算作它下面那一项
  let hover = -1
  for (let i = 0; i < items.length; i++) {
    const el = cardEls.get(items[i].uid)
    if (!el) continue
    if (e.clientY <= el.getBoundingClientRect().bottom) {
      hover = i
      break
    }
  }
  // 指针拖到列表下方：算作最后一项
  if (hover < 0) hover = items.length - 1

  if (hover === from) {
    // 拖回自己身上：不放线，松手也不换位
    overIdx.value = -1
    dropIdx.value = -1
    return
  }

  overIdx.value = hover
  if (hover > from) {
    // 往下拖：线在目标下方，落点是「目标之后」
    lineSide.value = 'after'
    dropIdx.value = hover + 1
  } else {
    // 往上拖：线在目标上方，落点是「目标之前」
    lineSide.value = 'before'
    dropIdx.value = hover
  }
}

// 松手：把拖拽项插到落点位置并重排标签
// 换位的位移动画不在这里做——由 TransitionGroup 在 DOM 顺序变化后自动补间（下面选项上移、上面选项下移）
const onDragUp = () => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onDragUp)
  window.removeEventListener('pointercancel', onDragUp)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''

  const from = dragIdx.value
  let to = dropIdx.value
  if (!dragMoved) {
    // 只是按了一下没拖动，给出一次操作提示
    tesTus("suc", "按住排序按钮上下拖动即可调整选项顺序")
  } else if (from > -1 && to > -1 && to !== from && to !== from + 1) {
    const [moved] = optList.value.splice(from, 1)
    // 取出拖拽项后，原本排在其后的插入点整体前移一位
    if (to > from) to--
    optList.value.splice(to, 0, moved)
    relabelOpts()
  }

  dragMoved = false
  dragIdx.value = -1
  overIdx.value = -1
  dropIdx.value = -1
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
      return
    case 'optionNew':
      // 标签按当前选项数量顺序生成（A/B/C…）
      optList.value.push(newOpt(genOptLabel(optList.value.length), val, editOptCorrect.value))
      return
    case 'main':
      questMain.value = val
      questData.value.questContent = val
      break
    case 'analy':
      questAnaly.value = val
      questData.value.questAnalysis = val
      break
  }
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
      // 回填已有选项；后端无选项时保留页面默认的两项占位
      // 字母按返回顺序（后端已按 opt_no 升序）就地生成，不再读库里的 opt_name，
      // 这样即使历史数据的 opt_name 与位置不一致，页面也不会显示错字母
      const opts = resp.examQuestOpts
      if (opts && opts.length > 0) {
        optList.value = opts.map((opt, idx) => newOpt(genOptLabel(idx), opt.optCont, opt.isCorrect))
      }
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
// 保存：把题目主干 / 解析 / 选项一次性提交到后端（选项为全量覆盖）
const onSave = () => {
  // 兜底：把当前页面状态写回 questData（防止用户走别的路径跳过编辑弹窗）
  questData.value.questContent = questMain.value
  questData.value.questAnalysis = questAnaly.value
  reqSaveQuestAll({
    examQuest: questData.value,
    examQuestOpts: buildOptPayload()
  }).then(resp => {
    if (resp.code === 1) {
      tesTus('suc', '保存成功')
    } else {
      tesTus('err', resp.msg || '保存失败')
    }
  })
}

// 取消：返回上级（页面上的修改均为本地状态，未保存即丢弃）
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
        // 只过渡淡化效果，避免拖动过程出现多余位移动画
        transition: opacity 0.2s

        // ========================[拖拽排序状态]============================
        // 正在被拖拽的项：淡化，表示已被拿起
        &.is-dragging
          opacity: 0.45

          // 拖动时鼠标会移开卡片，这里保持操作按钮可见，免得手柄中途消失
          .hover-actions
            opacity: 1
            visibility: visible

        // 落点线：画在目标选项与相邻选项之间的 12px 间隙正中
        // 偏移 9.5px = 间隙一半 6px + 线一半 1.5px + 卡片边框 2px
        // left/right 用 -2px 抵消卡片边框，让线正好和卡片外沿等宽
        &.is-drop-before::before,
        &.is-drop-after::after
          content: ''
          position: absolute
          left: -2px
          right: -2px
          height: 3px
          border-radius: 2px
          background-color: #409eff
          box-shadow: 0 0 6px rgba(64, 158, 255, 0.6)
          // 仅作视觉提示，不接收鼠标事件
          pointer-events: none

        // 往上拖（目标在自身之前）：线贴在目标上方
        &.is-drop-before::before
          top: -9.5px

        // 往下拖（目标在自身之后）：线贴在目标下方
        &.is-drop-after::after
          bottom: -9.5px

      // 换位动画：TransitionGroup 在元素位置变化后给它挂上 -move 类
      // 于是向下拖时下方选项上移、向上拖时上方选项下移，都是平滑滑动而不是瞬间跳位
      .opt-move
        transition: transform 0.25s ease

      // 删除时淡出（不写的话 Vue 会按默认过渡时长等待，卡片会先顿一下再消失）
      .opt-leave-active
        transition: opacity 0.18s ease

      .opt-leave-to
        opacity: 0

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
          // 图标不允许被浏览器单独拖拽，按住手柄时拖动的才是整张选项卡片
          -webkit-user-drag: none
          user-select: none

      // 排序手柄：按住即可拖动选项
      .icon-btn.sort-btn
        cursor: grab

        &:active
          cursor: grabbing

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