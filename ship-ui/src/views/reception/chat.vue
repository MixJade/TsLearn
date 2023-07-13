<template>
  <el-container>
    <el-header>
      <PageHead>与某医生的聊天</PageHead>
    </el-header>
    <el-container>
      <el-aside>
        <h4>当前聊天</h4>
        <ul>
          <li>王大夫</li>
        </ul>
        <h4>历史聊天</h4>
        <ul>
          <li>易大夫</li>
          <li>易大夫</li>
          <li>易大夫</li>
          <li>易大夫</li>
        </ul>
      </el-aside>
      <el-container>
        <el-main>
          <!--用户信息-->
          <div class="msg-card right-align">
            <div class="msg">
              <span>时间</span>
              <div class="msgText bg-success">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                autem consectetur doloremque, excepturi, harum iure minus modi nostrum obcaecati officia repellendus
                saepe? Animi corporis dicta mollitia nam odit quae totam!
              </div>
            </div>
            <el-avatar src="/picture/lei-jun.jpg"/>
          </div>
          <!--医生信息-->
          <div class="msg-card">
            <el-avatar src="/picture/lei-jun.jpg"/>
            <div class="msg">
              <span>时间</span>
              <div class="msgText bg-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi culpa
                dolor dolorem eum expedita iusto maiores nihil officiis placeat provident qui rem repellat
                reprehenderit, sapiente suscipit temporibus velit veniam.
              </div>
            </div>
          </div>
        </el-main>
        <el-footer>
          <el-icon size="36">
            <PictureRounded/>
          </el-icon>
          <el-input
              v-model="textarea1"
              autosize
              type="textarea"
              placeholder="请输入消息"
          />
          <el-button type="success" :icon="Position">发送</el-button>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {PictureRounded, Position} from "@element-plus/icons-vue"
import PageHead from "@/components/PageHead.vue";
import {ref} from "vue";

// 待发送的消息
const textarea1 = ref("")
</script>

<style scoped lang="scss">
/*聊天主体页面*/
.el-container {
  width: 98vw;
  height: 88vh;
  /*页头*/
  .el-header {
    height: 40px;
    background-color: #A8ABB2;
  }

  /*页头下面*/
  .el-container {
    .el-aside {
      background-color: lightgray;
      width: 15vw;
      @media (max-width: 576px) {
        width: 0;
      }
      /*人员列表*/
      ul {
        list-style: none;
        cursor: pointer;
        /*设置间距*/
        li {
          padding-bottom: 5px;
        }
      }
    }

    /*侧边栏右边*/
    .el-container {
      /*信息展示区域*/
      .el-main {
        background-color: whitesmoke;
        /*信息外壳*/
        .msg-card {
          display: flex;
          padding-bottom: 5px;
          /*消息卡片*/
          .msg {
            width: 50%;
            /*用户名与时间*/
            span {
              margin-left: 10px;
              margin-right: 10px;
              font-size: small;
            }

            /*消息框*/
            .msgText {
              padding: 5px;
              margin: 5px;
              border-radius: 8px;
              text-align: left;
            }
          }
        }

        /*用户信息靠右*/
        .right-align {
          justify-content: flex-end;
          text-align: right;
        }

        /*用户信息背景*/
        .bg-success {
          background-color: #67C23A;
        }

        /*医生信息背景*/
        .bg-light {
          background-color: #cccccc;
        }
      }

      /*输入区域*/
      .el-footer {
        padding-top: 8px;
        display: flex;
        height: 50px;
        background-color: #909399;
      }
    }
  }
}

</style>