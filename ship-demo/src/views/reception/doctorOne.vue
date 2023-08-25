<template>
  <div class="base-page">
    <!-- 导航栏-->
    <PageHead>医生详情</PageHead>
    <MyRow2>
      <img class="my-avatar" alt="头像" src="/picture/doctor-ex.jpg">
      <table class="my-show-tab">
        <tr>
          <td colspan="2"><span style="font-weight: bolder">{{ doctorDetail.doctorName }}</span></td>
        </tr>
        <tr>
          <td colspan="2">工号：{{ doctorDetail.doctorCode }}</td>
        </tr>
        <tr class="hide-narrow">
          <td class="right-align">{{ getAge(doctorDetail.doctorAge) }}岁&nbsp;</td>
          <td class="left-align">&nbsp;{{ doctorDetail.doctorGender ? "男" : "女" }}</td>
        </tr>
        <tr class="hide-narrow">
          <td class="right-align">{{ doctorDetail.doctorJob }}&nbsp;</td>
          <td class="left-align">&nbsp;{{ doctorDetail.departmentName }}</td>
        </tr>
        <tr class="hide-narrow">
          <td colspan="2">{{ doctorDetail.doctorTel }}</td>
        </tr>
        <tr class="hide-narrow">
          <td colspan="2">{{ doctorDetail.doctorInfo }}</td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button type="primary" @click="$router.push('/reception/chat/'+doctorDetail.doctorId)">咨询
            </el-button>
          </td>
        </tr>
      </table>
      <template #right>
        <el-table :data="appointDetail" height="300px" stripe>
          <el-table-column label="挂号人" prop="clientName"/>
          <el-table-column label="宠物" prop="petName"/>
          <el-table-column label="描述" prop="appointmentInfo"/>
          <el-table-column :formatter="removeT" label="时间" prop="appointmentDate" width="180px"/>
        </el-table>
      </template>
    </MyRow2>
  </div>
</template>

<script lang="ts" setup>
import PageHead from "@/components/PageHead.vue";
import {getAge, moveT} from "@/utils/TimeUtil";
import {exampleDoctorDetail} from "@/modal/DO/DoctorDto";
import {AppointDto, exampleDoctorAppoint} from "@/modal/DO/AppointDto";
import MyRow2 from "@/components/show/MyRow2.vue";

// 如此获取传参
const props = defineProps<{
  doctorId: string
}>()
// 样例数据
const doctorDetail = exampleDoctorDetail(parseInt(props.doctorId));
const appointDetail = exampleDoctorAppoint(parseInt(props.doctorId));
const removeT = (row: AppointDto) => moveT(row.appointmentDate)
</script>

<style lang="scss" scoped>
/*响应式*/
@media (min-width: 768px) {
  .base-page {
    width: 70vw;
    left: 15vw;

    img.my-avatar {
      border-radius: 50%;
      margin-top: 10px;
      width: 128px;
      height: 128px;
    }
  }
}

@media (max-width: 768px) {
  .base-page {
    width: 80vw;
    left: 10vw;

    img.my-avatar {
      border-radius: 50%;
      width: 64px;
      height: 64px;
    }

    .hide-narrow {
      display: none;
    }
  }
}


/*设置大致布局*/
.base-page {
  position: absolute;
  top: 15vh;
  background-color: whitesmoke;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 16px;
  border-radius: 12px;
  /*医生卡片的表格*/
  .my-show-tab {
    width: 100%;

    .right-align {
      text-align: right;
    }

    .left-align {
      text-align: left;
    }
  }
}
</style>
