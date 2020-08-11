# bootstrap 4
## 栅格

类名基本都遵循 `{attr} - {breakpoint} - {value}` 的规则
分别是 属性、响应断点、属性值，其中“响应断点”一般可省

---
## .col （等宽布局）

- 应用到所有设备（breakpoint）
- 行内自动适应宽度，总会占满一行
- 内容过多时会变宽，有可能将同行其他盒子挤到下一行
```html
<div class="row">
    <div class="col">content</div>
</div>
```
```html
// 等宽的两行
<div class="row">
    <div class="col">content</div>
    <div class="col">content</div>
</div>
```
---
## .col-{size}
- 设置列的固定栅格数量
- 栅格数量不足时不会占满一行

```html
<div class="row">
    <div class="col-1">content</div>
    <div class="col-2">content</div>
</div>
```
---
## .col-{breakpoint}
- 通过 {breakpoint}(断点) 来设置盒子在某个断点及以上时的适应性（否则栅格数量会被调整为 12）

例：
在 md(middle) 以上设备为均分的两个盒子
在 md 以下的设备为两行
```html
<div class="row">
    <div class="col-md">content</div>
    <div class="col-md">content</div>
</div>
```
---
## .col-auto
- 根据内容自动调整 {size}
- 栅格数量不足时不会占满一行

可以添加 {breakpoint}
如 col-md-auto (在 md 及以上设备根据内容自动调整宽度)

一种用法:
right 固定宽度， middle 根据内容适应宽度， left 根据 middle 自动适应宽度占满一行
```html
<div class="row">
    <div class="col">left</div>
    <div class="col-auto">middle</div>
    <div class="col-6">right</div>
</div>
```

---

## 混合布局

- 更精准的类名描述会在特定情况下覆盖掉范围较广的类名

例如：

尽管我们设定了 .col-12 和 .col-6，
但在 md 及以上设备里，仍以  .col-md-8 和 .col-md-4 为准（即 8 : 4）

```html
<div class="row">
    <div class="col-12 col-md-8">.col-12 .col-md-8</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
</div>
```

---

## 定义行的可容纳内容数量 .row-cols-{count}

- {count} 内容数量
- 不论 col-1 还是 col-12 ，均计为一块内容
- 若 {count} 大于实际内容数量，则不会占满一行

例如：

此时每个 col 仅占 container 的 1/3

```html
<div class="row-cols-3">
    <div class="col"></div>
    <div class="col"></div>
</div>
```

---

## 整体控制 .row 的子元素的垂直位置 .align-items-{position}

- {position} 包含 ==start== 、==center== 和 ==end==
- 分别表示“垂直靠上”、“垂直居中”和“垂直靠下”

例如

```html
<div class="row align-items-start">
    <div class="col">
        One of three columns
    </div>
    <div class="col">
        One of three columns
    </div>
    <div class="col">
        One of three columns
    </div>
</div>

<div class="row align-items-center">
    <div class="col">
        One of three columns
    </div>
    <div class="col">
        One of three columns
    </div>
    <div class="col">
        One of three columns
    </div>
</div>

<div class="row align-items-end">
    <div class="col">
        One of three columns
    </div>
    <div class="col">
        One of three columns
    </div>
    <div class="col">
        One of three columns
    </div>
</div>
```

---

## 单独控制 .row 的子元素的垂直位置 .align-self-{position}

- {positon} 包含 ==start== 、==center== 和 ==end==
- 分别表示“垂直靠上”、“垂直居中”和“垂直靠下”

例如：

```html	
<div class="row">
    <div class="col align-self-start">
        One of three columns
    </div>

    <div class="col align-self-center">
        One of three columns
    </div>

    <div class="col align-self-end">
        One of three columns
    </div>
</div>
```

---

## 整体控制 .row 的子元素的水平位置 .justify-content-{position}

- {positon} 包含 ==start== 、==center== 、 ==end==、==around==、==between==
- 分别表示“垂直靠上”、“垂直居中”、“垂直靠下”、“等距对齐”、”两端对齐“
- ==两端对齐==：紧靠父级元素两边对齐
- ==等距对齐==：即每个元拥有相同的外边距

例如：

```html
<div class="row justify-content-start">
    <div class="col-4">
        One of two columns
    </div>
    <div class="col-4">
        One of two columns
    </div>
</div>

<div class="row justify-content-center">
    <div class="col-4">
        One of two columns
    </div>
    <div class="col-4">
        One of two columns
    </div>
</div>

<div class="row justify-content-end">
    <div class="col-4">
        One of two columns
    </div>
    <div class="col-4">
        One of two columns
    </div>
</div>

<div class="row justify-content-around">
    <div class="col-4">
        One of two columns
    </div>
    <div class="col-4">
        One of two columns
    </div>
</div>

<div class="row justify-content-between">
    <div class="col-4">
        One of two columns
    </div>
    <div class="col-4">
        One of two columns
    </div>
</div>
```

