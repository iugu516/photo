var express = require('express');
var bdParser = require('body-parser');
var router = require('./controller/router.js');
var app = express();
app.listen(4000);
// 设置视图模板引擎
app.set('view engine','ejs');
// 设置根目录
app.use('/',express.static('./public'));
app.use('/',express.static('./uploads'));
// 设置请求解析方式
app.use(bdParser.urlencoded({extended:true}));

app.use(router);