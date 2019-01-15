const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = express.Router()

const {authenticate} = require('../helpers/auth')

// body-parser 中间件
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// methodOverride 编辑 删除数据库 中间件
router.use(methodOverride('_method'))

// 映入模型
require('../models/aboutA')

const About = mongoose.model('about')

router.get("/about", (req,res)=>{
    res.render('about')
})

router.get("/abouts",authenticate, (req,res)=>{
    // 模糊查询
    // About.find({phone:{ $regex: '.*' + req.user.phone + '.*' }}).sort({date:'desc'}).then(about=>{
    About.find({phone:req.user.phone}).sort({date:'desc'}).then(about=>{
        res.render('about/index',{abouts: about})
    })
})

router.get("/about/add",authenticate, (req,res)=>{
    res.render('about/aboutAdd')
})

router.post("/add", urlencodedParser, (req,res)=>{
    let errors = [];
    if (!req.body.email) {
        errors.push({text: '请输入'})
        res.render('about/aboutAdd',{
            errors: errors
        })
    } else {
        const user = {
            phone: req.user.phone,
            email:req.body.email,
            text:req.body.text,
            selectA:req.body.selectA
        }
        new About(user).save().then(abouts=>{
            res.redirect('/abouts')
        }).catch(res=>{
            console.log(res)
        })
    }
})

// 进入编辑页面
router.get('/about/edit/:id',authenticate,(req,res)=>{
    About.findOne({_id:req.params.id}).then(about =>{
        if(about.phone!==req.user.phone){
            req.flash('error_msg','非法操作！')
            res.redirect('/abouts')
        }else {
            res.render('about/aboutEdit', {abouts:about})
        }
    })
})

// 编辑操作
router.put("/edit/:id",urlencodedParser, (req,res)=>{
    About.findOne({_id:req.params.id})
        .then(about =>{
        about.email=req.body.email;
        about.text= req.body.text;
        about.selectA= req.body.selectA;
        about.save()
            .then(about=>{
                res.redirect('/abouts')
        })
    })
})

// 删除
router.delete("/abouts/:id",authenticate, (req,res)=>{
    About.remove({_id:req.params.id})
        .then(() =>{
            req.flash('success_msg', '删除成功')
            res.redirect('/abouts')
        })
})

module.exports = router