---

##  消除边距 .no-gutters

`.container > .row` 下的列元素默认存在一个 `padding:0 15px;`(左右15px)

若需要消除此边距，在 .row 上加一个类名 ==.no-gutters== 即可

> .no-gutters 的源码

```scss
.no-gutters {
  margin-right: 0;
  margin-left: 0;

  > .col,
  > [class*="col-"] {
    padding-right: 0;
    padding-left: 0;
  }
}
```

例如：

```html
<div class="row justify-content-between no-gutters">
    <div class="col-3">
        One of two columns
    </div>
    <div class="col-3">
        One of two columns
    </div>
    <div class="col-3">
        One of two columns
    </div>
</div>
```

![image-20200420193857760](C:\Users\10199\AppData\Roaming\Typora\typora-user-images\image-20200420193857760.png)

此时我们注意到，虽然列内边距消失了，但元素却离开了 .row 的边缘。

这是因为，.row 本身会通过 `margin:0 -15px;` 消除 .container 的 padding

文档：

> 每列都有水平的`padding`值，用于控制它们之间的间隔，同时在 row 的负外边距上抵消

而 .no-gutters 将这个 margin 重置为 0，于是就会出现这种情况

这时候可以通过一个辅助类 .p-0 加在 .container上 ，将 .container 的 padding 置 0 即可 

例如：

```html
<div class="container p-0">
    <div class="row justify-content-between no-gutters">
        <div class="col-3">
            One of two columns
        </div>
        <div class="col-3">
            One of two columns
        </div>
        <div class="col-3">
            One of two columns
        </div>
    </div>
</div>
```

---
## 换行 

- 使用 ==.w-100== ，意为 width:100%;

- 用来在 .row 中分割一行，这是 Flexbox 流式布局的一种偏法

```html
<div class="row">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="w-100"></div>
    <div class="col">Column</div>
    <div class="col">Column</div>
</div>
```

- 采用响应式方法

例如：

```html
<div class="row">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="w-100 d-none d-md-block"></div>
    <div class="col">Column</div>
    <div class="col">Column</div>
</div>
```

`<div class="w-100 d-none d-md-block"></div>`

d 是 display 的缩写

`.d-{style}`的意思是`display: {style};`

这一行意为：

> 当屏幕处于中等屏幕及以上时，用作分割的盒子显示，否则消失

---

## 排序 .order-{index}

- {index} 取值为 1 ~ 12，数越小代表位置越靠前（左）
- 没有添加该类的元素位置不变
- 可以结合相应式类名: ==.order-{breakpoint}-{index}==
- 将一个元素排在第一位 ==order-first==，未排序的也会靠后

例如：

```html
<div class="row">
    <div class="col order-3">1</div>
    <div class="col order-2">2</div>
    <div class="col order-xs-first">3</div>
    <div class="col order-1">4</div>
</div>
```

> 从左到右的顺序为 3 4 2 1

---

## 列偏移 .offset-{count}

- 经测试，{count} 取值为 1 ~ 11

- offset 可使某列向右偏移 {count} 列
- 可以结合相应式类名: ==.offset-{breakpoint}-{count}==
- 列偏移会带动右侧列一同偏移，直到被挤下该行

```html
<div class="row">
  <div class="col-3 offset-md-3">.col-md-3 .offset-md-3</div>
  <div class="col-3">.col-md-3</div>
</div>
```

---

## margin 偏移  .mr-auto / .ml-auto

- mr -> margin right | ml -> margin left

中文文档写得很模糊

> 你可以使用`.ml-auto`与`.mr-auto`来强制隔离两边的距离，实现类水平隔离的效果。

英文文档

> you can use margin utilities like `.mr-auto` to force sibling columns away from one another.

大概就是将元素与其他元素分离的意思

实际上表现出的效果为：

1. 该元素向两侧施加一个力，将两侧元素挤到边缘
2. 于其本身的效果是：mr-auto 元素靠左 | ml-auto 元素靠右

例如：

```html
<div class="row justify-content-around">
    <div class="col-md-1">col-md-1</div>
    <div class="col-md-1 mr-auto">col-md-1 mr-auto</div>
    <div class="col-md-1">col-md-1</div>
</div>
```

能够发现， mr-auto 将本该水平等间隔布局的三列挤到边缘，而该元素则紧靠左侧

---

## 列嵌套

例如：

```html
<div class="row">
    <div class="col-6">
        <div class="row justify-content-around">
            <div class="col-4">col-4</div>
            <div class="col-4">col-4</div>
        </div>
    </div>
    <div class="col-6">col-6</div>
</div>
```

这里理解比较简单，不赘述

