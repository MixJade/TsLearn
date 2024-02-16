# 关于SVG的一些随笔

## 一、SVG的代码

```xml
<!-- 定义了此图形，宽1000，高200 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200" preserveAspectRatio="none">
  <!-- 长方形区域，宽1000，高30，淡蓝色  -->
  <rect width="1000" height="30" fill="lightblue"/>
  <!-- 弧形区域，从(0,30)出发，低谷点为(500,130)，到(1000,30)结束 -->
  <path d="M0 30 Q500 130 ,1000 30" stroke="transparent" fill="lightblue"/>
</svg>
```

## 二、SVG在背景图片的使用

```css
body {
    background-image: url('data:image/svg+xml;utf8,<svg ...SVG的代码></svg>');
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    background-color: #f8f9fa;
}
```

## 三、SVG在网页图标的使用

```css
    <link rel="icon" type="image/svg+xml" href='data:image/svg+xml;utf8,<svg ...SVG的代码</svg>' />
```

