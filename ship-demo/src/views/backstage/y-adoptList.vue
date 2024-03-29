<template>
  <!--操作框-->
  <BackOpCol role="领养" @addRole="addRoleB" @delBatch="delBatchB" @query="queryB">
    <el-input v-model="qp.petName" placeholder="申请人" size="large"/>
    <el-input v-model="qp.clientName" placeholder="宠物名" size="large"/>
  </BackOpCol>
  <p></p>
  <!--列表展示-->
  <el-table :data="adoptList.records"
            max-height="70vh"
            row-key="adoptId"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="30"/>
    <el-table-column label="订单号" prop="adoptCode"/>
    <el-table-column label="简介" prop="adoptInfo"/>
    <el-table-column label="定金" prop="adoptMoney" sortable/>
    <el-table-column :formatter="removeT" label="创建时间" prop="createTime" sortable/>
    <el-table-column label="宠物名" prop="petName"/>
    <el-table-column label="申请人" prop="clientName"/>
    <el-table-column label="是否通过" prop="inAdopt" sortable>
      <template #default="scope">
        <el-tag v-if="scope.row.inAdopt===0">待审核</el-tag>
        <el-tag v-else-if="scope.row.inAdopt===1" type="success">已通过</el-tag>
        <el-tag v-else type="danger">已拒绝</el-tag>
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
      :total="adoptList.total"
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
import {YAdoptList} from "@/modal/VO/BackQuery";
import {Adopt} from "@/modal/entiy/Adopt";
import {exampleAdoptBack} from "@/modal/DO/AdoptDto";
import {moveT} from "@/utils/TimeUtil";
import {ElMessage, ElMessageBox} from "element-plus";

// 查询的参数
const qp: YAdoptList = reactive({
  petName: '',
  clientName: '',
  numPage: 1,
  pageSize: 7
})
const queryB = (): void => {
  sendQuery()
}
const addRoleB = (): void => {
  console.log("添加领养")
  modalTit.value = "新增领养"
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
const adoptList = reactive(exampleAdoptBack())
const removeT = (row: Adopt) => {
  return moveT(row.createTime)
}
// 多选与反选
const roleIdList = ref<number[]>([])
const handleSelectionChange = (val: Adopt[]): void => {
  roleIdList.value = val.map(obj => obj.adoptId)
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
const modalTit = ref<"新增领养" | "修改领养">("修改领养")
// 修改时展示模态框
const showDialog = () => {
  modalView.value = true
  modalTit.value = "修改领养"
}
</script>

<style scoped>

</style>
