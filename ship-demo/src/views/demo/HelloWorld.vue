<script lang="ts" setup>
import {Check, Delete, Edit, Message, Search, Star,} from '@element-plus/icons-vue'</script>
<template>
  <el-row class="mb-4">
    <el-button round type="primary">Primary</el-button>
    <el-button round type="success">Success</el-button>
    <el-button round type="info">Info</el-button>
    <el-button round type="warning">Warning</el-button>
    <el-button round type="danger">Danger</el-button>
  </el-row>

  <el-row>
    <el-button :icon="Search" circle/>
    <el-button :icon="Edit" circle type="primary"/>
    <el-button :icon="Check" circle type="success"/>
    <el-button :icon="Message" circle type="info"/>
    <el-button :icon="Star" circle type="warning"/>
    <el-button :icon="Delete" circle type="danger"/>
  </el-row>
</template>