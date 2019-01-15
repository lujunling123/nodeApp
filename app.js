const express = require("express");

const exphbs  = require('express-handlebars');

const path = require('path');

const mongoose = require('mongoose');

const session = require('express-session')

const flash = require('connect-flash');

const passport = require('passport')

const app = express();

// 引入路由
const aboutRouter = require('./routes/about');
const userRouter = require('./routes/user');

require('./config/passport')(passport)
const db = require('./config/databass')

// 模板引擎 handlebars 中间件
app.engine('handlebars', exphbs({
    defaultLayout: 'main'})
);

// 设置模板引擎后缀
app.set('view engine', 'handlebars');

// 连接数据mongoose数据库
// mongoose.connect("mongodb://localhost/node-app",{useNewUrlParser:true})
mongoose.connect(db.mongoURL,{useNewUrlParser:true})
    .then(()=>{
        console.log("Mongon connect Success....")
    })
    .catch((err)=>{
        console.log('Mongon connect Error:'+ err)
    })

// 使用静态文件
app.use(express.static(path.join(__dirname,'public')));

/*
 *   session & flash 弹出消息 中间件
 *   必须设置在router的前面，否则会无效
*/
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

// 配置全局变量 弹出消息
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next();
})

//使用引入的路由
app.use('/',aboutRouter);
app.use('/user',userRouter)

// 主页面路由
app.get("/", (req,res)=>{
    res.render('index')
})

const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log(`Server started on ${port}`)
// })
var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port
    console.log(`Server port on ${port}`)
})

// 使用nodemon 热部署
// 使用handlebars 模板引擎