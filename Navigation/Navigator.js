import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from '../Screens/Profile';
import Splash from '../Screens/Splash';
import Offer from '../Screens/Offer';
import OnBoarding from '../Screens/OnBoarding';
import Detail from '../Screens/Detail';
import {Image, View, Text} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const Bottamtab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel:false,
          tabBarStyle: [
            {
              display: 'flex',
              borderTopLeftRadius: 30, // Adjust the radius value as needed
              borderTopRightRadius: 30, // Adjust the radius value as needed
              backgroundColor: '#FFF', // Set the background color of the tab bar
              elevation: 10, // Add shadow (for Android)
              height: 50,
            },
            null,
          ],
        }}>
        <Tab.Screen
          name="Offer"
          component={Offer}
          options={{
            headerShown: false,
            
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../Image/discount.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#000000' : '#888888',
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#000000' : '#888888',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Offer
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../Image/user.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#000000' : '#888888',
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#000000' : '#888888',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabs"
        component={Bottamtab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default RootNavigator;
