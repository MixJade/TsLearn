# Css冒号选择器

> 2024-5-30 16:18:06

## 一、单冒号选择器

> 选择同级元素，与选择子元素

提问：

* `p:nth-child(2)`与`p :nth-child(2)`有什么区别？(后者的冒号前面多个空格)

`p:nth-child(2)` 选择的是匹配到的第二个`<p>`。

`p :nth-child(2)` 选择的是`<p>`元素下的所有元素中的第二个子元素，不管这个子元素是什么类型。

这两者之间的主要区别在于空格的使用。CSS选择器中的空格是一个后代选择器，表示在一个元素内部的所有元素。所以`p :nth-child(2)` 表示在`<p>`元素内的所有第二个子元素，而不只是`<p>`元素。

## 1.1 选择匹配到的第n个元素

* css设置

```css
p:nth-child(1){
    color: red;
}
p:nth-child(2){
    color: green;
}
```

* 这里的第1个p是红色、2个p是绿色

```html
<div class="wrapper">
    <p>sss</p>
    <p>sss</p>
    <p>sss</p>
</div>
```

## 1.2 选择匹配元素的子元素

* css设置

```css
/* 其它配置同上 */
p :nth-child(1) {
    color: yellow;
}
```

* 这里p下的span文字会是黄色，但p自己的文字还是原来的

```html
<div class="wrapper">
    <p>sss<span>变黄色</span></p>
    <p>sss<span>变黄色</span></p>
</div>
```

## 二、双冒号选择器

> 就是伪类

* 一般只有下面这两种情况

```css
*::before,
*::after {
    content: "";
    position: absolute;
    box-sizing: border-box;
}
```

