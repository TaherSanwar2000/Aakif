import {View, Text, Image, StatusBar, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding1 from '../SVG/OnBoarding1';
import OnBoarding2 from '../SVG/OnBoarding2';
import OnBoarding3 from '../SVG/OnBoarding3';
import OnBoardingLogo from '../SVG/OnBoardingLogo';

const OnBoarding = ({navigation}) => {
  const [showHomePage, setShowHomePage] = useState(false);

  const slides = [
    {
      id: 1,
      title: 'Unleash the Power of Loyalty 🏆',
      description: `Offer Loyalty to Customers Who Love Shopping.${'\n'}Earning Rewards Has Never Been So Gratifying!${'\n'}Making custom offer is never this easy!`,
      image: <OnBoarding1 width="100%" height="40%" marginTop="10%"/>,
    },
    {
      id: 2,
      title: 'Powerful Customer Insights 📈',
      description: `Unravel the Magic of Insights.${'\n'}Understand Your Customers Better with .${'\n'}Data-Driven Success, Unlocked!`,
      image: <OnBoarding2 width="100%" height="40%" marginTop="10%" />,
    },
    {
      id: 3,
      title: 'Campaign & Retention 📣',
      description: `Retain Customers with Custom Campaign,${'\n'}Create Tailored Campaigns That Convert your target${'\n'}audience to increase sales.`,
      image: <OnBoarding3 width="90%" height="40%" marginTop="10%" />,
    },
  ];
  const buttonLable = label => {
    return (
      <View>
        <Text
          style={{
            color: '#3E5266',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 10,
            top: 10,
          }}>
          {label}
        </Text>
      </View>
    );
  };
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
        if (hasOnboarded) {
          // User has completed onboarding, navigate to the Login screen
          navigation.navigate('BottomTabs');
        } else {
          // User has not completed onboarding, show the Onboarding screen
        }
      } catch (error) {
        console.log('Error retrieving onboarding status:', error);
        // Handle the error, e.g., show an error message or fallback to a default screen
      }
    };

    checkOnboardingStatus();
  }, [navigation]);

  const handleOnboardingDone = async () => {
    try {
      // Set the onboarding status to completed
      await AsyncStorage.setItem('hasOnboarded', 'true');
      // Navigate to the Login screen
      navigation.replace('BottomTabs');
    } catch (error) {
      console.log('Error setting onboarding status:', error);
      // Handle the error, e.g., show an error message or fallback to a default screen
    }
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View>
              <StatusBar backgroundColor="#012174" translucent={true} />
              <View style={{alignItems:'center',marginTop:'10%'}}>
              <OnBoardingLogo/>
              </View>
              {item.image}
              <View style={{marginHorizontal: '5%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 22,
                    color: '#000000',
                    fontWeight: 'bold',
                    marginTop: '10%',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#4F4F4F',
                    marginTop: 15,
                  }}>
                  {item.description}
                </Text>
              </View>
              <View style={{alignItems:'center'}}>
              <TouchableOpacity
                onPress={handleOnboardingDone} // Call your function when "Get Started" is pressed
                style={{width:'90%', top:180}}
              >
                <Text
                  style={{
                    backgroundColor: '#5775F1',
                    color: '#FFF',
                    fontSize: 18,
                    fontWeight: 'bold',
                    padding: 10,
                    borderRadius: 10,
                    textAlign: 'center',
                  }}>
                Let's Get Started
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: '#5775F1',
          width: 30,
          bottom:130
        }}
        dotStyle={{
          backgroundColor: '#FFF',
          borderColor: '#5775F1',
          borderWidth: 1,
          marginHorizontal: 5,
          width: 10,
          bottom:130

        }}
        renderNextButton={() => null} // Hide the default "Next" button
        renderDoneButton={() => null} // Hide the default "Done" button
        onDone={handleOnboardingDone} // Call your function when "Done" is pressed
      />
    );
  } else {
    return null; // Return null or any other component if you want to show nothing while checking onboarding status
  }
};

export default OnBoarding;
