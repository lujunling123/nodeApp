const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//加载model
const userInfo = mongoose.model('user')

module.exports = (passport) =>{
    passport.use(new LocalStrategy(
        {usernameField: 'phone' ,passwordField: 'pass'},
        function (phone, pass, done){
            userInfo.findOne({phone: phone})
                .then((user)=>{
                    if (user) {
                        bcrypt.compare(pass, user.pass, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null,user)
                            } else {
                                return done(null,false,{message:'您输入的密码有误'})
                            }
                        });
                    } else {
                        return done(null,false,{message:'手机号未注册，请先注册！'})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userInfo.findById(id, function (err, user) {
            done(err, user);
        });
    });
}