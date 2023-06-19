<template>
  <div>
    <h2>你好世界</h2>
    <button @click="show=!show">切换显示</button>
  </div>
  <br>
  <ul v-if="show">
    <li>
      <router-link replace to="/test1/life">子路由:生命周期</router-link>
    </li>
    <li>
      <router-link :to="{
        name:'propTest',
        params:{roll:'ss'},
        query:{
          role:'测试Query传prop'
        }
      }">子路由:prop传递
      </router-link>
    </li>
    <li>
      <router-link to="/test1/query?msg1=收到&msg2=十点多&msg3=89">子路由:参数传递</router-link>
    </li>
    <li>
      <router-link :to="{
      name:'query02',
      query:{
        msg1:'收到',
        msg2:'十点多',
        msg3:999
      }
    }">子路由:参数传递2
      </router-link>
    </li>
  </ul>
  <ul v-else>
    <li>你过零丁洋</li>
    <li>你过零丁洋</li>
    <li>你过零丁洋</li>
    <li>你过零丁洋</li>
  </ul>
  <br>
  <router-view v-slot="{ Component }">
    <keep-alive include="MyHello">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import {ref} from "vue";

const show = ref(true)
</script>

<style scoped>
</style>