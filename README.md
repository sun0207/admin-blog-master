# admin-blog-master（Khari的博客-后台管理系统）

>基于react开发的Ant Design Pro中后台管理控制台脚手架搭建

- github：https://gitter.im/ant-design/ant-design-pro
- 官网：http://pro.ant.design/index-cn
- 预览：http://preview.pro.ant.design

具体使用查看官网，这里只讲怎么启动项目

###使用前准备

- 了解react技术栈
- 了解ant-design
- 确保已经成功启动了node后台api项目

###启动项目

**一、下载项目**

- git clone `git clone git@github.com:sun0207/admin-blog-master.git`
- 直接download

**二、进入项目，下载包**

命令行： `npm install`

**三、启动项目**

开发环境：`npm start` 或 `yarn start`

生产环境：`npm build`

完整效果请看：[http://admin.qianyaru.cn](http://admin.qianyaru.cn)


### 项目结构

```
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
```

### 源码地址与文档教程

**源码地址：**

- 前端展示： [https://github.com/sun0207/blog-master](https://github.com/sun0207/blog-master)

- 管理后台： [https://github.com/sun0207/admin-blog-master](https://github.com/sun0207/admin-blog-master)

- 后端api： [https://github.com/sun0207/api-blog-master](https://github.com/sun0207/api-blog-master)

**线上地址：**

- 前端展示： [https://www.qianyaru.cn](https://www.qianyaru.cn)

- 管理后台： [http://admin.qianyaru.cn](http://admin.qianyaru.cn)

- 后端api： [http://api.qianyaru.cn](http://api.qianyaru.cn)

### 最后
如果你觉得不错，欢迎 star 一下，特别感谢！

有问题可以扫下方二维码 **添加我的微信** 或 **关注我的公众号**，

关注公众号并回复 **1024** 获取项目源码和更多资源。

![https://www.qianyaru.cn](https://file.qianyaru.cn/qrsc9k4xhuv2z8wo73eimdbajl0pf6yt.png)
