
var mongoose = require('mongoose')

// 定义表结构
var userSchema = new mongoose.Schema({
    username: String,
    password: String
})

// 定义数据模型
var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
