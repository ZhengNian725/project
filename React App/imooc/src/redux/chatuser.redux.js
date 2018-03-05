import axios from "axios";

const USER_LIST = 'USER_LIST'
const lnitState = {
    userlist:[]
}
export function chatuser(state=lnitState,action) {
    switch (action.type){
        case USER_LIST:
            return {...state,userlist:action.payload}
        default:
            return state
    }
}
function userList(data) {
    return {type:USER_LIST,payload:data}
}
export function getUserList(type) {
    return dispatch=>{
        axios.get('/user/list?type='+type)
            .then(res=>{
                if(res.data.code==0){
                    console.log(res.data)
                    dispatch(userList(res.data.data))
                }
            })
    }
}