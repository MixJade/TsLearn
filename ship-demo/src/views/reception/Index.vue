<template>
  <div>
    <header>
      <router-link to="/reception/clientCenter">
        MixJade
      </router-link>
      <ul>
        <li><a @click="openDialog(notices[0])">网站公告</a></li>
        <li>
          <router-link to="/reception/chat">咨询医生</router-link>
        </li>
        <li class="drop">个人中心<span>&#9660</span>
          <ul class="drop-list">
            <li>
              <router-link to="/reception/clientCenter">个人资料</router-link>
            </li>
            <li>
              <router-link to="/reception/clientCenter/clientPet">宠物信息</router-link>
            </li>
            <li>
              <router-link to="/reception/clientCenter/clientAppoint">挂号查看</router-link>
            </li>
            <li><a style="color: red" @click="logout">退出登陆</a></li>
          </ul>
        </li>
      </ul>
    </header>
    <WindRoll/>
    <main>
      <!-- 公告栏-->
      <h2>网站公告</h2>
      <p>网站的最新公告</p>
      <MyRow>
        <NoticeBtn v-for="notice in notices" :key="notice.noticeId" @click="openDialog(notice)">
          {{ notice.noticeTitle }}
        </NoticeBtn>
      </MyRow>
      <!--公告的对话框-->
      <MyDialog :tit="noticeDialog.tit" :content="noticeDialog.content" ref="myShow"/>
      <!-- 用户卡片-->
      <h2>用户入口</h2>
      <p>一些与用户相关的功能入口，也可以前往中心查看。
        <router-link style="color: #E6A23C;" to="reception/clientCenter">点击跳转</router-link>
      </p>
      <MyRow>
        <LinkCard v-for="card in userCard"
                  :tit="card.tit"
                  :body="card.body"
                  :type="card.type"
                  :router-path="card.routerPath"
        />
      </MyRow>
      <!-- 待领养宠物-->
      <h2>待领养宠物</h2>
      <p>它们等待一个温暖的家。
        <router-link style="color: #67C23A;" to="/reception/petSee">查看全部</router-link>
      </p>
      <PetCard :card-list="petCardTxt.records"/>
      <!-- 医生卡片-->
      <h2>医生展示</h2>
      <p>我们拥有虚拟的医生。
        <router-link style="color: #409EFF;" to="/reception/doctorSee">查看全部</router-link>
      </p>
      <DoctorCard :card-list="doctorCardTxt.records"/>
      <!-- 寄养卡片-->
      <h2>寄养宠物展示</h2>
      <p>我们提供寄养服务。
        <router-link style="color: #E6A23C;" to="/reception/fosterSee">查看全部</router-link>
      </p>
      <FosterCard :card-list="fosterCardTxt.records"/>
    </main>
    <!-- 页脚-->
    <VueFoot/>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {examplePetFour, Pet} from "@/modal/entiy/Pet";
import {Page} from "@/modal/DO/Page";
import PetCard from "@/components/zoneView/PetCard.vue";
import DoctorCard from "@/components/zoneView/DoctorCard.vue";
import FosterCard from "@/components/card/FosterCard.vue";
import router from "@/router";
import {DoctorDto, exampleDoctor} from "@/modal/DO/DoctorDto";
import {exampleFoster, FosterCardDto} from "@/modal/DO/FosterCardDto";
import {exampleNotice, NoticeDto} from "@/modal/DO/NoticeDto";
import VueFoot from "@/components/show/VueFoot.vue";
import WindRoll from "@/components/show/WindRoll.vue";
import MyRow from "@/components/row/MyRow.vue";
import NoticeBtn from "@/components/button/NoticeBtn.vue";
import LinkCard from "@/components/card/LinkCard.vue";
import MyDialog from "@/components/show/MyDialog.vue";

// 公告栏
const notices: NoticeDto[] = reactive(exampleNotice())
// 公告弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const noticeDialog = reactive({tit: "标题", content: "文本内容"})
const openDialog = (notice: NoticeDto) => {
  noticeDialog.tit = notice.noticeTitle
  noticeDialog.content = notice.textNotice
  myShow.value?.showMe()
}

// 常量：用户卡片
interface UserCard {
  tit: string;
  body: string;
  type: "primary" | "success" | "warning";
  routerPath: string;
}// 用户卡片的配置信息
const userCard: UserCard[] = [
  {
    "tit": "挂号信息",
    "body": "在此查看自己的历史挂号",
    "type": "primary",
    "routerPath": "/reception/clientCenter/clientAppoint"
  }, {
    "tit": "宠物信息",
    "body": "查看自己的名下宠物",
    "type": "warning",
    "routerPath": "/reception/clientCenter/clientPet"
  }, {
    "tit": "咨询医生",
    "body": "向医生发起咨询",
    "type": "success",
    "routerPath": "/reception/chat"
  },
]

// 宠物的卡片信息
const petCardTxt: Page<Pet> = reactive(examplePetFour())
// 医生的卡片信息
const doctorCardTxt: Page<DoctorDto> = reactive(exampleDoctor())
// 寄养宠物的卡片信息
const fosterCardTxt: Page<FosterCardDto> = reactive(exampleFoster())

// 退出登录
const logout = (): void => {
  router.push("/")
  console.log("退出登录")
}
</script>
<style lang="scss" scoped>
/* 导航栏 */
header {
  box-sizing: border-box;
  width: 100%;
  padding: 0 8px;
  background-color: #228B22;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  -webkit-user-select: none;
  user-select: none;

  & > a:first-child {
    color: #fff;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: 700;
  }

  > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      a {
        padding: 4px 4px;
      }
      .drop {
        padding: 4px 4px;
      }
    }

    > li {
      list-style: none;

      a {
        text-decoration: none;
        color: #fff;
        padding: 4px 24px;
        border-radius: 20px;

        &:hover, &:active {
          background-color: #fff;
          color: #000;
        }
      }
    }
  }

  /* 导航下拉框 */
  .drop {
    cursor: pointer;
    color: #fff;
    padding: 4px 24px;

    span {
      display: inline-block;
      transform: rotate(0deg);
      transition: transform 200ms;
    }

    &:hover {
      color: #FFD700;

      span {
        transform: rotate(180deg);
      }

      .drop-list {
        visibility: visible;
        height: 128px;
      }
    }

    .drop-list {
      position: absolute;
      width: 128px;
      margin-left: -36px;
      background: #3CB371;
      box-shadow: 0 1px 2px #333333;
      border: dashed seashell;
      border-radius: 20px;
      list-style: none;
      text-align: center;
      padding: 5px 5px;
      z-index: 70;
      transition: height 500ms;
      height: 0;
      overflow-y: hidden;
      visibility: hidden;

      li {
        padding-top: 4px;
        padding-bottom: 4px;
      }
    }
  }
}

/*主要内容*/
main {
  /*小标题与介绍文字*/
  h2, p {
    text-align: center;
  }

  /*公告换行*/
  .textNotice {
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>
