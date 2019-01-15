## 使用node.js + mongon 写的一个简单的系统项目
#### 克隆项目 git clone https://github.com/lujunling123/nodeApp.git
#### 进入到当前项目 cd nodeApp
#### 安装依赖 npm install 
#### 启动服务 nodemon
#### 本地打开 http://localhost:5000 确保安装mongon 数据库以及打开数据库服务

## windows 安装mongon数据库 [点击查看安装方法](https://github.com/lujunling123/nodeApp/blob/master/Windows%E5%AE%89%E8%A3%85mongodb.pdf)
#### 安装成功后 进入到安装目录\bin\ 点击mongod.exe 启动服务
#### 使用 进入到安装目录\bin\ 点击mongo.exe  便可进行数据库操作命令
#### show dbs 查看数据库
#### use xxx  进入到xxx数据库
#### show collections 显示表操作
#### bd.tables.find() 查询表操作

## 所安装的依赖
#### nodemon 热部署
#### express-handlebars 模板引擎
#### mongoose mongon数据库
#### body-parser
#### express-session
#### connect-flash
#### npm install --save bcrypt 密码加密
#### npm install passport-local
#### npm install passport
