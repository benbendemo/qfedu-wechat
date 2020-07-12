var {appID, appSecret} = require('../config')
var axios = require('axios')
var sha1 = require('sha1')
var ticketModel = require('../db/models/ticket')

async function getTicket(){

    let ticket_data = await ticketModel.find()
    let access_token = ''
    let ticket = ''
    if (ticket_data.length > 0){
        // 从数据库或缓存中获取access_token和ticket
        let deltaTime = new Date().getTime() - ticket_data[0].token_time
        if (deltaTime > 7000000){
            // 间隔时间大于7000s，说明数据库里存放的access_token和ticket已经过期
            // 从微信服务器获取新的access_token和ticket，并更新数据库里的记录
            await getTicketFromWechatServer()
            let {_id} = ticket_data[0]
            let time = new Date().getTime()
            await ticketModel.update({_id},{
                access_token,
                token_time: time,
                ticket,
                ticket_time: time
            })
        }else{
            access_token = ticket_data[0].access_token
            ticket = ticket_data[0].ticket
        }
    }else{
        // 访问微信服务器获取access_token和ticket，如果是第一次获取记录，
        // 将获取的记录存储到数据库
        await getTicketFromWechatServer()
        let time = new Date().getTime()
        await new ticketModel({
            access_token,
            token_time: time,
            ticket,
            ticket_time: time
        }).save()
    }
    return {
        access_token,
        ticket
    }
}

async function getTicketFromWechatServer(){
    // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

    let tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}'
    let tokenData = await axios.get(tokenUrl);
    console.log('tokenData', tokenData);
    // Get access_token from wechat server
    access_token = tokenData.data.access_token;

    // https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
    
    // Get jsapi_ticket from wechat server
    let ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi'
    let ticketData = await axios.get(ticketUrl)
    console.log('ticketData', ticketData);
    ticket = ticketData.data.ticket
}

var createNonceStr = function(){
    // 生成随机字符串
    return Math.random().toString(36).substr(2,15);
}

var createTimestamp = function(){
    // 生成时间戳
    return parseInt(new Date().getTime() / 1000) + ''
}

var processSignData = function(obj) {
    // 处理要生成signature签名的数据格式的方法
    var keys = Object.keys(obj)
    keys = keys.sort()
    var newObj = {}
    keys.forEach((key)=>{
        newObj[key] = obj[key]
    })
    var string = ''
    for(var k in newObj){
        string = '&' + k + '=' + newObj[k]
    }
    string = string.substr(1)
    return string
}

var sign = async function(url){
    // 生成signature签名

    let {ticket} = await getTicket()
    var obj = {
        jsapiTicket: ticket,
        nonceStr: createNonceStr(),
        timeStamp: createTimestamp(),
        url
    }
    var str = processSignData(obj)
    var signature = sha1(str)
    obj.signature = signature
    return obj
    // 签名生成规则如下：
    // 1. 参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp
    // （时间戳）, url（当前网页的URL，不包含#及其后面部分）
    // 2. 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）
    // 3. 使用URL键值对格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意
    // 的是所有参数名均为小写字符。
    // 4. 对string1作sha1加密，字段名和字段值都采用原始值，不进行URL转义
}

module.exports = {
    sign,
    getTicket
}
