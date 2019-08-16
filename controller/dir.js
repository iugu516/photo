var router = require('express').Router();
var file = require('../model/file.js');

//处理文件
router.get('/show',(req,res)=>{
    file.getDir(function(err,files){
        if(err) throw err;
        res.render('index',{dir:files});
    });
});

//创建文件页面
router.get('/toCreate',(req,res)=>{
    res.render('create');
});

//创建文件
router.post('/doCreate',(req,res)=>{
    var dirName = req.body.dirName;
    file.createDir('./uploads/'+dirName,(err)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

//删除文件
router.get('/delete/:dirName',(req,res)=>{
    var dirName = req.params.dirName;
    file.deleteDir('./uploads/'+dirName,(err)=>{
        if(err){
            console.log(err);
            res.send({status:1,msg:'删除失败'});
        }
        res.send({status:0,msg:'删除成功'});
    });
});

module.exports=router;