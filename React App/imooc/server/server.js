const express = require("express")
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const User = model.getModel('user');
const Chat = model.getModel('chat')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
// User.remove({user:'Boss'},function (e,d) {
//
// })
io.on('connection',function (socket) {
    console.log('user login')
    socket.on('sendmsg',function (data) {
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
            io.emit('recvmsg',Object.assign(doc))
        })
        // io.emit('recvmsg',data)
    })
})
// 新建app

app.use(cookieParser());
//post请求显示数据体
app.use(bodyParser.json());
//引入userRouter
server.listen(8086,function(){
    app.use('/user',userRouter);
    console.log('Node app start at port 8086');
})