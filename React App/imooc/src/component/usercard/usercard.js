import React from 'react'
import propTypes from 'prop-types'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import {getUserList} from "../../redux/chatuser.redux"
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
@withRouter
@connect(
    state=>state.chatuser,
    {getUserList}
)
class UserCard extends React.Component{
    componentDidMount(){

    }
    static propTypes = {
       userlist: propTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
        console.log('handleclick')
    }
    render(){
        const Header = Card.Header
        const Body = Card.Body
        return(
            <div style={{zIndex:1}}>
                <WingBlank style={{zIndex:1}}>
                    <WhiteSpace></WhiteSpace>
                    {this.props.userlist.map(v=>(
                        v.avater?(
                            <div key={v._id}
                                 style={{zIndex:1}}
                            >
                                <Card
                                    onClick={()=>this.handleClick(v)}
                                    style={{zIndex:100}}
                                >
                                    <Header
                                        title={v.user}
                                        thumb={require(`../img/${v.avater}.png`)}
                                        extra={<span>{v.title}</span>}
                                    >
                                    </Header>
                                    <Body>
                                    {v.type=='boss'?<div>公司:{v.company}</div>:null}
                                    {v.desc.split('\n').map(d=>(
                                        <div key={d}>{d}</div>
                                    ))}
                                    {v.type=='boss'?<div>薪资:{v.money}</div>:null}
                                    </Body>

                                </Card>
                                <WhiteSpace></WhiteSpace>
                            </div>
                        ):null

                    ))}

                </WingBlank>
            </div>
        )
    }
}
export default UserCard