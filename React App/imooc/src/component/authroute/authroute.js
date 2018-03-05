import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        //获取用户信息
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname)>-1){
            return null
        }
        //非注册登陆页面会请求user/info页面code数据，code！等于0则跳转/login页面
        axios.get('/user/info')
            .then(res=>{
                if(res.data.code==0){
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/login')
                }
                console.log(res.data)
            })
    }
    render(){
        return null
    }
}
export default AuthRoute