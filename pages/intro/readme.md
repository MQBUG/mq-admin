### mq-admin

#### 介绍

这套模板是我在学习前端技术（vue.js和elementui）时搞的，我也是刚入门前端。这里没有使用到vue的脚手架，只是在页面直接引入vue.js进行页面开发，相对于以前用过的layui等框架，这样在原生html页面进行开发还是比较方便的。这套模板在今年2月份学习时完成，打算发出来给有需要的学生（我也是），在做一些javaweb课设或php课设等有需要的话可以使用这个模板进行课设开发。

这套模板适合学生做课设开发、与一些个人的学习项目，本模板主要提供的是后台管理系统的大概整体布局，以及动态的导航栏，其他具体的页面需要开发时自己去开发。

这里推荐使用element-ui框架，样式比较好看，功能齐全，本系统下载了element-ui、axios、jq、vue、layer的离线包，在需要的页面引入对应的js与css即可使用（类似官网的cdn引入）。不需要npm安装。

这个模板系统跟原来的基础html页面开发没有什么区别，都是在head引入对应的js、css再进行开发即可，适合学习使用的。具体的应用可以看看官方文档的使用方法，里面没有什么是我封装的方法，参考对应框架的官方文档即可。

这个后续会做一个脚手架的版本，有空再说吧（狗头）

#### 引入的其他框架配置 

1. jQuery 3.4.1
2. element 2.13.0
3. layer 3.1.1
4. vue 2.6.10
5. axios   
6. mditor



#### 文件夹说明

| 文件夹名字 |         说明          |
| :--------: | :-------------------: |
|    css     |      css样式文件      |
|    img     |       图片文件        |
|     js     |        js文件         |
|    lib     | 系统配置 其他框架文件 |
|   pages    |  需要显示的html页面   |

#### web.json配置说明

系统配置路径 lib/web

css、js文件请根据自己的需求去改动

web.json 文件为系统的配置文件，可以设置左边导航栏的底色、字体底色、高亮字体颜色

**web.json 文件里的 navs **  数组为系统的左边导航栏内容，具体的参数看下面的导航栏参数说明，其中id得自己设置，不一样即可，暂时只支持两级导航



#### 导航栏参数说明 

​		1、"title": "控制台",  				        导航栏标题
​		2、"icon": "el-icon-setting",		    图标样式 使用element图标库 有数量限制不能自定义
​		3、"href": "#",						          链接地址 为# 时不会跳转(有子选项时设置)
​		4、"id":"2",						                唯一标识id 暂时只能自定义，每个都需不一样
​		5、"children"                   	    		 存放二级导航栏数组



#### 引入使用lib文件夹下面的框架 

引入css、js文件

由于使用的是在html页面直接引入的方法，比较传统的引入方法，没有使用到js的模块化（学习中）。所以也没封装统一其来，各框架的使用方法参照对应的官方文档即可

所以第一种方式引入为：

```html
<link rel="stylesheet" href="./login.css" />
<link rel="stylesheet" href="../../lib/element2.13.0/lib-master/theme-chalk/index.css" />
<script src="../../lib/vue/vue.js" type="text/javascript" charset="utf-8"></script>
<script src="../../lib/jquery-3.4.1/jquery-3.4.1.js" type="text/javascript" charset="utf-8"></script>
<script src="../../lib/element2.13.0/lib-master/index.js" type="text/javascript" charset="utf-8"></script>
<script src="../../lib/layer/layer.js"></script>
<script src="../../lib/axios/dist/axios.js"></script>
```

这种方式看起来比较多，可以按需引入



第二种为：

引入在js文件夹下面的 

mqadmin.js或mqpages.js ，两者相对路径不一样，可看自己项目需要修改（这种方式暂时不知道好不好。。

```html
<link rel="stylesheet" href="./index.css" />
<link rel="stylesheet" href="../../css/mqpages.css" />
<script src="../../js/mqpages.js"></script>
```



有想法的可以跟我交流，刚入门前端，需要各位大佬的意见