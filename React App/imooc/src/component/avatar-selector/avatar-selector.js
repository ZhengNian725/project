import React from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component{
    static propTypes = {
        selectAvater : PropTypes.func
    }
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v=>({
                icon:require(`../img/${v}.png`),
                text:v
            }))
        const gridHeader = this.state.icon?(
            <div>
                <span>已选择头像</span>
            <img src={this.state.icon} style={{width:20}}/>
            </div>)
            :<div>请选择头像</div>
        return( <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} columnNum={5}
                          onClick={elm=>{
                              this.setState(elm)
                              this.props.selectAvater(elm.text)
                          }}
                    />
                </List>
            </div>
        )
    }
}
export default AvatarSelector