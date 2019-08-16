//操作文件
var fs= require('fs');
var rf = require('rimraf');

exports.getDir=function(callback){
    fs.readdir('./uploads',(err,files)=>{
        callback(err,files);
    });
};

exports.createDir=function(dirName,callback){
    fs.mkdir(dirName,(err)=>{
        callback(err);
    });
};

exports.deleteDir=function(dirName,callback){
    rf(dirName,(err)=>{
        callback(err);
    });
};

exports.getPic=function(dirName,callback){
    fs.readdir(dirName,(err,files)=>{
        callback(err,files);
    });
};

exports.deletePic=function(path,callback){
    fs.unlink(path,(err)=>{
        callback(err);
    });
};

exports.upload=function(oldPath,newPath,callback){
    fs.rename(oldPath,newPath,(err)=>{
        callback(err);
    });
};
