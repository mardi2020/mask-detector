const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports  = function(app){
    app.use('/v1', createProxyMiddleware({target:'https://openapi.naver.com', changeOrigin:true})),
    app.use('/openapi', createProxyMiddleware({target:'http://openapi.data.go.kr', changeOrigin:true}))
}