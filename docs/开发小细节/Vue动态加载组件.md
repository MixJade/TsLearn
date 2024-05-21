# Vue动态加载组件

> 2024年5月21日16:35:57

首先，可以使用Vue的动态组件功能。假设有一个变量叫做`componentName`，我们可以这样写：

```html
<!-- componentName是计算属性或者data属性 -->
<component :is='componentName'></component>
```

然后在JavaScript代码中设置`componentName`的值。例如：

```javascript
data() {
    return {
        componentName: 'my-component'
    }
}
```

这样，Vue会自动加载名为`my-component`的组件。

这种方法有一个前提，那就是你已经全局注册了所有可能的组件，或者在本地注册了需要的组件。全局注册可以这样做：

```javascript
Vue.component('my-component', MyComponent)
Vue.component('another-component', AnotherComponent)
```

或者局部注册：

```javascript
components: {
    MyComponent,
    AnotherComponent
}
```

此外，如果组件的数量过多，或者组件非常大，那么在一开始就加载所有组件可能会导致初始页面加载速度变慢。此时，你可以使用Vue的异步组件功能。这就需要你动态导入组件：

```javascript
components: {
    'my-component': () => import('./MyComponent.vue'),
    'another-component': () => import('./AnotherComponent.vue')
}
```

然后依然可以通过`:is`属性来动态加载组件。

这样，Vue会在需要这个组件的时候才加载它，从而提高了初始页面加载速度。