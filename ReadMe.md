## 搭建Express开发目录

1. 安装express
`npm install -g express-generator`

2. 创建express目录
`express --no-view wechat-server`

3. 安装express项目依赖包
`npm i`

4. 启动express项目
`npm run start`

## Express代码结构及作用
1. bin/www文件夹里定义启动端口和服务,基本上不需要修改

2. public存放静态资源

3. node_modules存放express项目的依赖包

4. routes是路由文件

## Mongodb操作
1. 下载安装mongodb

2. 使用mongoose实现express与mongodb数据库连接
`npm i mongoose`

3. 使用mongoose.connect()连接数据库

4. 使用mongoose.Schema和mongoose.model创建数据模型对象

5. 通过实例化数据模型对象，将post请求上传的数据存储到数据库

## git部署
1. GitHub建立仓库
2. SAE建立仓库
3. 将本地仓库同时同步至GitHub与SAE两个仓库
`git add .`
`git commit -m "first commit"`
`git remote add origin https://github.com/benbendemo/qfedu-wechat.git`
`git remote add sae https://git.sinacloud.com/qfeduwechat`
<!-- 使用`git remote -v`可以看到本地对应两个远程仓库 -->
<!-- 分别使用下述命令将代码提交至对应仓库 -->
`git push -u origin master`
`git push -u origin sae`
4. 部署sae成功后查看网页
http://qfeduwechat.applinzi.com

## JS-SDK鉴权流程
按照微信公众号SDK开发文档要求，让微信服务器知道SAE服务器是开发者认可的服务器，以便
后续实现微信公众号与SAE之间进行通信.

### 步骤一：绑定域名
1. 进入“设置”->“公众号设置”->“功能设置”页面，配置JS接口安全域名
> 先下载MP_verify_priE93RCEqEaaLXq.txt文件，放在SAE分配域名的根目录下，确保可以
> 在浏览器里直接通过域名路径+MP_verify_priE93RCEqEaaLXq.txt文件方式直接访问

2. IP白名单配置
> 进入“设置”->“安全中心”->“IP白名单”里填写与JS-SDK鉴权相关的所有IP地址
> 新浪SAE相关IP地址位置：支持中信->文档中心->入口与出口IP->外网访问出口IP列表

### 步骤二：引入JS文件
> 在需要调用JS接口的页面引入JS文件
> js-sdk url: http://res.wx.qq.com/open/js/jweixin-1.6.0.js
> 除了引入js-sdk之外，通常还需要引入在线的axios文件
> axios url: https://cdn.bootcss.com/axios/0.19.2/axios.min.js

### 步骤三：通过config接口注入权限验证配置
> 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
> 配置项如下：
```
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
```

### 步骤四：进行服务器配置
> 进入“开发”->“基本配置”->“服务器配置”页面，启用SAE服务器
安装sha1模块，计算sha1签名结果
`npm i sha1`