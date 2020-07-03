var express = require('express');
var router = express.Router();
var userModel = require('../db/models/user');

/* GET postman post requests. */
router.post('/reg', function(req, res, next) {
    console.log(req.body);
    let {user, pwd} = req.body;
    //   使用mongoose将数据存储到数据库
    new userModel({
        username: user,
        password: pwd
    }).save().then(()=>{
        res.send({
            code: 1,
            msg: "register success"
        })
    })
    // res.send('respond postman response');
});

module.exports = router;
