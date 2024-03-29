<template>
  <!--操作框-->
  <BackOpCol role="用户" @addRole="addRoleB" @delBatch="delBatchB" @query="queryB">
    <el-input v-model="qp.clientName" placeholder="用户姓名" size="large"/>
  </BackOpCol>
  <p></p>
  <!--列表展示-->
  <el-table :data="clientList.records"
            max-height="70vh"
            row-key="clientId"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="30"/>
    <el-table-column label="图像">
      <MyAvatar name="lei-jun.jpg"/>
    </el-table-column>
    <el-table-column label="用户名" prop="clientName"/>
    <el-table-column label="账号" prop="clientUsername"/>
    <el-table-column label="性别">
      <template #default="scope">
        <TagSex :sex="scope.row.clientGender"/>
      </template>
    </el-table-column>
    <el-table-column label="年龄" prop="clientAge" sortable>
      <template #default="scope">{{ getAge(scope.row.clientAge) }}岁</template>
    </el-table-column>
    <el-table-column label="联系方式" prop="clientTel"/>
    <el-table-column label="简介" prop="clientInfo"/>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button-group>
          <el-button :icon="Edit" circle type="warning" @click="showDialog"/>
          <el-button :icon="Delete" circle type="danger" @click="delOne(scope.row)"/>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <p></p>
  <!--分页条-->
  <el-pagination
      :current-page="qp.numPage"
      :page-size="qp.pageSize"
      :page-sizes="[7, 10, 13, 16]"
      :total="clientList.total"
      background
      hide-on-single-page
      layout="total, sizes,prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
  <!--修改、新增时的模态框-->
  <el-dialog v-model="modalView" :title="modalTit" draggable width="30%">
    <span>It's a draggable Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalView = false">取消</el-button>
        <el-button type="primary" @click="modalView = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {Delete, Edit} from '@element-plus/icons-vue'
import BackOpCol from "@/components/row/BackOpCol.vue";
import {YClientList} from "@/modal/VO/BackQuery";
import {getAge} from "@/utils/TimeUtil";
import {Client, exampleClientBack} from "@/modal/entiy/Client";
import TagSex from "@/components/show/TagSex.vue";
import MyAvatar from "@/components/show/MyAvatar.vue";
import {ElMessage, ElMessageBox} from "element-plus";

// 查询的参数
const qp: YClientList = reactive({
  clientName: '',
  numPage: 1,
  pageSize: 7
})
const queryB = (): void => {
  console.log("查询,参数1", qp.clientName)
  sendQuery()
}
const addRoleB = (): void => {
  console.log("添加用户")
  modalTit.value = "新增用户"
  modalView.value = true
}
const delBatchB = (): void => {
  console.log("批量删除")
  ElMessageBox.confirm(
      '这些被选中者，将迎来一场浩大而又凄美的结局。这是对他们选择和坚持的回报，是既悲痛又美丽的终结。',
      '删除多个确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('删除取消')
  })
}
const delOne = (row: Client) => {
  ElMessageBox.confirm(
      `【${row.clientName}】已无路可退，只能接受命运的裁决。`,
      '删除单个确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('删除取消')
  })
}
// 列表展示
const clientList = reactive(exampleClientBack())
// 多选与反选
const roleIdList = ref<number[]>([])
const handleSelectionChange = (val: Client[]): void => {
  roleIdList.value = val.map(obj => obj.clientId)
  console.log(roleIdList.value)
}
// 分页条
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  sendQuery()
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  sendQuery()
}
// 数据总览
const sendQuery = (): void => {
  console.log(`当前的页面参数，
  用户名：${qp.clientName},
  页码：${qp.numPage},大小：${qp.pageSize}`)
}
// 模态框
const modalView = ref(false)
const modalTit = ref<"新增用户" | "修改用户">("修改用户")
// 修改时展示模态框
const showDialog = () => {
  modalView.value = true
  modalTit.value = "修改用户"
}
</script>

<style scoped>

</style>
