<template>
  <el-container>
    <el-header>
      <!-- 导航栏-->
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
      >
        <el-menu-item index="0"><img src="/mia.svg" alt="商标" width="30" height="30">
          宠物医院
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="1">
          <el-icon>
            <DataBoard/>
          </el-icon>
          网站公告
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <Phone/>
          </el-icon>
          咨询医生
        </el-menu-item>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <User/>
            </el-icon>
            个人中心
          </template>
          <el-menu-item index="3-1">
            <el-icon>
              <EditPen/>
            </el-icon>
            个人资料
          </el-menu-item>
          <el-menu-item index="3-2">
            <el-icon>
              <Football/>
            </el-icon>
            宠物信息
          </el-menu-item>
          <el-menu-item index="3-3">
            <el-icon>
              <Tickets/>
            </el-icon>
            挂号信息
          </el-menu-item>
          <el-menu-item index="3-4" style="color: #F56C6C">
            <el-icon>
              <SwitchButton/>
            </el-icon>
            退出登录
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main>
      <!--轮播图-->
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in lun" :key="item">
          <el-image :src="item.image" fit="scale-down"/>
          <div class="carousel-caption">
            <h5>{{ item.tit }}</h5>
            <p>{{ item.text }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- 公告栏-->
      <h2>网站公告</h2>
      <p>网站的最新公告</p>
      <el-row :gutter="12">
        <el-col :xs="24" :lg="8" v-for="notice in notices" :key="notice.noticeId">
          <el-card shadow="hover" @click="openDialog(notice)">{{ notice.noticeTitle }}</el-card>
        </el-col>
      </el-row>
      <!--公告的对话框-->
      <el-dialog
          v-model="showDialog"
          :title="noticeDialog.noticeTitle"
          width="50%"
      >
        <div class="textNotice">{{ noticeDialog.textNotice }}</div>
        <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="showDialog = false">
                确认
              </el-button>
            </span>
        </template>
      </el-dialog>
      <!-- 用户卡片-->
      <h2>用户入口</h2>
      <p>一些与用户相关的功能入口，也可以前往中心查看。
        <el-link type="primary">点击跳转</el-link>
      </p>
      <el-row :gutter="12">
        <el-col :xs="24" :lg="8" v-for="card in userCard">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{ card.tit }}</span>
                <el-button :type="card.btnType">{{ card.btnText }}</el-button>
              </div>
            </template>
            <div>
              {{ card.describe }}
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 待领养宠物-->
      <h2>待领养宠物</h2>
      <p>它们等待一个温暖的家。
        <el-link type="primary">查看全部</el-link>
      </p>
      <el-row :gutter="12">
        <!--挂号卡片-->
        <el-col :span="6">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>挂号信息</span>
                <el-button type="primary">查看历史挂号</el-button>
              </div>
            </template>
            <div>
              在此查看自己的历史挂号
            </div>
          </el-card>
        </el-col>
        <!--宠物卡片-->
        <el-col :span="8">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>宠物信息</span>
                <el-button type="success">查看当前宠物</el-button>
              </div>
            </template>
            <div>
              查看自己的名下宠物
            </div>
          </el-card>
        </el-col>
        <!--寄养宠物卡片-->
        <el-col :span="8">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>寄养宠物</span>
                <el-button type="warning">所有被寄养宠物</el-button>
              </div>
            </template>
            <div>
              在此查看当前医院所有寄养宠物
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 折叠筐-->
      <h2>小小知识</h2>
      <el-collapse accordion>
        <el-collapse-item :title="notice.noticeTitle" :name="index" v-for="(notice,index) in notices">
          <div>{{ notice.textNotice }}</div>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {User, Phone, DataBoard, EditPen, SwitchButton, Tickets, Football} from "@element-plus/icons-vue"
import {reactive, ref} from "vue";
import {exampleNotice, Lun, Notice, UserCard} from "@/modal/VO/IndexVO";
// 导航栏
const handleSelect = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath)
}
// 轮播图
const lun: Lun[] = [
  {
    image: "/picture/lun-1.jpg",
    tit: "医院宗旨",
    text: "致力于为每一只宠物提供最优质的医疗服务，关注宠物健康与福利。"
  },
  {
    image: "/picture/lun-2.jpg",
    tit: "服务理念",
    text: "始终坚持“宠爱无限，服务永远“五心”服务----用心、细心、贴心的服务，让您的爱宠舒心，让您放心”"
  },
  {
    image: "/picture/lun-3.jpg",
    tit: "狗狗会“察言观色”",
    text: "人类对于狗狗的训练行为，其实并不是狗狗能“听懂”人类语言，而是会“察言观色”，根据一些行为指示来完成某种动作，进而牢记心中。"
  }
]

// 公告栏
const notices: Notice[] = reactive(exampleNotice())
// 公告弹出框
const showDialog = ref(false);
const noticeDialog = reactive({noticeTitle: "标题", textNotice: "文本内容"})
const openDialog = (notice: Notice) => {
  noticeDialog.noticeTitle = notice.noticeTitle
  noticeDialog.textNotice = notice.textNotice
  showDialog.value = true
}

// 用户卡片的配置信息
const userCard: UserCard[] = [
  {
    "tit": "挂号信息",
    "describe": "在此查看自己的历史挂号",
    "btnType": "primary",
    "btnText": "查看历史挂号"
  }, {
    "tit": "宠物信息",
    "describe": "查看自己的名下宠物",
    "btnType": "success",
    "btnText": "查看当前宠物"
  }, {
    "tit": "寄养宠物",
    "describe": "在此查看当前医院所有寄养宠物",
    "btnType": "warning",
    "btnText": "所有被寄养宠物"
  },
]
</script>
<style lang="scss" scoped>
/*将导航栏除Logo以外放在旁边*/
.flex-grow {
  flex-grow: 1;
}

/*将标题居中而不影响其它*/
.el-main {
  h2, p {
    text-align: center;
  }
}

.el-container {
  background-color: #e9e9f5;
}

/*轮播图的文本*/
.carousel-caption {
  background-color: black;
  opacity: 0.5;
  position: absolute;
  right: 15%;
  bottom: 1.25rem;
  left: 15%;
  color: #fff;
  text-align: center;
}

/* 公告栏 */
.el-collapse {
  border: 5px solid #ccc;
  width: 80%;
  margin-left: 10%;;
  /* 公告栏标题 */
  :deep(.el-collapse-item__header) {
    font-size: large;
  }
}

// 公告换行
.textNotice {
  white-space: pre-wrap;
  word-break: break-all;
}

/* 卡片 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>