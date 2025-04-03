# payment-ui

> 2025-04-03 09:44:53

* 记账管理的前端，使用自定义的组件，加chart.js进行数据可视化

## 自定义组件说明

| 文件名               | 概要    | 说明                     |
|:------------------|:------|:-----------------------|
| CheckBtn.vue      | 开关    | 开关样式的checkBox          |
| DragBall.vue      | 悬浮球   | 可以拖动的悬浮球               |
| DropSelect.vue    | 二级下拉框 | 二级下拉框,可以设置是否禁选一级菜单     |
| IncomeBtn.vue     | 滑动开关  | 滑动槽样式的checkbox         |
| MyBtn.vue         | 经典按钮  | 自定义圆角按钮                |
| ReportBtn.vue     | 高光按钮  | 鼠标移上去会有滑动高光            |
| MyDialog.vue      | 弹窗组件  | 弹窗，暴露了开启和关闭方法          |
| SureDelModal.vue  | 确认删除框 | 暴露了确认删除方法,这是个Promise方法 |
| ToastBox.vue      | 吐司组件  | 暴露弹出方法，需在使用它的地方手动引入    |
| MonthCalendar.vue | 日历(月) | 一月下每天的日历               |
| YearCalendar.vue  | 日历(年) | 一年下每月的日历               |
| MyTable.vue       | 数据表格  | 集成了搜索框、功能按钮插槽、表格、分页条   |
| MoneyTag.vue      | 金额Tag | 根据收支类型展示不同样式金额         |
| yearReport.vue    | 年度报告  | 关于chart.js的基本运用        |
