<h1 align='center'>一个在线教育应用</h1>

<p align='center'>
  <a href="https://github.com/facebook/react">
    <img src="https://camo.githubusercontent.com/edda976676ecfa3993474b1c1d7bcd120cfd2011/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d25374531352e362e312d677265656e2e737667" alt="TeamCity (simple build status)" data-canonical-src="https://img.shields.io/badge/react-%7E15.6.1-green.svg" style="max-width:100%;">
  </a>
  <a href="https://github.com/reactjs/redux">
    <img src="https://camo.githubusercontent.com/9450857857183c28a628e3986dd3753a0a76d5b5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656475782d253545332e372e322d677265656e2e737667" alt="Wercker" data-canonical-src="https://img.shields.io/badge/redux-%5E3.7.2-green.svg" style="max-width:100%;">
  </a>
  <a href="https://github.com/ReactTraining/react-router">
    <img src="https://camo.githubusercontent.com/b7a8d8cd8681575533ed05805f61c8f55a21f0f3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2d726f757465722d253545332e302e332d677265656e2e737667" alt="Travis" data-canonical-src="https://img.shields.io/badge/react--router-%5E3.0.3-green.svg" style="max-width:100%;">
  </a>
</p>

## 特点

高校师生在线学习平台，包含在线课程视频、高校信息、报考信息

## 技术栈

- [react](https://facebook.github.io/react/)
- [redux](https://github.com/reactjs/redux)
- [react-router](https://github.com/ReactTraining/react-router)
- [mock](https://github.com/nuysoft/Mock)
- [pace](https://github.com/HubSpot/pace)
- [whatwg-fetch](https://github.com/github/fetch)

## 项目构建

### 目录结构

```
.
├── README.md
├── build                             #构建生成目录
│   ├── bundle                        
│   └── index.html
├── package-lock.json
├── package.json
├── src                             #源代码文件
│   ├── action.js                   #action创建函数文件
│   ├── components                  #组件目录 *1
│   │   ├── layout
│   │   └── notify
│   ├── http.js                     #所有fetch请求  *2
│   ├── index.html                  #webpack生成html的模板 *3
│   ├── index.js                    #入口文件
│   ├── reducer.js                  #reducer  *4
│   ├── router.js                   #路由定义
│   ├── routes                      #路由对应的page目录
│   │   ├── App.js                  #入口文件 *5
│   │   ├── index                   #一个页面对应一个文件夹  *6
│   │   │   ├── Index.js
│   │   │   └── index.scss
│   │   └── login
│   │       ├── Login.js
│   │       └── login.scss
│   ├── static                      #静态文件夹
│   │   └── logo.jpg
│   ├── store.js                    #store创建文件  *7
│   └── utils                       #工具集
│       ├── config.js               #项目配置
│       ├── mock.js                 #本地mock数据
│       ├── pace.css                #首屏加载动画css
│       ├── pace.js                 #首屏加载动画js
│       └── theme.scss              #主题sass变量
├── webpack.config.js               #webpack开发配置文件
└── webpack.production.config.js    #webpack构建配置文件
```

### 目录结构说明
1. components 每一个组件对应一个文件夹，包含该组件js以及css，更小的组件也放在该文件夹下
2. 将所有的请求独立出来放在一个文件里，每个fetch请求封装成一个回调函数并export
3. 采用自定义html模板进行打包便于引用cdn等文件，或者其他自定义操作
4. 项目复杂的时候可以创建reducer文件夹，进一步拆分
5. 每个页面都是该组件的字组件，便于引入例如通知等全局组件
6. 每个页面对应一个文件夹，因为一个页面包含的组件较多，利于拆分
7. 独立出来store是便于在非组件的文件中操作reducer的store