var {appID, appSecret} = require('../config')
var axios = require('axios')
var sha1 = require('sha1')

async function getTicket(){
    // https://api.weixin.qq.com/cgi-bin/token?
    // grant_type=client_credential&appid=APPID&secret=APPSECRET

    let tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}'
    let tokenData = await axios.get(tokenUrl);
    console.log('token', tokenData);
    // Get access_token from wechat server
    let access_token = tokenData.data.access_token;

    // https://api.weixin.qq.com/cgi-bin/ticket/getticket?
    // access_token=ACCESS_TOKEN&type=jsapi
    
    // Get jsapi_ticket from wechat server
    let ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi'
    let ticketData = await axios.get(ticketUrl)
    console.log('ticket', ticketData);
    return ticketData.data.ticket
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

    let ticket = await getTicket()
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

module.exports = sign
