var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 微信鉴权接口 */
router.get('/auth', function(req, res) {
    let {signature, timestamp, nonce, echostr} = req.query;
    let token = 'wechatwebapp20191215';
    let array = [timestamp, nonce, token];
    array.sort();
    let newStr = array.join('');
    let resultStr = sha1(newStr);
    if (resultStr === signature){
        res.set('Content-Type', 'text/plain')
        res.send(echostr)
    }else{
        res.send('auth error')
    }
});

module.exports = router;
