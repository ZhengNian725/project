import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import io from 'socket.io-client'
import {getChatId} from "../../redux/util";
import Charts from '../echarts/echarts'
const socket = io('ws://localhost:8086')
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)

class Chat extends React.Component{
    constructor(){
        super()
        this.state = {text:'',msg:[]}
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            console.log(this.props)
            console.log(this.props.chat.item+"one")
            if(this.props.chat.item==0){
                console.log('start recvMsg')
                this.props.recvMsg()
            }
            this.props.getMsgList()
            this.props.chat.item += 1
            console.log(this.props.chat.item+"two")
        }
        console.log(this.props)
    }
    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    fixCarousel(){
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text:'',
            showEmoji:false
        })
        console.log(this.props)
    }
    render(){
        const emoji = ' 😄 😃 😀 😊 😉 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 👂 👀 👃 👅 👄 👍 👎 👌 👊 ✊ ✌ 👋 ✋ 👐 👆 👇 👉 👈 🙌 🙏 ☝ 👏 💪 🚶 🏃 💃 👫 👪 👬 👭 💏 💑 👯 🙆 🙅 💁 🙋 💆 💇 💅 👰 🙎 🙍 🙇 🎩 👑 👒 👟 👞 👡 👠 👢 👕 👔 👚 👗 🎽 👖 👘 👙 💼 👜 👝 👛 👓 🎀 🌂 💄 💛 💙 💜 💚 ❤ 💔 💗 💓 💕 💖 💞 💘 💌 💋 💍 💎 👤 👥 💬 👣 💭 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}))
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        if(!users[userid]){
            return null
        }
        return (
                <div>
                    <div>
                        <NavBar
                            mode='dark'
                            icon={<Icon type='left'/>}
                            onLeftClick={
                                ()=>{
                                    this.props.history.goBack()
                                }
                            }
                        >
                            {users[userid].name}
                        </NavBar>

                        {chatmsg.map(v=>{
                            const avater = require(`../img/${users[v.from].avater}.png`)
                            return v.from == userid?(
                                <List>
                                    <Item
                                        thumb={avater}
                                    >
                                        {v.content}
                                    </Item>
                                </List>
                            ):(
                                <List >
                                    <Item
                                        extra={<img src={avater} />}
                                        className='chat-me'
                                    >
                                        {v.content}
                                    </Item>
                                </List>
                            )
                        })}
                    </div>
                    <div className='stick-footer'>
                        <List>
                            <InputItem
                                placeholder='请输入'
                                value={this.state.text}
                                onChange={v=>{
                                    this.setState({text:v})
                                }}
                                extra={
                                    <div>
                                        <span
                                            style={{marginRight:15}}
                                            onClick={()=>{
                                                this.setState({showEmoji:!this.state.showEmoji})
                                                this.fixCarousel()
                                            }}
                                        >😄</span>
                                        <span onClick={()=>this.handleSubmit() }>发送</span>
                                    </div>
                                }
                            >
                                信息
                            </InputItem>
                        </List>
                        {this.state.showEmoji?<Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el=>{
                                this.setState({
                                    text:this.state.text+el.text
                                })
                            }}
                        />:null}
                    </div>
                    {/*<Charts></Charts>*/}
                </div>
        )
    }
}
export default Chat