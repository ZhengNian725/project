export function getRedirectPath({type,avater}) {
    //根据用户信息 返回跳转地址
    let url = (type==='boss')?'/boss':'/genius'
    if(!avater){
        url+='info'
    }
    return url
}
export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_')
}