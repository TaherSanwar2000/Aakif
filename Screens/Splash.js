import {View, StatusBar} from 'react-native';
import React, { useEffect } from 'react';
import Logo from '../SVG/Logo';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Splash = () => {
  const navigation = useNavigation();

  const CheckForOnBoarding = async () => {
    try {
      const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
      setTimeout(() => {
        if (hasOnboarded === null) {
          navigation.replace('OnBoarding');
        } else {
          navigation.replace('BottomTabs');
        }
      }, 2000);
    } catch (error) {
      console.log( error);
      // Handle the error, e.g., show an error message or fallback to a default screen
    }
  };

useEffect(()=>{
  CheckForOnBoarding();
},[])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5775F1',
      }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Logo />
    </View>
  );
};

export default Splash;
