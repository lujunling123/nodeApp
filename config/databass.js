if (process.env.NODE_ENV == 'production'){
    module.exports = {mongoURL: "mongodb://lujunling:ljlabc123@ds155614.mlab.com:55614/node-app-prod"}
} else {
    module.exports = {mongoURL: "mongodb://localhost/node-app"}
}