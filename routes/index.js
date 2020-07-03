var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 微信鉴权接口 */
router.get('/auth', function(req, res) {
  res.send('wechat authentication interface')
});

module.exports = router;
