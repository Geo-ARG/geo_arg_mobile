import React from 'react'
import { Provider } from 'react-redux'
import { Navigator } from 'react-native';


import store from './store/storeConfig'
//Import from ./component/index
import Loading1 from './components/loading_screen/Loading1'
import Loading2 from './components/loading_screen/Loading2'
import Home from './components/home_screen'
import Login from './components/loginform'
import GameEvent from './components/gameEvents'

export default class AppNavigator extends React.Component {
  sceneRender(route, navigator){
    switch(route.page){
      case 'loading1':
        return <Loading1 navigator={navigator}/>
      case 'loading2':
        return <Loading2 navigator={navigator}/>
      case 'login':
        return <Login navigator={navigator}/>
      case 'home':
        return <Home navigator={navigator}/>
      case 'game':
        return <GameEvent navigator={navigator}/>
      default:
        return <Loading1 navigator={navigator}/>
    }
  }
  render(){
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{page: 'loading1'}}
          renderScene= {this.sceneRender.bind(this)}
        />
      </Provider>
    )
  }
}
