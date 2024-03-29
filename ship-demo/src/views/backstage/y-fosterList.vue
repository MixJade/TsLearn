<template>
  <!--操作框-->
  <BackOpCol role="寄养" @addRole="addRoleB" @delBatch="delBatchB" @query="queryB">
    <el-input v-model="qp.petName" placeholder="申请人" size="large"/>
    <el-input v-model="qp.clientName" placeholder="宠物名" size="large"/>
  </BackOpCol>
  <p></p>
  <!--列表展示-->
  <el-table :data="fosterList.records"
            max-height="70vh"
            row-key="fosterId"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="30"/>
    <el-table-column label="订单号" prop="fosterCode"/>
    <el-table-column label="到期时间" prop="fosterTerm" sortable/>
    <el-table-column label="定金" prop="fosterMoney" sortable/>
    <el-table-column label="订单备注" prop="fosterInfo"/>
    <el-table-column label="宠物名" prop="petName"/>
    <el-table-column label="寄养人" prop="clientName"/>
    <el-table-column label="是否过期" prop="fosterTerm" sortable>
      <template #default="scope">
        <el-tag v-if="calculateDays(scope.row.fosterTerm)==='已过期'" type="danger">已过期</el-tag>
        <span v-else>{{ calculateDays(scope.row.fosterTerm) }}</span>
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
      :total="fosterList.total"
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
import {YFosterList} from "@/modal/VO/BackQuery";
import {Foster} from "@/modal/entiy/Foster";
import {exampleFosterBack} from "@/modal/DO/FosterDto";
import {ElMessage, ElMessageBox} from "element-plus";

// 查询的参数
const qp: YFosterList = reactive({
  petName: '',
  clientName: '',
  numPage: 1,
  pageSize: 7
})
const queryB = (): void => {
  sendQuery()
}
const addRoleB = (): void => {
  console.log("添加寄养")
  modalTit.value = "新增寄养"
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
const fosterList = reactive(exampleFosterBack())
// 多选与反选
const roleIdList = ref<number[]>([])
const handleSelectionChange = (val: Foster[]): void => {
  roleIdList.value = val.map(obj => obj.fosterId)
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
const modalTit = ref<"新增寄养" | "修改寄养">("修改寄养")
// 修改时展示模态框
const showDialog = () => {
  modalView.value = true
  modalTit.value = "修改寄养"
}
// 数据格式化
const calculateDays = (inputDate: string): string => {
  const today = new Date();
  const date = new Date(inputDate);
  // 确保输入的是有效的日期
  if (isNaN(date.getTime())) {
    return '日期格式不对';
  }
  if (today < date) {
    const diffTime = Math.abs(date.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + "天";
  } else {
    return '已过期';
  }
}
</script>

<style scoped>

</style>
