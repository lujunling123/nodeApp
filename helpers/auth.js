// 路由守卫
module.exports = {
    authenticate : (req,res,next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg','请先登录！')
        res.redirect('/user/login')
    }
}