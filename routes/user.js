const express = require("express");

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const router = express.Router()

const passport = require('passport')

// body-parser 中间件
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// 引入数据库模型
require('../models/userInfo')
// 创建数据库实列
const userInfo = mongoose.model('user')

// user login & register
router.get("/login", (req,res)=>{
    res.render('user/login')
})

router.get("/register", (req,res)=>{
    res.render('user/register')
})

router.post('/login', urlencodedParser, (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login' ,
        failureFlash:true
    })(req, res, next)
})

router.post('/register', urlencodedParser, (req, res)=>{
    let errors = [];
    userInfo.findOne({phone:req.body.phone})
        .then (item=>{
            if (item) {
                errors.push({text: '该号码已被注册！'})
                res.render('user/register',{
                    abouts: req.body,
                    errors: errors
                })
            } else {
                if (req.body.pass.length<4 || req.body.pass.length>=18) {
                    errors.push({text: '密码的长度不能小于四位，且最多18位！'})
                }
                if (req.body.pass!==req.body.apass) {
                    errors.push({text: '两次输入的密码不同，请重新输入！'})
                }
                if (errors.length>0){
                    res.render('user/register',{
                        abouts: req.body,
                        errors: errors
                    })
                } else {
                    const user = new userInfo({
                        phone:req.body.phone,
                        pass:req.body.pass,
                    })
                    bcrypt.genSalt(10, (err, salt)=> {
                        bcrypt.hash(user.pass, salt, (err, hash) => {
                            if (err) throw err;
                            user.pass = hash;
                            user.save()
                                .then(item=>{
                                    req.flash('success_msg', '注册成功！')
                                    res.redirect('/')
                                })
                                .catch(err=>{
                                    req.flash('error_msg', '注册失败！')
                                    res.render('user/register')
                                })
                        });
                    });
                }
            }
        })
})

router.get("/logout", (req,res)=>{
    req.logout();
    req.flash('success_msg','退出成功')
    res.redirect('/user/login')
})

module.exports = router