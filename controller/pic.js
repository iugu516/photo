var router = require('express').Router();
var file = require('../model/file.js');
var fd = require('formidable');
var sd = require('silly-datetime');

//展示图片
router.get('/show',(req,res)=>{
    //获取被点击文件名称
    var dirName = req.query.dirName;
    file.getPic('./uploads/'+dirName,(err,files)=>{
        if(err){
            console.log(err);
            res.send('获取错误');
        }
        res.render('show',{pic:files,dirName:dirName});
    });
});

//删除图片
router.get('/delete',(req,res)=>{
    var picName = req.query.picName;
    var dirName = req.query.dirName;
    var path = './uploads/'+dirName+'/'+picName;
    file.deletePic(path,(err)=>{
        if(err){
            console.log(err);
            res.send('删除错误');
        }
        res.redirect('/pic/show?dirName='+dirName);
    });
});

//跳转上传页面
router.get('/toUpload',(req,res)=>{
    file.getDir((err,files)=>{
        if(err) throw err;
        res.render('upload',{dir:files});
    });
});

//接收上传图片
router.post('/doUpload',(req,res)=>{
     // 获取表单对象
    var form = new fd.IncomingForm();
    // 设置图片上传的临时保存位置
    form.uploadDir='./temp';
    form.parse(req,(err,fields,files)=>{
        if(err){
            console.log(err);
            res.send('上传失败，稍后再试');
            return;
        }
        // console.log(fields);
        // console.log(files);
        var dirName = fields.dirName; // 文件夹名称
        var pic = files.pic; // 图片
        // 旧路径
        var oldPath = pic.path;
        // 旧名称(取后缀名用)
        var oldName = pic.name;
        var arr = oldName.split('.');
        // console.log(arr);
        var ext = arr[arr.length-1]; // 后缀名
        // 设置时间戳 HHmmssXX.jpg 防止上传的名字以一样进行区分
        var rand = parseInt(Math.random()*99 + 1);
        var newName = sd.format(new Date(),'HHmmss')+rand+'.'+ext;
        // 新路径 ./uploads/选择的文件夹/文件名
        var newPath = './uploads/'+dirName+'/'+newName;
        file.upload(oldPath,newPath,(err)=>{
            if(err){
                console.log(err);
                res.send('上传失败，稍后再试');
                return ;
            }
            res.redirect('/pic/show?dirName='+dirName);
        });
    });
});
module.exports=router;