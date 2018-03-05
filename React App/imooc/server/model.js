const mongoose = require('mongoose')
//引入mongoose
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
//链接mongodb
mongoose.connect(DB_URL);
//建立数据模型
const models = {
    //用户名密码/完善信息
    user:{
        'user':{'type':String,'require':true},
        'pws':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        //头像
        'avater':{'type':String},
        //个人职位简介
        'desc':{'type':String},
        //职位需求
        'title':{'type':String},
        //如果你是boss还有两个字段
        //公司名称
        'company':{'type':String},
        //薪酬
        'money':{'type':String}
    },
    //聊天数据
    chat:{
        'chatid':{'type':String,'require':true},
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        'read':{'type':Boolean,'default':false},
        'content':{'type':String,'require':true,'default':''},
        'create_time':{'type':Number,'default':new Date().getTime()}
    }
}
//遍历models得到数据
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
//抛出getModel方法，获取数据库中存储的用户名

module.exports = {
    getModel:function (name) {
        return mongoose.model(name);
    }
}