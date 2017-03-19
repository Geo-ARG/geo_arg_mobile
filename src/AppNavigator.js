import React from 'react'
import { Provider } from 'react-redux'
import { Navigator } from 'react-native';


import store from './store/storeConfig'
import Loading1 from './components/loading_screen/Loading1'
import Loading2 from './components/loading_screen/Loading2'
import Home from './components/home_screen'
import Login from './components/loginform'

export default class AppNavigator extends React.Component {
  render(){
    <Provider store={store}>
      <Navigator
        initialRoute={{page: 'loading1'}}
        renderScene={(route, navigator)=>{
        switch(route.page){
          case 'loading1':
            return <Loading1 navigator={navigator} route={route}/>
          case 'loading2':
            return <Loading2 navigator={navigator} route={route}/>
          case 'login':
            return <Login navigator={navigator} route={route}/>
          case 'home':
            return <Home navigator={navigator} route={route}/>
          default:
            return <Loading1 navigator={navigator} route={route}/>
        }
      }}
      />
    </Provider>
  }
}
