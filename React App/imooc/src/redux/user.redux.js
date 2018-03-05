import axios from 'axios'
import {getRedirectPath} from './util'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT ='LOGOUT'
//初始化state
const initState = {
    redirectTo:'',
    msg:"",
    user:"",
    pws:"",
    type:"",
    avater:''
}
//reducer，监听action.type，type为REGISTER_SUCCESS
export function user(state=initState,action) {
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case LOGOUT:
            return{...initState,redirectTo:'/login'}
        default:return state
    }
}
//error执行函数
function errorMsg(msg) {
    return {msg,type:ERROR_MSG}
}
//success执行函数
function authSuccess(obj) {
    const {pws,...data} = obj
    return {type:AUTH_SUCCESS,payload:data}
}
export function loadData(userinfo) {
    return {type:LOAD_DATA,payload:userinfo}
}
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status==200&&res.data.code===0) {
                    console.log(data)
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function logoutSubmit() {
    return {type:LOGOUT}
}
export function login({user,pws}) {
    if(!user||!pws){
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
        ///请求/user/register
        axios.post('/user/login',{user,pws})
            .then(res=>{
                if(res.status==200&&res.data.code===0){
                        dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
//register页面注册点击事件，会将register页面state做参数传递
export function register({user,pws,repatedpws,type}) {
    if(!user||!pws||!type){
        return errorMsg('用户名密码必须输入')
    }
    if(pws!==repatedpws){
        return errorMsg('两次密码不一致')
    }
    //派发事件改变action.type
    return dispatch=>{
        ///请求/user/register
        axios.post('/user/register',{user,pws,type})
        .then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess({user,pws,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}