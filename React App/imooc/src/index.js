import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import './config'
import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './reducer'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import './index.css'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
const store = createStore(reducers,compose(
        applyMiddleware(thunk)
))
    ReactDOM.render(
        (<Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/geniusinfo' component={GeniusInfo}></Route>
                        <Route path='/Login' component={Login}>
                        </Route>
                        <Route path='/Register' component={Register}></Route>
                        <Route path='/chat/:user' component={Chat}></Route>
                        <Route component={Dashboard}>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>),
        document.getElementById('root')
    )