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
