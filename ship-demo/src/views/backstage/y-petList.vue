<template>
  <!--操作框-->
  <BackOpCol role="宠物" @addRole="addRoleB" @delBatch="delBatchB" @query="queryB">
    <el-input v-model="qp.petName" placeholder="宠物姓名" size="large"/>
    <el-input v-model="qp.clientName" placeholder="用户姓名" size="large"/>
  </BackOpCol>
  <p></p>
  <!--列表展示-->
  <el-table :data="petList.records"
            max-height="70vh"
            row-key="petId"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="30"/>
    <el-table-column label="图像">
      <MyAvatar name="pet-ex.jpg"/>
    </el-table-column>
    <el-table-column label="宠物名" prop="petName"/>
    <el-table-column label="品种">
      <template #default="scope">
        <el-tag>{{ scope.row.petVariety }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="性别">
      <template #default="scope">
        <TagSex :sex="scope.row.petSex"/>
      </template>
    </el-table-column>
    <el-table-column label="年龄" prop="petAge" sortable>
      <template #default="scope">{{ getAge(scope.row.petAge) }}岁</template>
    </el-table-column>
    <el-table-column label="健康状态">
      <template #default="scope">
        <el-tag>{{ scope.row.petStatus }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="近况" prop="petInfo"/>
    <el-table-column label="主人" prop="clientName"/>
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
      :total="petList.total"
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
import {YPetList} from "@/modal/VO/BackQuery";
import {examplePetBack} from "@/modal/DO/PetDto";
import {getAge} from "@/utils/TimeUtil";
import {Pet} from "@/modal/entiy/Pet";
import TagSex from "@/components/show/TagSex.vue";
import MyAvatar from "@/components/show/MyAvatar.vue";
import {ElMessage, ElMessageBox} from "element-plus";

// 查询的参数
const qp: YPetList = reactive({
  petName: '',
  clientName: '',
  numPage: 1,
  pageSize: 7
})
const queryB = (): void => {
  console.log("查询，参数1：", qp.petName, "参数2", qp.clientName)
  sendQuery()
}
const addRoleB = (): void => {
  console.log("添加宠物")
  modalTit.value = "新增宠物"
  modalView.value = true
}
const delBatchB = (): void => {
  console.log("批量删除")
  ElMessageBox.confirm(
      '此处犹如寒冰之墓，飘落的雪消声无息。一群疲惫的动物在这冰冷的静寂里深深铭记，无尽等待，等待着凄凉的宿命落幕。',
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
const delOne = (row: Pet) => {
  ElMessageBox.confirm(
      `此地死寂如冰，落雪无声，一只憔悴的【${row.petName}】于静默中铭记与等待`,
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
const petList = reactive(examplePetBack())
// 多选与反选
const roleIdList = ref<number[]>([])
const handleSelectionChange = (val: Pet[]): void => {
  roleIdList.value = val.map(obj => obj.petId)
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
  用户名：${qp.clientName},宠物：${qp.petName},
  页码：${qp.numPage},大小：${qp.pageSize}`)
}
// 模态框
const modalView = ref(false)
const modalTit = ref<"新增宠物" | "修改宠物">("修改宠物")
// 修改时展示模态框
const showDialog = () => {
  modalView.value = true
  modalTit.value = "修改宠物"
}
</script>

<style scoped>

</style>
