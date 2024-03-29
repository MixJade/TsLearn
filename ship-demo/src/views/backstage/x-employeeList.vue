<template>
  <!--操作框-->
  <BackOpCol role="管理员" @addRole="addRoleB" @delBatch="delBatchB" @query="queryB">
    <el-input v-model="qp.employeeName" placeholder="管理员姓名" size="large"/>
  </BackOpCol>
  <p></p>
  <!--列表展示-->
  <el-table :data="employeeList.records"
            max-height="70vh"
            row-key="employeeId"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="30"/>
    <el-table-column label="图像">
      <MyAvatar name="lei-jun.jpg"/>
    </el-table-column>
    <el-table-column label="账号" prop="employeeUsername"/>
    <el-table-column label="姓名" prop="employeeName"/>
    <el-table-column label="工龄" prop="createTime" sortable>
      <template #default="scope">{{ getDaysFromToday(scope.row.createTime) }}</template>
    </el-table-column>
    <el-table-column label="联系方式" prop="employeeTel"/>
    <el-table-column label="职位">
      <template #default="scope">
        <el-tag>{{ getJob(scope.row.employeeLevel) }}</el-tag>
      </template>
    </el-table-column>
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
      :total="employeeList.total"
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
import {XEmployeeList} from "@/modal/VO/BackQuery";
import {getDaysFromToday} from "@/utils/TimeUtil";
import {getJob} from "@/utils/JobUtil";
import {Employee, exampleEmployeeBack} from "@/modal/entiy/Employee";
import MyAvatar from "@/components/show/MyAvatar.vue";
import {ElMessage, ElMessageBox} from "element-plus";

// 查询的参数
const qp: XEmployeeList = reactive({
  employeeName: '',
  numPage: 1,
  pageSize: 7
})
const queryB = (): void => {
  console.log("查询,参数1", qp.employeeName)
  sendQuery()
}
const addRoleB = (): void => {
  console.log("添加管理员")
  modalTit.value = "新增管理员"
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
const delOne = (row: Employee) => {
  ElMessageBox.confirm(
      `【${row.employeeName}】已无路可退，只能接受命运的裁决。`,
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
const employeeList = reactive(exampleEmployeeBack())
// 多选与反选
const roleIdList = ref<number[]>([])
const handleSelectionChange = (val: Employee[]): void => {
  roleIdList.value = val.map(obj => obj.employeeId)
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
  页码：${qp.numPage},大小：${qp.pageSize}`)
}
// 模态框
const modalView = ref(false)
const modalTit = ref<"新增管理员" | "修改管理员">("修改管理员")
// 修改时展示模态框
const showDialog = () => {
  modalView.value = true
  modalTit.value = "修改管理员"
}
</script>

<style scoped>

</style>
