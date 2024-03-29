# VUE路由的一个细节

> 建议：在***template***中使用`this.$router`
>
> 在***script***代码中使用`router`



`this.$router`和`router`都是在Vue组件中使用Vue Router的方式。

`this.$router`是在Vue组件内部使用的，用来在组件中操作导航，如`this.$router.push`或`this.$router.go`等。通过`this.$router`可以直接访问到Vue Router的实例。

而`router`通常在Vue的主配置文件（如`main.js`或`app.js`)中被引入并作为Vue实例的一个参数。`router`实际上就是构造了一个Vue Router实例，然后会将这个实例注入到每一个Vue组件中，让每个组件都可以通过`this.$router`获取到这个实例。

简单来说，`this.$router`是在Vue组件中直接使用的，而`router`是Vue Router实例的构造者并在主配置文件中注入Vue实例的