const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy("/", {
        target: "http://150.158.113.204:8000/api/v1/gin-user-center",
        // target: "http://localhost:9080",
        changeOrigin: true,
        // pathRewrite: {
        //     '^/api': ''
        // }
    }))
}