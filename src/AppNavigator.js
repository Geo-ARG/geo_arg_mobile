import React from 'react'
import { Provider } from 'react-redux'
import { Navigator } from 'react-native';

import store from './store/storeConfig'

import { Loading1, Loading2, Home, Login, GameEvent, ListEvent } from './components'

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
      case 'event':
        return <ListEvent navigator={navigator}/>
      default:
        return <Loading1 navigator={navigator}/>
    }
  }
  render(){
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{page: 'event'}}
          renderScene= {this.sceneRender.bind(this)}
        />
      </Provider>
    )
  }
}
