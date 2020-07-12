const mongoose = require('mongoose')
var {mongoIp} = require('../config')
mongoose.connect('mongodb://${mongoIp}/qfedu-wechat', 
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err)=>{
    if(err){
        console.log('mongodb connect failed')
    }else{
        console.log('mongodb connect success')
    }
})

mongoose.connection.once('open',() => {
    console.log('connect to mongodb success.')
});
