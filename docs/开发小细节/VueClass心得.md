# VueClass心得

## 一、经验

* 内部属性字段都默认是ref(vue的单个响应式)，但在类中引用只要用this就行
* 组件引用要在头函数`Options`的`components`里面
* 头函数`Options`可以放计算属性，也可以放钩子函数`created`
* `@Prop`接收参数，直接通过this引用就行
* 钩子函数直接用,比如`mouted`、`created`
* 函数、常量自动暴露，不用return
* @Ref引用组件，需要在html的对应组件中，加上ref="引用变量"

## 二、样例

结构大致如下:

```vue
<template>
  <div>
    使用计算属性：{{ nodeContainerClass }} 使用class的字段：{{ param }}
    <div>
      <!-- 通过ref将组件与class的@Ref对应上-->
      <children-comp ref="childrenComp" @closeForm="aaaaaSetup.param"></children-comp>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { getCurrentInstance } from "vue";
import { Prop, Ref } from "vue-property-decorator";
import ChildrenComp from "@/views/comp/ChildrenComp.vue";

@Options({
  name: "ExampleMyComp",
  // 计算属性
  computed: {
    bbbbbCompute() {
      return "这是计算属性" + this.justPropTxt;
    },
  },
  // 引用的组件要放在这里
  components: {
    ChildrenComp,
  },
})
export default class ExampleMyComp extends Vue {
  // 通过@Ref引入其它组件以操控其它组件的数据，或执行其它组件的函数
  @Ref() readonly childrenComp!: ChildrenComp;
  // prop传参无需多言
  @Prop() myCompInfo!: MyCompInfo;
  @Prop({ default: () => "", required: true }) justPropTxt!: string; // 泳道图类型
  // 类中字段是默认ref的，也是响应式
  param: string = "sssss";
  // 可以使用钩子函数，就像普通的类中函数一样
  mounted() {
    // 直接使用this引用，且不需要在后面加上value，就像普通的类中字段一样
    console.log(this.param);
    // 通过@Ref与ref绑定完组件后，可以通过this来使用其它组件的属性或方法
    console.log(this.childrenComp.nodeList);
  }
  /**
   * 这里可以存放setup，也可以放多个setup
   */
  aaaaaSetup = setup(() => {
    // 应用上下文,用于代替this
    const proxy = getCurrentInstance()?.proxy as this;
    // setup中的函数就是普通的setup，当然后面需要return
    const sss = () => {
      console.log(proxy.justPropTxt);
    };
    return { sss };
  });
}
</script>
<style lang="scss" scoped></style>
```

