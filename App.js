import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './Navigation/Navigator';



const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  )
}

export default App