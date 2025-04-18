<template>
  <div class="backstage">
    <aside>
      <router-link :to="$route.path==='/backstage'?'/doctorPage':'/backstage'">
        <img alt="头像" class="my-avatar" src="/picture/lei-jun.jpg"/>
      </router-link>
      <el-menu
          :default-active="$route.path"
          active-text-color="#ffd04b"
          background-color="#545c64"
          router
          text-color="#fff"
      >
        <el-sub-menu index="">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item-group title="医生姓名">
            <el-menu-item index="/backstage">个人资料</el-menu-item>
            <el-menu-item index="/backstage/x-departmentList">部门列表</el-menu-item>
            <el-menu-item index="/backstage/x-employeeList">员工列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="/backstage/y-clientList">
          <el-icon>
            <User/>
          </el-icon>
          <span>用户列表</span>
        </el-menu-item>
        <el-menu-item index="/backstage/y-petList">
          <el-icon>
            <Football/>
          </el-icon>
          <span>宠物列表</span>
        </el-menu-item>
        <el-menu-item index="/backstage/y-doctorList">
          <el-icon>
            <Apple/>
          </el-icon>
          <span>医生列表</span>
        </el-menu-item>
        <el-menu-item index="/backstage/y-appointmentList">
          <el-icon>
            <Tickets/>
          </el-icon>
          <span>挂号列表</span>
        </el-menu-item>
        <el-menu-item index="/backstage/y-adoptList">
          <el-icon>
            <School/>
          </el-icon>
          <span>领养列表</span>
        </el-menu-item>
        <el-menu-item index="/backstage/y-fosterList">
          <el-icon>
            <OfficeBuilding/>
          </el-icon>
          <span>寄养列表</span>
        </el-menu-item>
        <el-menu-item index="/backstage/y-noticeList">
          <el-icon>
            <DataBoard/>
          </el-icon>
          <span>公告列表</span>
        </el-menu-item>
      </el-menu>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import {
  Apple,
  DataBoard,
  Football,
  Menu as IconMenu,
  OfficeBuilding,
  School,
  Tickets,
  User,
} from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.backstage {
  height: 96vh;
  display: flex;
  /*侧边栏*/
  aside {
    max-width: 180px;
    height: 100%;
    background-color: #545c64;
    box-sizing: border-box;
    padding: 4px;
    -webkit-user-select: none;
    user-select: none;
    /*头像*/
    img.my-avatar {
      border-radius: 50%;
      position: relative;
      height: 72px;
      width: 72px;
      top: 20px;
      left: 50%;
      margin-left: -36px;
    }

    /*导航菜单*/
    .el-menu {
      position: relative;
      top: 16px;
    }
  }

  main {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    background-color: #F0EAD6;
    z-index: 0;
  }
}
</style>
