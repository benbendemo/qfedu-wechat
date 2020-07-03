const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/qfedu-wechat', 
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
