import React from 'react'
import axios from 'axios'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import {getUserList} from "../../redux/chatuser.redux"
import {connect} from 'react-redux'
import UserCard from '../usercard/usercard'
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Genius extends React.Component{
    componentDidMount(){
        this.props.getUserList('boss')
    }
    render() {
        return (
            <div style={{zIndex:1}}>
                <UserCard userlist={this.props.userlist}
                          style={{zIndex:1}}
                ></UserCard>
            </div>
            )
    }
}
export default Genius