<template>
  <!--操作框-->
  <BackOpCol role="挂号" @addRole="addRoleB" @delBatch="delBatchB" @query="queryB">
    <el-select v-model="qp.seaType" placeholder="Select" size="large">
      <el-option :value="0" label="医生"/>
      <el-option :value="1" label="科室"/>
      <el-option :value="2" label="挂号人"/>
      <el-option :value="3" label="宠物"/>
    </el-select>
    <el-input v-model="qp.seaName" placeholder="名称" size="large"/>
  </BackOpCol>
  <p></p>
  <!--列表展示-->
  <el-table :data="appointList.records"
            max-height="70vh"
            row-key="appointId"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="30"/>
    <el-table-column :formatter="removeT_1" label="就诊时间" prop="appointmentDate" sortable/>
    <el-table-column label="简介" prop="appointmentInfo"/>
    <el-table-column :formatter="removeT_2" label="创建时间" prop="createTime" sortable/>
    <el-table-column label="宠物名" prop="petName"/>
    <el-table-column label="挂号人" prop="clientName"/>
    <el-table-column label="医生" prop="doctorName"/>
    <el-table-column label="科室">
      <template #default="scope">
        <el-tag>{{ scope.row.departmentName }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button-group>
          <el-button :icon="Edit" circle type="warning" @click="showDialog"/>
          <el-button :icon="Delete" circle type="danger" @click="delOne(scope.row.adoptId)"/>
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
      :total="appointList.total"
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
import {YAppointList} from "@/modal/VO/BackQuery";
import {Appoint} from "@/modal/entiy/Appoint";
import {moveT} from "@/utils/TimeUtil";
import {exampleAppointBack} from "@/modal/DO/AppointDto";
import {ElMessage, ElMessageBox} from "element-plus";

// 查询的参数
const qp: YAppointList = reactive({
  seaName: '',
  seaType: 0,
  numPage: 1,
  pageSize: 7
})
const queryB = (): void => {
  sendQuery()
}
const addRoleB = (): void => {
  console.log("添加挂号")
  modalTit.value = "新增挂号"
  modalView.value = true
}
const delBatchB = (): void => {
  console.log("批量删除")
  ElMessageBox.confirm(
      '在您做出指示之前，我还是要再次确认，您确定要焚毁这些的订单吗？',
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
const delOne = (delId: number) => {
  console.log("所删除的ID是", delId)
  ElMessageBox.confirm(
      `解脱一纸束缚的契约，赐予其尘归尘的命运。`,
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
const appointList = reactive(exampleAppointBack())
const removeT_1 = (row: Appoint) => {
  return moveT(row.appointmentDate)
}
const removeT_2 = (row: Appoint) => {
  return moveT(<string>row.createTime)
}
// 多选与反选
const roleIdList = ref<number[]>([])
const handleSelectionChange = (val: Appoint[]): void => {
  roleIdList.value = val.map(obj => obj.appointmentId)
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
  种类：${qp.seaType}},参数：${qp.seaName}
  页码：${qp.numPage},大小：${qp.pageSize}`)
}
// 模态框
const modalView = ref(false)
const modalTit = ref<"新增挂号" | "修改挂号">("修改挂号")
// 修改时展示模态框
const showDialog = () => {
  modalView.value = true
  modalTit.value = "修改挂号"
}
</script>

<style scoped>

</style>
