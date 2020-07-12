
var mongoose = require('mongoose')

// 定义表结构
var ticketSchema = new mongoose.Schema({
    access_token: String,
    token_time: String, // 获取token的当前时间
    ticket: String,
    ticket_time: String // 获取ticket的当前时间

})

// 定义数据模型
var ticketModel = mongoose.model('ticketModel', ticketSchema);

module.exports = ticketModel;
