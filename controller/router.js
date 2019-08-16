var router = require('express').Router();
var dir = require('./dir.js');
var pic =require('./pic.js');
router.get('/',(req,res)=>{
    res.redirect('/dir/show');
});
router.use('/dir',dir);
router.use('/pic',pic);  
module.exports=router;