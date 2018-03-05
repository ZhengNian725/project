import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import imoocFrom from '../../component/imooc-from/imooc-from'
// function hello() {
//     console.log('hello imooc')
// }
// function WrapperHello(fn) {
//     return function () {
//         console.log('befor say hello')
//         fn()
//         console.log('after say hello')
//     }
// }
// hello = WrapperHello(hello)
// hello()
function WrapperHello(Componen){
    class WrapComp extends React.Component{
        render(){
            return (
                <div>
                    <p>这是高阶组件特有的元素</p>
                    <Componen {...this.props}></Componen>
                </div>
            )
        }
    }
    return WrapComp
}
class Hello extends React.Component{
    render(){
        return(
            <h2>Hello</h2>
        )
    }
}
@connect(
    state=>state.user,
    {login}
)
@imoocFrom
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            uesr:"",
            pws:""
        }
        this.regitster=this.regitster.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    regitster(){
        // console.log(this.props.history)
        this.props.history.push('./register')

    }
    render(){
        return(
            <div>
                {this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem
                            onChange={v=>this.props.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                            onChange={v=>this.props.handleChange('pws',v)}
                            type='password'
                        >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary'
                        onClick={this.handleLogin}
                    >登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.regitster} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login
