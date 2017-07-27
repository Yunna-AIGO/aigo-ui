# 国泰标准工程-前端

## 功能清单

- PC页面开发及其工程体系
- 无线开发及其工程体系
- 内置代理


## 如何运行本工程

* cnpm install
* 启动前端及后端mock环境: `sudo npm run mock`
* 启动前端及后端代理环境: `sudo npm run dev`
* 启动前端环境: `sudo npm run static`
* 将自己电脑变为代理服务器: `npm run proxy`, 代理端口8888

## 发布

> 在测试环境或者发布线上前, 必须对代码进行生产环境部署打包, 目前此过程需要开发手动完成, 未来会做成自动化

* linux: npm run build
* windows: npm run build-win

## 其他功能 - 代理服务

> 可以让你自己的电脑变为一个代理服务器, 主要用于移动端开发, 这样当手机通过电脑访问时, 即可共享电脑中的hosts绑定, 实现测试环境的切换

启用方法:

> npm run proxy


## 目录结构

```
|- common 临时目录, 目前存放了通用组件, 等国泰cnpmjs上线后, 会放到仓库中
|- dist 编译打包后文件的存放地方, 理论上本地开发环境中不应该生成此目录, 此目录的生成应该是在测试和生产环境编译打包时生成, 不过目前还未完成自动化部署流程, 暂时由开发阶段完成.
|- server 开发环境的静态服务器目录, 此目录对开发着透明, 日后会独立出来做成类库, 让大家不可见.
    |---- server-dev.js 开发环境脚本[数据请求会被转发到jboss], 启动命令为`sudo npm run dev`
    |---- server-mock.js 模拟数据环境脚本[数据请求不会转发boss,而是被mock模块处理], 启动命令为`sudo npm run mock`
    |---- server-static.js 纯静态服务器[无数据请求转发], 启动命令为`sudo npm run static`
|- mock 模拟数据请求, 用于jboss down掉时提前模拟数据进行前端开发
    |---- index.js 通过直接nodejs代码模拟数据
    |---- index.json 通过静态配置json模拟数据
    |---- src 模拟数据源
        |------ *.html 模拟html页面
        |------ *.json 模拟json数据
|--src.pc PC业务代码[重点]
    |---- actions 高级用法,暂时不对java开放
    |---- reducers 高级用法,暂时不对java开放
    |---- store 高级用法,暂时不对java开放
    |---- layout 页面布局
    |---- control 业务公共组件
    |---- screen 页面入口
        |------ index.js html中的js入口文件, 内涵页面路由
|--src.m 无线业务代码(钉钉,h5)
    |--- detail.js 详情页面
    |--- list.js 列表页面
.babelrc babel配置文件
package.json npm配置文件
README.md 文档说明
webpack.config.js 前端开发环境工程配置文件
webpack.production.config.js 前端工程生产环境配置文件
```

