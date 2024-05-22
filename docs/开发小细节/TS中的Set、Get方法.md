# TS中的Set、Get方法

## 一、介绍

在TypeScript中的set、get方法并不会自动触发，而是需要通过访问或修改属性的方式来触发。具体来说：

- get方法：当我们试图访问某个属性时，get方法会被触发，并返回该属性的值。
- set方法：当我们试图修改某个属性时，set方法会被触发，并使用新的值更新该属性。

典型的使用场景是，你想在获取或设置一个属性时执行某些额外的代码，比如数据验证或额外的计算。例如：

```typescript
class MyClass {
    private _myVal: number = 0;

    get myVal(): number {
        // Extra code here
        return this._myVal;   
    }

    set myVal(newVal: number) {
        if(newVal > 0) {
            this._myVal = newVal;
            // Extra code here
        }
    }
}
```

在这个例子中，`myVal`属性的值是通过`_myVal`私有属性存放的。我们对`myVal`属性的读取和修改都需要通过get、set方法来进行。这样我们就可以在get、set方法中加入一些额外的代码，比如数据验证或者额外的计算等。

## 二、工作中的场景

> 其实是我处理过的一个bug，这个不要乱用

首先看父组件

```vue
<template>
  <div>
    ...巴拉巴拉
    <example-model v-if="exModelShow" v-model="exModelShow" @selectAll="selectAll"></example-model>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ExampleModel from "@/views/ExampleModel.vue";

@Options({
  name: "FatherPart",
  components: {
    ExampleModel,
  },
})
export default class FatherPart extends Vue {
  exModelShow = false; //新增模态框开关

  mounted(): void {
    this.selectAll();
  }

  selectAll(): void {
    console.log("巴拉巴拉");
  }
}
</script>
```

然后看子组件

```vue
<template>
  <div>
    <a-modal wrapClassName="ExampleModel" v-model:visible="modalView" title="测试模态框"> ...巴拉巴拉 </a-modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Code } from "@/constants/enum/code.enum";
import apiService from "@/services/api.service";
import { Prop, Watch } from "vue-property-decorator";

@Options({
  name: "ExampleModel",
})
export default class ExampleModel extends Vue {
  @Prop({ default: () => false, required: true }) modelValue!: boolean; // 是否显示
  hiddenView = false; //隐藏开关

  hideModal() {
    apiService.queryByLike(expApi.addByCopy).then((resp: Res) => {
      if (resp.code === Code.SUCCESS.code) {
        this.$emit("selectAll"); // 为什么这个调用一直没有成功，问题在下一行代码
      }
    });

    this.modalView = false; // 其实问题在这里
  }

  get modalView() {
    return this.hiddenView;
  }

  set modalView(newValue) {
    // 只要修改modalView值，这个方法就会触发。
    // 下面的emit父组件没有接收，导致整个组件都卡住了。
    this.hiddenView = newValue;
    setTimeout(() => {
      // 实际上父组件没有这个方法，这样传会报错，然后整个卡住
      this.$emit("update:modelValue", newValue);
    }, 300);
  }

  @Watch("modelValue")
  modelValueChange() {
    if (this.modelValue) {
      this.hiddenView = this.modelValue;
    }
  }
}
</script>
```

**总结**

简单来说，添加完成后，其模态框组件中会通过`this.$emit("selectAll")`来调用父组件方法进行刷新。

这个emit在我测试时一直没有触发，但不是这个emit的问题。这个emit是在请求的回调函数中，而回调函数外面，有一个`this.modalView = false;`，看起来是单纯的调整模态框的显示，但其实那个作者在类中写了一个set方法，这个set方法中会调一个emit，然后这个set中调的emit还没有在父组件中接收。所以就卡那了，导致刷新的emit事件没有触发。

【注：请求的回调函数是异步函数，也就是说虽然`this.modalView = false;`在后面，但其实是先触发的】

只要将`this.modalView = false;`注释掉就好了。
