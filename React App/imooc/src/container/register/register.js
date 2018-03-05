import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
constructor(props){
    super(props)
    this.state = {
        type:'genius',
        user:'',
        pws:'',
        repatedpws:''
    }
    this.handleRegister = this.handleRegister.bind(this)
}
//监听change事件，input发生改变时，赋值给新的state
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    //注册点击事件执行user.redux.js页面事件
    handleRegister(){
    console.log(this.props)
        this.props.register(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem
                            onChange={v=>this.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                            onChange={v=>this.handleChange('pws',v)}
                            type='password'
                        >密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                            onChange={v=>this.handleChange('repatedpws',v)}
                            type='password'
                        >确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem checked={this.state.type == 'genius'}
                            onChange={v=>this.handleChange('type','genius')}
                        >牛人</RadioItem>
                        <RadioItem checked={this.state.type == 'boss'}
                            onChange={v=>this.handleChange('type','boss')}
                        >BOSS</RadioItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type='primary'
                            onClick={this.handleRegister}
                        >注册</Button>
                    </List>
                    <WhiteSpace></WhiteSpace>
                </WingBlank>
            </div>
        )
    }
}
export default Register