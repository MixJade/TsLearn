<template>
  <!--操作框-->
  <BackOpCol role="医生" @addRole="addRoleB" @delBatch="delBatchB" @query="queryB">
    <el-input v-model="qp.doctorName" placeholder="医生姓名" size="large"/>
    <el-input v-model="qp.departmentName" placeholder="科室名" size="large"/>
  </BackOpCol>
  <p></p>
  <!--列表展示-->
  <el-table :data="doctorList.records"
            max-height="70vh"
            row-key="doctorId"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="30"/>
    <el-table-column label="图像">
      <MyAvatar name="doctor-ex.jpg"/>
    </el-table-column>
    <el-table-column label="医生名" prop="doctorName"/>
    <el-table-column label="工号" prop="doctorCode"/>
    <el-table-column label="性别">
      <template #default="scope">
        <TagSex :sex="scope.row.doctorGender"/>
      </template>
    </el-table-column>
    <el-table-column label="年龄" prop="doctorAge" sortable>
      <template #default="scope">{{ getAge(scope.row.doctorAge) }}岁</template>
    </el-table-column>
    <el-table-column label="联系方式" prop="doctorTel"/>
    <el-table-column label="简介" prop="doctorInfo"/>
    <el-table-column label="科室">
      <template #default="scope">
        <el-tag>{{ scope.row.departmentName }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="职位">
      <template #default="scope">
        <el-tag>{{ scope.row.doctorJob }}</el-tag>
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
      :total="doctorList.total"
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
import {YDoctorList} from "@/modal/VO/BackQuery";
import {getAge} from "@/utils/TimeUtil";
import {Doctor} from "@/modal/entiy/Doctor";
import {exampleDoctorBack} from "@/modal/DO/DoctorDto";
import TagSex from "@/components/show/TagSex.vue";
import MyAvatar from "@/components/show/MyAvatar.vue";
import {ElMessage, ElMessageBox} from "element-plus";

// 查询的参数
const qp: YDoctorList = reactive({
  doctorName: '',
  departmentName: '',
  numPage: 1,
  pageSize: 7
})
const queryB = (): void => {
  console.log("查询,参数1", qp.doctorName)
  sendQuery()
}
const addRoleB = (): void => {
  console.log("添加医生")
  modalTit.value = "新增医生"
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
const delOne = (row: Doctor) => {
  ElMessageBox.confirm(
      `【${row.doctorName}】已无路可退，只能接受命运的裁决。`,
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
const doctorList = reactive(exampleDoctorBack())
// 多选与反选
const roleIdList = ref<number[]>([])
const handleSelectionChange = (val: Doctor[]): void => {
  roleIdList.value = val.map(obj => obj.doctorId)
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
const modalTit = ref<"新增医生" | "修改医生">("修改医生")
// 修改时展示模态框
const showDialog = () => {
  modalView.value = true
  modalTit.value = "修改医生"
}
</script>

<style scoped>

</style>
