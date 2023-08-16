import {
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MiniLogo from '../SVG/MiniLogo';
import Geolocation from 'react-native-geolocation-service';
import Svg, {
  Path,
  Rect,
  G,
  Defs,
  ClipPath,
  LinearGradient,
  Stop,
  RadialGradient,
} from 'react-native-svg';
import Icons from '../SVG/Icons';
import FoodIcon from '../SVG/FoodIcon';
import Kfc from '../SVG/Kfc';
import StarBucks from '../SVG/StarBucks';
import Subway from '../SVG/Subway';
import McDonald from '../SVG/McDonald';
import TimHortan from '../SVG/TimHortan';
import PizzaHut from '../SVG/PizzaHut';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';




const Offer = ({navigation}) => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Finding Your Location..',
  );
  const [searchBar, setSearchBar] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleSearch = searchText => {
    if (searchText.trim() === '') {
      setFilteredData(data); // Display all data when search is empty
    } else {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState(0);
  useEffect(() => {
    // Set the selected category to the ID of the first category
    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, []);

  const categories = [
    {id: 1, icon: <FoodIcon />, name: 'Food'},
    {id: 2, icon: <Entertainment />, name: 'Entertainment'},
    {id: 3, icon: <Education />, name: 'Education'},

    // Add more categories as needed
  ];

  const handleCategoryPress = categoryId => {
    setSelectedCategory(categoryId);
  };

  const data = [
    // List of your offer items
    // Each item should contain the necessary information for rendering
    // Example:
    {
      id: 1,
      title: 'KFC',
      description: `Buy 1 Get 1${'\n'}Everything at ₹199`,
      icon: <Kfc />,
    },
    {
      id: 2,
      title: 'StarBucks',
      description: `Buy 1 Get 1${'\n'}Everything at ₹199`,
      icon: <StarBucks />,
    },
    {
      id: 3,
      title: 'Subway',
      description: `Buy 1 Get 1${'\n'}Everything at ₹199`,
      icon: <Subway />,
    },
    {
      id: 4,
      title: 'McDonalds',
      description: `Buy 1 Get 1${'\n'}Everything at ₹199`,
      icon: <McDonald />,
    },
    {
      id: 5,
      title: 'Tim Hortan',
      description: `Buy 1 Get 1${'\n'}Everything at ₹199`,
      icon: <TimHortan />,
    },
    {
      id: 6,
      title: 'Pizza Hut',
      description: `Buy 1 Get 1${'\n'}Everything at ₹199`,
      icon: <PizzaHut />,
    },
  ];

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={{
        width: 165,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 4,
      }}>
      <View style={[{alignItems: 'center'}]}>{item.icon}</View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: '3%',
          marginTop: '5%',
        }}>
        <Text style={{fontSize: 15, color: '#4F4F4F'}}>{item.title}</Text>
        {index === 0 ? <Unlock /> : index === 1 ? <Lock /> : null}
      </View>
      <View style={{marginLeft: '3%'}}>
        <Text style={{fontSize: 16, color: '#000000'}}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    requestLocationPermission();
    handleSearch('');
  }, []);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app require your location  ' +
            'to give you information about the offer in your city',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
        console.log('You can use the Location');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.address && data.address.city) {
              const city = data.address.city;
              console.log('City:', city);
              setDisplayCurrentAddress(city);
            } else {
              setDisplayCurrentAddress('City not found');
            }
          })
          .catch(error => {
            console.error('Geocoding Error:', error);
            setDisplayCurrentAddress('Error fetching city');
          });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const X = useSharedValue(10);
  const boxValue = useSharedValue(0);
  const animatedGestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      if (e.translationX < 0) {
        X.value = -e.translationX;
      } else {
        X.value = e.translationX;
      }
    },
    onEnd: () => {
      if (X.value < 150) {
        X.value = withSpring(10);
      } else {
        runOnJS(setShowModal)(false); // Run setShowModal on the UI thread
        runOnJS(setShowModal2)(true); // Run setShowModal on the UI thread
        X.value = withSpring(10);
      }
    },
  });
  const InterpolateXInput = [0, 150];
  const AnimatedStyles = {
    swipeStyle: useAnimatedStyle(() => {
      return {transform: [{translateX: X.value}]};
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0.8, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(X.value, InterpolateXInput, [
              0,
              150,
              Extrapolate.CLAMP,
            ]),
          },
        ],
      };
    }),
  };

  return (
    <View style={{flex: 1, backgroundColor: '#5775F1'}}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column', marginLeft: '2%'}}>
          <View style={{marginLeft: '5%'}}>
            <MiniLogo />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{bottom: 20, marginLeft: '5%'}}>
              <LocationMark />
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#FFF',
                bottom: 20,
                marginLeft: '2%',
              }}>
              {displayCurrentAddress}
            </Text>
          </View>
        </View>
        <View>
          <Icons />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F0F3FF',
          marginTop: '5%',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <View style={{alignItems: 'center', marginTop: '5%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0.3,
              borderColor: '#BDBDBD',
              width: '80%',
              borderRadius: 10,
              backgroundColor: '#FFF',
            }}>
            <View style={{marginHorizontal: '3%'}}>
              <SeacrhIcon />
            </View>
            <TextInput
              style={{fontSize: 15, color: '#BDBDBD'}}
              value={searchBar}
              onChangeText={text => {
                setSearchBar(text);
                handleSearch(text);
              }}
              placeholder="Search name"
              placeholderTextColor="#BDBDBD"
            />
          </View>
        </View>
        <View style={{width: '100%', height: 60}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginTop: '5%'}}
            style={{height: '50%'}}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategoryPress(category.id)}
                style={{
                  alignItems: 'center',
                  width: 'auto',
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor:
                    selectedCategory === category.id ? '#F0F0F0' : '#FFF',
                  borderRadius: 20,
                  padding: 10,
                  borderWidth: selectedCategory === category.id ? 2 : 0,
                  borderColor:
                    selectedCategory === category.id
                      ? '#5775F1'
                      : 'transparent',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{marginHorizontal: 10}}>{category.icon}</View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      marginRight: 10,
                    }}>
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={filteredData}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingHorizontal: '2.5%', paddingTop: '5%'}}
        />
      </View>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Gift />
            </View>
            <Text style={styles.modalText}>Unlock The Offer Now!</Text>
            <Text style={styles.modalSubText}>
              Unlock the offer now for{' '}
              <Text style={{color: '#5775F1'}}>25 Waakif Coins.</Text>
            </Text>
            <GestureHandlerRootView>
              <View
                style={{
                  width: 300,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: '#5775F1',
                  justifyContent: 'center',
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: 'center',
                }}>
                <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                  <Animated.View
                    style={[
                      {
                        width: 50,
                        height: 50,
                        backgroundColor: '#3C57C3',
                        borderRadius: 10,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: 0,
                      },
                      AnimatedStyles.swipeStyle,
                    ]}>
                    <Arrow />
                  </Animated.View>
                </PanGestureHandler>
                <Animated.Text
                  style={[
                    AnimatedStyles.swipeText,
                    {fontSize: 18, color: '#FFF', fontWeight: 'bold'},
                  ]}>
                  {'Unlock to Swipe'}
                </Animated.Text>
              </View>
            </GestureHandlerRootView>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeIcon}>
              <CloseSVG />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showModal2} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Congratulation />
            </View>
            <Text style={styles.modalText}>Congratulations</Text>
            <Text style={styles.modalSubText}>
            We have successfully unlocked the offer for{' '}
              <Text style={{color: '#5775F1'}}>25 Waakif Coins.</Text>
            </Text>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Detail')}
            style={{width:'90%',backgroundColor:'#5775F1',borderRadius:10,padding:10}}>
              <Text style={{fontSize:16,color:'#FFF',fontWeight: 'bold',textAlign:'center'}}>
                  See the details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal2(false)}
              style={styles.closeIcon}>
              <CloseSVG />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Offer;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: '6%',
  },
  modalSubText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4F4F4F',
    marginTop: '4%',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 10,
  },
});
function LocationMark(props) {
  return (
    <Svg
      width={12}
      height={13}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.31 4.475c-.525-2.31-2.54-3.35-4.31-3.35h-.005c-1.765 0-3.785 1.035-4.31 3.345-.585 2.58.995 4.765 2.425 6.14.53.51 1.21.765 1.89.765.68 0 1.36-.255 1.885-.765 1.43-1.375 3.01-3.555 2.425-6.135zM6 6.98a1.575 1.575 0 110-3.15 1.575 1.575 0 010 3.15z"
        fill="#fff"
      />
    </Svg>
  );
}
function SeacrhIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.583 17.5a7.917 7.917 0 100-15.833 7.917 7.917 0 000 15.833z"
        stroke="#4F4F4F"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.333 18.333l-1.666-1.666"
        stroke="#1189F6"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
function Entertainment(props) {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.586 14.86v2.343h18.828V14.86H.586zM10 .796H.586V3.14h18.828V.797H10z"
        fill="#DFE7F4"
      />
      <Path
        d="M10 .797h9.414V3.14H10V.797zm0 14.062h9.414v2.344H10V14.86z"
        fill="#C7CFE1"
      />
      <Path d="M10 3.14H1.172v11.72h17.656V3.14H10z" fill="#FF641A" />
      <Path d="M10 3.14h8.828v11.72H10V3.14z" fill="#F03800" />
      <Path
        d="M0 14.273v3.516h20v-3.516H0zm3.164 2.344H1.172v-1.172h1.992v1.172zm3.125 0H4.336v-1.172h1.953v1.172zm3.125 0H7.461v-1.172h1.953v1.172zm7.422-1.172h1.992v1.172h-1.992v-1.172zm-3.125 0h1.953v1.172h-1.953v-1.172zm-3.125 0h1.953v1.172h-1.953v-1.172zM10 .211H0v3.516h20V.21H10zM3.164 2.555H1.172V1.383h1.992v1.172zm3.125 0H4.336V1.383h1.953v1.172zm3.125 0H7.461V1.383h1.953v1.172zm3.125 0h-1.953V1.383h1.953v1.172zm3.125 0h-1.953V1.383h1.953v1.172zm3.164 0h-1.996V1.383h1.996v1.172z"
        fill="#404A80"
      />
      <Path
        d="M12.54 2.555h-1.954V1.383h1.953v1.172zm3.124 0h-1.953V1.383h1.953v1.172zM10 .21v3.516h10V.21H10zm8.828 2.344h-1.996V1.383h1.996v1.172zM20 14.273H10v3.516h10v-3.516zm-7.46 2.344h-1.954v-1.172h1.953v1.172zm3.124 0h-1.953v-1.172h1.953v1.172zm3.164 0h-1.992v-1.172h1.992v1.172z"
        fill="#283366"
      />
      <Path
        d="M10 6.733L8.242 5.562v6.876L10 11.267 13.4 9 10 6.733z"
        fill="#F0F7FF"
      />
      <Path d="M10 6.733v4.534L13.4 9 10 6.733z" fill="#DFE7F4" />
    </Svg>
  );
}
function Education(props) {
  return (
    <Svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.735 8.373h.007a1.047 1.047 0 000-2.095H4.109a1.047 1.047 0 000 2.095h.007"
        fill="#F1B986"
      />
      <Path
        d="M13.494 3.544a47.237 47.237 0 00-9.137 0 32.391 32.391 0 00-.21 5.681 2.68 2.68 0 002.554 2.542c1.482.07 2.967.07 4.45 0a2.68 2.68 0 002.552-2.542 32.389 32.389 0 00-.209-5.68z"
        fill="#F1D0A5"
      />
      <Path
        d="M4.357 3.544a47.31 47.31 0 014.569-.221c-.771 0-1.542.074-2.314.223a64.931 64.931 0 00-.105 5.736c.032 1.258.492 2.284 1.095 2.518-.3-.008-.601-.02-.901-.034a2.68 2.68 0 01-2.553-2.54 32.44 32.44 0 01.209-5.682z"
        fill="#F1B986"
      />
      <Path
        d="M8.925 10.245c-.532 0-1.023-.31-1.252-.792a.302.302 0 01.546-.259.786.786 0 00.707.448c.3 0 .578-.176.707-.448a.302.302 0 01.545.26c-.229.48-.72.791-1.253.791z"
        fill="#C32430"
      />
      <Path
        d="M6.696 8.21c.24 0 .436-.29.436-.649 0-.358-.195-.648-.436-.648-.24 0-.436.29-.436.648 0 .359.195.65.436.65zM11.155 8.21c.24 0 .436-.29.436-.649 0-.358-.195-.648-.436-.648-.24 0-.436.29-.436.648 0 .359.195.65.436.65z"
        fill="#454045"
      />
      <Path
        d="M11.462 5.119c-1.75.676-4.237.378-5.49-.875 0 0-.298 2.035-1.84 2.035l-.672.226C1.664-.545 5.494 1.339 5.494 1.339c.362-.7.889-.99 1.439-1.06a2.39 2.39 0 01.146-.014h.011c.388-.022.78.057 1.13.17a5.309 5.309 0 011.184.56c.394-.523.77-.995 1.183-.995.17 0 .287.065.365.169.299.39.054 1.33.034 1.405l-.001.003.001-.003.002-.006C11.041 1.435 11.634 0 12.696 0a.83.83 0 01.18.018c.792.175.172 1.56.104 1.707l-.002.004-.003.007c.034-.043 1.36-1.726 1.949-.954v.001c.595.783-1.712 3.66-3.462 4.336z"
        fill="#F4DD45"
      />
      <Path
        d="M14.924.782c-.298-.297-1.33 1.107-1.95.955l.004-.008-.003.007c.034-.043 1.36-1.726 1.949-.954zM12.876.018c-.447-.101-.862.75-1.096 1.355a.5.5 0 01-.731.245l-.065-.04.001-.001v-.003h.001l.002-.006C11.041 1.435 11.634 0 12.696 0a.83.83 0 01.18.018zm-5.943.26c-1.28.226-1.765 3.162-.961 3.966 0 0-.298 2.035-1.84 2.035l-.672.226C1.664-.545 5.494 1.339 5.494 1.339c.362-.7.889-.99 1.439-1.06zm4.02-.11c-.45-.45-.75 1.86-1.764 2.229-1.013.37-1.108-.103-1.108-.103.499-.185.92-.768 1.322-1.3l.037-.05.047-.06C9.85.406 10.203 0 10.587 0c.17 0 .287.065.365.169zM7.09.265H7.08h.012z"
        fill="#ECC32E"
      />
      <Path
        d="M14.98 9.522l-5.231 1.134H8.25l-5.23-1.134a.856.856 0 00-1.038.837v6.297c0 .403.281.752.675.837l5.593 1.212H9.75l5.593-1.212a.857.857 0 00.675-.837v-6.297a.856.856 0 00-1.038-.837z"
        fill="#DFEAEF"
      />
      <Path
        d="M16.58 10.984v6.802a.925.925 0 01-.729.905L9.81 20l-.78-.493v-7.688l.78-.514 5.65-1.225a.925.925 0 011.121.904z"
        fill="#DA4A54"
      />
      <Path
        d="M9.029 11.819v7.688L8.191 20 2.15 18.69a.925.925 0 01-.73-.904v-6.802a.925.925 0 011.122-.904l5.65 1.225.838.514z"
        fill="#C32430"
      />
      <Path d="M8.191 20v-8.695H9.81V20" fill="#DD636E" />
      <Path
        d="M11.849 13.605a.302.302 0 01-.064-.597l3.342-.724a.302.302 0 01.128.59l-3.342.724a.302.302 0 01-.064.007zm0 1.121a.302.302 0 01-.064-.596l3.342-.725a.302.302 0 01.128.59l-3.342.725a.302.302 0 01-.064.006z"
        fill="#454045"
      />
      <Path
        d="M1.254 14.27H.937a.846.846 0 01-.846-.845v-.76c0-.467.379-.846.846-.846h.317c.467 0 .846.379.846.846v.76a.846.846 0 01-.846.846z"
        fill="#F1D0A5"
      />
      <Path
        d="M1.416 14.255a.799.799 0 01-.162.016H.937a.846.846 0 01-.846-.847v-.759c0-.467.379-.846.846-.846h.317c.055 0 .11.005.162.016a.846.846 0 00-.683.83v.76c0 .411.294.754.683.83z"
        fill="#F1B986"
      />
      <Path
        d="M17.063 14.27h-.317a.846.846 0 01-.846-.845v-.76c0-.467.379-.846.846-.846h.317c.467 0 .846.379.846.846v.76a.846.846 0 01-.846.846z"
        fill="#F1D0A5"
      />
      <Path
        d="M17.225 14.255a.8.8 0 01-.162.016h-.317a.846.846 0 01-.846-.847v-.759c0-.467.379-.846.846-.846h.317c.055 0 .11.005.162.016a.846.846 0 00-.683.83v.76c0 .411.294.754.683.83z"
        fill="#F1B986"
      />
    </Svg>
  );
}
function Unlock(props) {
  return (
    <Svg
      width={64}
      height={17}
      viewBox="0 0 64 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={64} height={17} rx={8.5} fill="#EAFFF3" />
      <Path d="M11 10.73a.68.68 0 100-1.36.68.68 0 000 1.36z" fill="#27AE60" />
      <Path
        d="M12.938 7.433H8.966V6.95c0-1.22.346-2.033 2.033-2.033 1.804 0 2.033.879 2.033 1.645 0 .163.13.292.292.292a.29.29 0 00.292-.292c0-1.479-.88-2.229-2.617-2.229-2.346 0-2.617 1.492-2.617 2.617v.52c-1.166.147-1.55.738-1.55 2.192v.775c0 1.709.521 2.23 2.23 2.23h3.874c1.709 0 2.23-.521 2.23-2.23v-.774c0-1.709-.521-2.23-2.23-2.23zM11 11.308a1.26 1.26 0 01-1.258-1.258A1.26 1.26 0 0111 8.792a1.257 1.257 0 110 2.517zM23.926 9.687c0 .507-.084.94-.252 1.3-.168.357-.432.63-.792.82-.357.188-.823.283-1.4.283-.581 0-1.052-.096-1.412-.288a1.735 1.735 0 01-.783-.841c-.162-.37-.243-.82-.243-1.35V5.492h.994v4.239c0 .516.126.9.378 1.152.255.249.61.373 1.067.373.303 0 .564-.053.783-.162.222-.11.391-.279.508-.504.117-.227.176-.514.176-.859V5.493h.976v4.194zM25.236 12V7.347h.94v.67c.076-.125.176-.244.302-.355.129-.111.287-.201.473-.27.189-.069.406-.104.652-.104.291 0 .56.059.805.176.25.114.449.294.599.54.15.243.225.558.225.945V12h-.963V9.053c0-.334-.09-.581-.27-.743-.177-.162-.406-.243-.688-.243a1.55 1.55 0 00-.54.095.94.94 0 00-.415.287.72.72 0 00-.157.478V12h-.963zm6.49.063c-.276 0-.498-.036-.666-.108a.895.895 0 01-.378-.288 1.062 1.062 0 01-.176-.414 2.819 2.819 0 01-.04-.482V5.313h.949v5.36c0 .216.042.38.126.495.087.114.219.178.396.193l.243.009v.612a1.905 1.905 0 01-.234.059 1.17 1.17 0 01-.22.022zm3.301.027c-.435 0-.816-.093-1.143-.279a1.925 1.925 0 01-.756-.819c-.177-.357-.265-.789-.265-1.296 0-.489.084-.916.252-1.282a1.94 1.94 0 01.742-.851c.324-.204.716-.306 1.175-.306.438 0 .817.096 1.138.288.321.189.57.466.747.832.177.364.266.803.266 1.319 0 .471-.084.886-.252 1.247a1.93 1.93 0 01-.73.846c-.317.2-.709.301-1.174.301zm.005-.742c.264 0 .484-.07.661-.208.18-.14.315-.337.405-.589.09-.255.135-.549.135-.882 0-.309-.04-.59-.121-.841a1.254 1.254 0 00-.383-.608c-.177-.15-.41-.225-.697-.225-.27 0-.495.069-.675.207-.18.135-.317.329-.41.58-.09.25-.135.545-.135.887 0 .303.04.582.122.837.08.255.211.459.391.612.18.153.416.23.707.23zm5.08-4.091c.348 0 .657.069.927.207.273.135.493.324.661.567.168.243.27.526.306.85h-.832a1.087 1.087 0 00-.176-.427.93.93 0 00-.355-.315 1.075 1.075 0 00-.527-.121c-.372 0-.675.136-.909.409-.234.273-.35.691-.35 1.255 0 .516.107.928.323 1.233.22.307.537.46.954.46a1.035 1.035 0 00.878-.45c.087-.133.142-.269.166-.41h.82a1.704 1.704 0 01-.968 1.377c-.27.132-.576.198-.918.198-.423 0-.798-.091-1.125-.274a1.944 1.944 0 01-.77-.815c-.183-.36-.274-.796-.274-1.31 0-.482.085-.907.256-1.273.171-.366.419-.651.743-.855.327-.204.717-.306 1.17-.306zM47.267 12h-.998l-1.4-2.245-.837.868V12h-.963V5.313h.963v4.253l2.057-2.219h1.08l-1.683 1.795L47.267 12zm1.435-2.101c0 .279.045.529.135.751.093.219.233.393.419.522.186.126.417.189.693.189.276 0 .514-.063.715-.189a.888.888 0 00.4-.563h.892a1.57 1.57 0 01-.383.81 1.91 1.91 0 01-.72.505 2.399 2.399 0 01-.886.166c-.441 0-.83-.095-1.166-.284a2.012 2.012 0 01-.787-.818c-.186-.354-.28-.776-.28-1.265 0-.483.086-.909.257-1.278.171-.372.419-.663.743-.873.324-.21.714-.315 1.17-.315.45 0 .828.096 1.134.288.309.192.543.462.702.81.159.345.238.753.238 1.224v.32h-3.276zm0-.626h2.358c0-.243-.042-.463-.126-.662a1.02 1.02 0 00-.387-.472c-.17-.117-.387-.175-.648-.175-.267 0-.489.064-.666.193-.177.129-.31.294-.4.495-.087.201-.13.408-.13.621zm6.048 2.817c-.612 0-1.094-.208-1.445-.626-.35-.42-.526-1.024-.526-1.813 0-.483.07-.903.211-1.26.141-.36.351-.639.63-.837.282-.198.63-.297 1.044-.297.21 0 .396.026.558.077.165.05.31.117.432.198.126.08.23.167.31.26.085.094.15.18.194.261v-2.74h.968V12h-.72l-.108-.954a1.774 1.774 0 01-.153.333 1.409 1.409 0 01-.734.607 1.88 1.88 0 01-.661.104zm.184-.724c.432 0 .744-.136.936-.405.192-.274.288-.72.288-1.341a2.822 2.822 0 00-.13-.891 1.067 1.067 0 00-.392-.55c-.174-.126-.403-.189-.688-.189-.357 0-.648.13-.873.387-.225.255-.338.67-.338 1.242 0 .565.102.997.306 1.296.207.3.504.45.891.45z"
        fill="#27AE60"
      />
    </Svg>
  );
}
function Lock(props) {
  return (
    <Svg
      width={55}
      height={17}
      viewBox="0 0 55 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={55} height={17} rx={8.5} fill="#FFF1F1" />
      <Path d="M11 10.73a.68.68 0 100-1.36.68.68 0 000 1.36z" fill="#EB5757" />
      <Path
        d="M12.938 7.433H8.966V6.95c0-1.22.345-2.033 2.033-2.033 1.804 0 2.033.879 2.033 1.646 0 .162.13.291.292.291a.29.29 0 00.292-.291c0-1.48-.88-2.23-2.617-2.23-2.346 0-2.617 1.492-2.617 2.617v.52c-1.166.147-1.55.738-1.55 2.193v.774c0 1.709.521 2.23 2.23 2.23h3.874c1.709 0 2.23-.521 2.23-2.23v-.774c0-1.709-.521-2.23-2.23-2.23zM11 11.308a1.26 1.26 0 01-1.258-1.258A1.26 1.26 0 0111 8.792a1.257 1.257 0 110 2.517zM19.132 5.493h.976v5.661h3.006V12h-3.987l.005-6.507zm6.812 6.597c-.435 0-.816-.093-1.143-.279a1.925 1.925 0 01-.756-.819c-.177-.357-.266-.789-.266-1.296 0-.489.084-.916.252-1.282a1.94 1.94 0 01.743-.851c.324-.204.715-.306 1.174-.306.438 0 .818.096 1.139.288.32.189.57.466.747.832.177.364.265.803.265 1.319 0 .471-.084.886-.252 1.247a1.93 1.93 0 01-.729.846c-.318.2-.71.301-1.174.301zm.004-.742c.264 0 .485-.07.662-.208.18-.14.315-.337.405-.589.09-.255.135-.549.135-.882 0-.309-.04-.59-.122-.841a1.254 1.254 0 00-.382-.608c-.177-.15-.41-.225-.698-.225-.27 0-.495.069-.675.207-.18.135-.316.329-.41.58-.09.25-.134.545-.134.887 0 .303.04.582.121.837.081.255.212.459.392.612.18.153.415.23.706.23zm5.08-4.091c.348 0 .657.069.927.207.273.135.494.324.662.567.168.243.27.526.306.85h-.833a1.087 1.087 0 00-.175-.427.93.93 0 00-.356-.315 1.075 1.075 0 00-.526-.121c-.372 0-.675.136-.91.409-.233.273-.35.691-.35 1.255 0 .516.108.928.324 1.233.219.307.537.46.954.46a1.035 1.035 0 00.877-.45c.087-.133.143-.269.167-.41h.819a1.704 1.704 0 01-.967 1.377c-.27.132-.577.198-.919.198-.423 0-.798-.091-1.125-.274a1.944 1.944 0 01-.77-.815c-.182-.36-.274-.796-.274-1.31 0-.482.086-.907.257-1.273.17-.366.418-.651.742-.855.327-.204.717-.306 1.17-.306zM38.184 12h-.999l-1.4-2.245-.836.868V12h-.963V5.313h.963v4.253l2.056-2.219h1.08l-1.683 1.795L38.184 12zm1.435-2.101c0 .279.045.529.135.751.093.219.232.393.418.522.186.126.417.189.693.189.276 0 .515-.063.716-.189a.888.888 0 00.4-.563h.891a1.57 1.57 0 01-.382.81 1.91 1.91 0 01-.72.505 2.399 2.399 0 01-.887.166c-.44 0-.83-.095-1.165-.284a2.012 2.012 0 01-.788-.818c-.186-.354-.279-.776-.279-1.265 0-.483.086-.909.257-1.278.17-.372.418-.663.742-.873.324-.21.714-.315 1.17-.315.45 0 .828.096 1.134.288.31.192.543.462.702.81.16.345.239.753.239 1.224v.32h-3.276zm0-.626h2.358c0-.243-.042-.463-.126-.662a1.02 1.02 0 00-.387-.472c-.171-.117-.387-.175-.648-.175-.267 0-.49.064-.666.193-.177.129-.31.294-.4.495-.088.201-.131.408-.131.621zm6.047 2.817c-.612 0-1.093-.208-1.444-.626-.351-.42-.527-1.024-.527-1.813 0-.483.07-.903.212-1.26.14-.36.35-.639.63-.837.282-.198.63-.297 1.044-.297.21 0 .396.026.558.077.165.05.309.117.432.198.126.08.23.167.31.26.084.094.149.18.194.261v-2.74h.967V12h-.72l-.108-.954a1.774 1.774 0 01-.153.333 1.409 1.409 0 01-.733.607 1.88 1.88 0 01-.662.104zm.185-.724c.432 0 .744-.136.936-.405.192-.274.288-.72.288-1.341a2.822 2.822 0 00-.13-.891 1.067 1.067 0 00-.392-.55c-.174-.126-.404-.189-.689-.189-.357 0-.648.13-.873.387-.225.255-.337.67-.337 1.242 0 .565.102.997.306 1.296.207.3.504.45.89.45z"
        fill="#EB5757"
      />
    </Svg>
  );
}
function Gift(props) {
  return (
    <Svg
      width={80}
      height={100}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.776 54.482c-.118 0-.293 0-.41-.059-10.194-4.042-12.42-16.93-4.804-24.195.527-.527 1.23-.41 1.64.06l3.105-1.758c-.469-.88.351-2.344 5.331-2.344 8.084 0 14.646 6.562 14.646 14.587 0 6.093-3.691 11.424-9.315 13.65-.586.176-1.172 0-1.465-.469l-7.791.059c-.176.293-.527.469-.937.469zm-27.3-29.584c-.761 0-1.288-.703-1.113-1.465l4.277-17.34C35.694 1.816 40.03-.82 44.306.234c4.276 1.055 6.913 5.39 5.858 9.666l-1.054 4.16a1.055 1.055 0 01-1.055.878l-1.054 3.047-14.353 5.858c-.117.586-.469 1.055-1.172 1.055z"
        fill="#FFB800"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.483 34.564c-1.757 0-4.745-1.64-6.092-3.867-3.75-6.21 2.109-13.708 8.787-11.892l13.65 3.808c1.464.351.878 2.636-.762 2.226L16.655 33.45c-.117.645-.527 1.114-1.172 1.114z"
        fill="#FFB800"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.195 100H53.913V52.138h24.253c.645 0 1.172.528 1.172 1.172v38.547c0 4.452-3.632 8.143-8.143 8.143zm-34.505 0H19.408c-4.452 0-8.143-3.69-8.143-8.143v-35.5c0-1.114 1.23-1.407 1.934-.938l3.163-1.875c-.117-.644.234-1.406 1.113-1.406H36.69V100z"
        fill="#E93565"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.951 46.632c-.995 0-1.523-1.29-.82-1.992l9.373-9.373c1.055-1.055 2.754.585 1.64 1.698L59.83 46.28a1.192 1.192 0 01-.879.352zm9.256 2.519c-4.98 0-4.98-7.616 0-7.616s4.98 7.616 0 7.616zm0-2.344c1.875 0 1.875-2.929 0-2.929-1.933 0-1.874 2.93 0 2.93zm-9.138-6.795c-4.98 0-4.98-7.616 0-7.616 5.038 0 5.038 7.616 0 7.616zm0-2.344c1.933 0 1.933-2.929 0-2.929-1.875 0-1.875 2.93 0 2.93z"
        fill="#FEFEFE"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.57 59.871c-.41 0-.761-.176-.995-.586l-5.8-9.549C-.51 45.93.721 40.89 4.587 38.606l19.45-11.775L34.23 44.58 9.156 59.695a.99.99 0 01-.585.176zM38.8 17.926L57.78 6.503c3.808-2.344 8.846-1.055 11.13 2.753l5.8 9.549c.293.527.117 1.23-.41 1.582l-25.308 15.29L38.8 17.927z"
        fill="#E93565"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.036 26.83L38.8 17.927l10.193 17.75-14.762 8.905-10.194-17.75zM53.913 100H36.69V52.138h17.223V100z"
        fill="#FC0"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.087 100h-6.679c-4.452 0-8.143-3.69-8.143-8.143v-6.62c.235-.703 1.992-1.347 4.511-1.347 7.967 0 13.416 7.909 10.78 15.29-.06.176-.235.468-.47.82zm45.108 0h-6.62c-1.054-1.523-1.171-3.105-1.171-4.628 0-9.373 10.193-13.65 15.934-10.545v7.03c0 4.452-3.632 8.143-8.143 8.143z"
        fill="#FA5F7F"
      />
    </Svg>
  );
}
function CloseSVG(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.6 7.4l-7.2 7.2m0-7.2l7.2 7.2M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"
        stroke="#4A637C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
function Arrow(props) {
  return (
    <Svg
      width={36}
      height={24}
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1_1052)">
        <Path
          d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414 4.95-4.95z"
          fill="#fff"
        />
      </G>
      <G opacity={0.8} clipPath="url(#clip1_1_1052)">
        <Path
          d="M19.172 12l-4.95-4.95 1.414-1.414L22 12l-6.364 6.364-1.414-1.414 4.95-4.95z"
          fill="#fff"
        />
      </G>
      <G opacity={0.6} clipPath="url(#clip2_1_1052)">
        <Path
          d="M25.172 12l-4.95-4.95 1.414-1.414L28 12l-6.364 6.364-1.414-1.414 4.95-4.95z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_1052">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
        <ClipPath id="clip1_1_1052">
          <Path fill="#fff" transform="translate(6)" d="M0 0H24V24H0z" />
        </ClipPath>
        <ClipPath id="clip2_1_1052">
          <Path fill="#fff" transform="translate(12)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
function Congratulation(props) {
  return (
    <Svg
      width={100}
      height={100}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M73.59 77.206c-.34.338-.75.593-1.23.768l-.484.145S6.65 104.437 1.578 99.347c-5.072-5.09 21.483-70.22 21.483-70.22l.147-.484c.177-.479.433-.889.772-1.227 4.058-4.043 18.454 3.825 32.153 17.574C69.832 58.74 77.647 73.164 73.59 77.206z"
        fill="url(#paint0_linear_1_1262)"
      />
      <Path
        d="M69.532 79.055a937.887 937.887 0 01-18.423 7.07 680.487 680.487 0 01-15.784 5.664c-4.711 1.619-9.394 3.155-13.71 4.449a135.637 135.637 0 01-8.797-8.091A135.567 135.567 0 014.76 79.32c1.31-4.31 2.862-8.988 4.498-13.693a680.633 680.633 0 015.721-15.763 938.8 938.8 0 017.139-18.397c8.751 4.746 18.103 11.765 26.91 20.603 8.805 8.838 15.79 18.215 20.504 26.985z"
        fill="url(#paint1_linear_1_1262)"
      />
      <Path
        d="M73.59 77.206c-.34.339-.751.593-1.23.769l-.484.144s-.843.34-2.344.935a937.255 937.255 0 01-18.423 7.072 680.487 680.487 0 01-15.784 5.663c-4.686-3.534-9.383-7.617-13.933-12.184-4.551-4.568-8.617-9.28-12.134-13.978a680.621 680.621 0 015.72-15.764 938.563 938.563 0 017.14-18.396c.6-1.5.944-2.341.944-2.341l.145-.483c.178-.479.433-.89.774-1.227 4.057-4.043 18.452 3.826 32.152 17.573C69.83 58.74 77.647 73.163 73.589 77.206z"
        fill="url(#paint2_linear_1_1262)"
      />
      <Path
        d="M73.59 77.206c-.34.339-.751.593-1.23.769l-.484.144s-.843.34-2.344.935a937.255 937.255 0 01-18.423 7.072c-6.606-4.35-13.373-9.864-19.844-16.359-6.47-6.495-11.96-13.282-16.286-19.903a938.8 938.8 0 017.139-18.397c.6-1.5.944-2.341.944-2.341l.146-.483c.178-.479.433-.89.773-1.227 4.058-4.043 18.452 3.826 32.152 17.574C69.83 58.74 77.647 73.163 73.589 77.206z"
        fill="url(#paint3_linear_1_1262)"
      />
      <Path
        d="M73.589 77.207c-4.058 4.043-18.454-3.824-32.153-17.574C27.737 45.884 19.922 31.46 23.98 27.417c4.058-4.044 18.454 3.824 32.152 17.573 13.7 13.75 21.515 28.173 17.457 32.217z"
        fill="url(#paint4_linear_1_1262)"
      />
      <Path
        d="M71.06 73.5c-2.998 2.988-15.14-4.338-27.12-16.361-11.98-12.024-19.261-24.192-16.263-27.18 2.998-2.987 15.14 4.339 27.12 16.362 11.98 12.024 19.261 24.192 16.263 27.18z"
        fill="url(#paint5_linear_1_1262)"
      />
      <Path
        d="M73.59 77.206c4.057-4.043-3.758-18.467-17.457-32.216-8.033-8.062-16.304-14.1-22.591-16.902.25.462.526.91.825 1.341.498.718 1.08 1.372 1.736 1.962l3.478 3.503c-.353.16-.713.305-1.079.435a1.178 1.178 0 00-.763 1.345l1.23 6.115a1.53 1.53 0 00.963 1.13l33.396 33.519a3.03 3.03 0 00.262-.232z"
        fill="url(#paint6_linear_1_1262)"
      />
      <Path
        d="M51.383 58.209l3.416 4.084 15.914 15.97c1.216-.033 2.193-.375 2.876-1.056 3.546-3.533-1.974-14.993-12.565-27.003a42.205 42.205 0 00-9.352 5.4 1.814 1.814 0 00-.289 2.605z"
        fill="url(#paint7_linear_1_1262)"
      />
      <Path
        d="M54.8 62.293l-3.417-4.084a1.814 1.814 0 01.29-2.605 42.096 42.096 0 0137.218-7.009 42.254 42.254 0 019.237 3.889 1.814 1.814 0 01.634 2.543L95.92 59.53a1.812 1.812 0 01-2.42.611 33.33 33.33 0 00-7.081-2.95 33.163 33.163 0 00-29.14 5.387c-.771.58-1.86.456-2.48-.284z"
        fill="url(#paint8_linear_1_1262)"
      />
      <Path
        d="M25.28 19.896l-3.102-3.191c-1.406-1.447-1.829-3.775-1.008-5.546.953-2.056 3.24-2.658 5.083-1.339 1.587 1.136 2.366 3.371 1.855 5.323l-1.127 4.305a1.01 1.01 0 01-1.701.448z"
        fill="url(#paint9_linear_1_1262)"
      />
      <Path
        d="M19.794 23.362l-4.405-.64c-1.996-.29-3.751-1.878-4.18-3.782-.496-2.211.95-4.083 3.215-4.16 1.95-.066 3.93 1.232 4.714 3.09l1.731 4.1a1.01 1.01 0 01-1.075 1.392z"
        fill="url(#paint10_linear_1_1262)"
      />
      <Path
        d="M78.763 74.559l4.432-.401c2.009-.182 4.085.954 4.944 2.707.997 2.035.026 4.191-2.16 4.793-1.881.517-4.108-.284-5.303-1.91l-2.636-3.585a1.01 1.01 0 01.722-1.604z"
        fill="url(#paint11_linear_1_1262)"
      />
      <Path
        d="M79.523 68.114l3.27-3.02c1.481-1.368 3.82-1.732 5.57-.866 2.03 1.005 2.575 3.307 1.208 5.115-1.176 1.558-3.43 2.28-5.368 1.719l-4.276-1.236a1.01 1.01 0 01-.404-1.712z"
        fill="url(#paint12_linear_1_1262)"
      />
      <Path
        d="M40.933 43.946a1.528 1.528 0 01-1.963-1.157l-1.231-6.114a1.179 1.179 0 01.763-1.346 13.127 13.127 0 002.48-1.177c-2.812-.928-5.1-2.538-6.615-4.723-2.854-4.118-3.078-8.76-.599-12.417 2.454-3.619 6.987-5.384 11.283-4.393 4.695 1.084 7.993 5.193 8.822 10.99.035.242.065.482.092.722 1.152-.675 2.083-1.508 2.666-2.44 1.475-2.358 1.615-5.878.357-8.967-.799-1.96-2.032-3.46-3.423-4.214a1.545 1.545 0 01-.785-1.72l1.41-5.815C54.408.285 55.356-.228 56.212.1c3.947 1.511 7.195 4.873 9.059 9.449 2.343 5.75 1.938 12.297-1.057 17.085-2.37 3.789-6.741 6.614-11.795 7.809-1.136 2.373-2.835 4.459-5.063 6.167-2.38 1.824-4.845 2.828-6.422 3.336zm1.753-22.652c-.585 0-1.213.29-1.515.737-.452.666.148 1.73.547 2.304.545.787 1.816 1.375 3.417 1.638a14.272 14.272 0 00-.115-1.097c-.286-1.998-1.026-3.322-1.981-3.543a1.579 1.579 0 00-.353-.039z"
        fill="url(#paint13_radial_1_1262)"
      />
      <Path
        d="M60.376 30.764l-6.411-6.434s.41 6.213-1.548 10.113c2.98-.705 5.723-1.977 7.959-3.679z"
        fill="url(#paint14_linear_1_1262)"
      />
      <Path
        d="M41.718 24.335c-.292-.421-.69-1.104-.706-1.7l-8.956-.017c.014 2.267.788 4.614 2.311 6.811 1.514 2.185 3.803 3.795 6.615 4.723 0 0 4.59-1.392 4.154-8.179-1.602-.263-2.873-.85-3.419-1.638z"
        fill="url(#paint15_linear_1_1262)"
      />
      <Path
        d="M60.707 44.702a17.63 17.63 0 00-5.196 5.226.775.775 0 01-1.3-.002 17.633 17.633 0 00-5.176-5.246.775.775 0 01.002-1.29 17.633 17.633 0 005.196-5.227.775.775 0 011.3.003 17.633 17.633 0 005.177 5.245c.46.303.459.99-.003 1.29z"
        fill="url(#paint16_linear_1_1262)"
      />
      <Path
        d="M98.719 41.968a17.633 17.633 0 00-5.196 5.227.775.775 0 01-1.3-.002 17.63 17.63 0 00-5.177-5.246.775.775 0 01.003-1.29 17.633 17.633 0 005.196-5.227.775.775 0 011.3.002 17.636 17.636 0 005.176 5.246c.46.302.46.99-.002 1.29z"
        fill="url(#paint17_linear_1_1262)"
      />
      <Path
        d="M80.918 11.609a17.631 17.631 0 00-5.196 5.226.775.775 0 01-1.3-.002 17.63 17.63 0 00-5.177-5.246.775.775 0 01.003-1.29 17.634 17.634 0 005.195-5.227.775.775 0 011.3.002 17.636 17.636 0 005.177 5.246c.46.302.459.99-.002 1.29z"
        fill="url(#paint18_linear_1_1262)"
      />
      <Path
        d="M78.991 32.544a12.858 12.858 0 00-3.787 3.81.565.565 0 01-.948-.002 12.85 12.85 0 00-3.773-3.824.565.565 0 01.001-.94 12.857 12.857 0 003.788-3.81.565.565 0 01.947.001 12.858 12.858 0 003.774 3.824.565.565 0 01-.002.94z"
        fill="url(#paint19_linear_1_1262)"
      />
      <Path
        d="M85.163 20.781a12.855 12.855 0 00-3.787 3.81.565.565 0 01-.948-.001 12.85 12.85 0 00-3.773-3.824.565.565 0 01.001-.941 12.854 12.854 0 003.788-3.81.565.565 0 01.947.002 12.854 12.854 0 003.774 3.824.565.565 0 01-.002.94z"
        fill="url(#paint20_linear_1_1262)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1_1262"
          x1={13.7842}
          y1={48.9736}
          x2={42.8068}
          y2={90.7543}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFE548" />
          <Stop offset={0.176} stopColor="#FFDE50" />
          <Stop offset={0.445} stopColor="#FFCA65" />
          <Stop offset={0.771} stopColor="#FFAA87" />
          <Stop offset={1} stopColor="#FF90A4" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1_1262"
          x1={36.5931}
          y1={81.589}
          x2={31.0286}
          y2={101.33}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FBA5C2" stopOpacity={0} />
          <Stop offset={0.386} stopColor="#FCA0BA" stopOpacity={0.386} />
          <Stop offset={0.974} stopColor="#FF91A5" stopOpacity={0.974} />
          <Stop offset={1} stopColor="#FF90A4" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1_1262"
          x1={42.1994}
          y1={69.81}
          x2={35.3098}
          y2={94.7186}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FBA5C2" stopOpacity={0} />
          <Stop offset={0.386} stopColor="#FCA0BA" stopOpacity={0.386} />
          <Stop offset={0.974} stopColor="#FF91A5" stopOpacity={0.974} />
          <Stop offset={1} stopColor="#FF90A4" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_1_1262"
          x1={46.7804}
          y1={56.2802}
          x2={38.1684}
          y2={84.6335}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FBA5C2" stopOpacity={0} />
          <Stop offset={0.386} stopColor="#FCA0BA" stopOpacity={0.386} />
          <Stop offset={0.974} stopColor="#FF91A5" stopOpacity={0.974} />
          <Stop offset={1} stopColor="#FF90A4" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_1_1262"
          x1={51.6912}
          y1={45.8643}
          x2={42.5492}
          y2={66.5334}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFE548" />
          <Stop offset={0.176} stopColor="#FFDE50" />
          <Stop offset={0.445} stopColor="#FFCA65" />
          <Stop offset={0.771} stopColor="#FFAA87" />
          <Stop offset={1} stopColor="#FF90A4" />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_1_1262"
          x1={43.0612}
          y1={61.4867}
          x2={55.9792}
          y2={41.613}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFD00D" stopOpacity={0} />
          <Stop offset={1} stopColor="#DB722B" />
        </LinearGradient>
        <LinearGradient
          id="paint6_linear_1_1262"
          x1={55.0478}
          y1={52.759}
          x2={46.8996}
          y2={27.9167}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFD00D" stopOpacity={0} />
          <Stop offset={1} stopColor="#DB722B" />
        </LinearGradient>
        <LinearGradient
          id="paint7_linear_1_1262"
          x1={64.7006}
          y1={66.4522}
          x2={58.1422}
          y2={55.7202}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#A34A9E" stopOpacity={0} />
          <Stop offset={1} stopColor="#343168" />
        </LinearGradient>
        <LinearGradient
          id="paint8_linear_1_1262"
          x1={74.7291}
          y1={63.3217}
          x2={75.0346}
          y2={46.9375}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#A34A9E" />
          <Stop offset={1} stopColor="#343168" />
        </LinearGradient>
        <LinearGradient
          id="paint9_linear_1_1262"
          x1={23.6099}
          y1={13.9911}
          x2={27.2105}
          y2={15.5588}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3FA9F5" />
          <Stop offset={1} stopColor="#666AD6" />
        </LinearGradient>
        <LinearGradient
          id="paint10_linear_1_1262"
          x1={15.0326}
          y1={19.5947}
          x2={18.8425}
          y2={18.6426}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#A34A9E" />
          <Stop offset={1} stopColor="#343168" />
        </LinearGradient>
        <LinearGradient
          id="paint11_linear_1_1262"
          x1={84.1696}
          y1={76.9802}
          x2={74.7627}
          y2={82.6773}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FF4974" />
          <Stop offset={0.45} stopColor="#FE4773" />
          <Stop offset={0.629} stopColor="#FC406D" />
          <Stop offset={0.76} stopColor="#F73464" />
          <Stop offset={0.868} stopColor="#F12257" />
          <Stop offset={0.961} stopColor="#E80C46" />
          <Stop offset={1} stopColor="#E4003D" />
        </LinearGradient>
        <LinearGradient
          id="paint12_linear_1_1262"
          x1={85.8431}
          y1={65.3067}
          x2={81.471}
          y2={77.8936}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#C4F8B6" />
          <Stop offset={1} stopColor="#3B8EAC" />
        </LinearGradient>
        <RadialGradient
          id="paint13_radial_1_1262"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(33.438 7.246) scale(39.3643)">
          <Stop stopColor="#FF4974" />
          <Stop offset={0.45} stopColor="#FE4773" />
          <Stop offset={0.629} stopColor="#FC406D" />
          <Stop offset={0.76} stopColor="#F73464" />
          <Stop offset={0.868} stopColor="#F12257" />
          <Stop offset={0.961} stopColor="#E80C46" />
          <Stop offset={1} stopColor="#E4003D" />
        </RadialGradient>
        <LinearGradient
          id="paint14_linear_1_1262"
          x1={61.528}
          y1={35.2555}
          x2={47.3182}
          y2={25.0204}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E4003D" stopOpacity={0} />
          <Stop offset={0.343} stopColor="#CD0E2D" stopOpacity={0.343} />
          <Stop offset={1} stopColor="#972E07" />
        </LinearGradient>
        <LinearGradient
          id="paint15_linear_1_1262"
          x1={39.9788}
          y1={27.9694}
          x2={43.9537}
          y2={31.6461}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E4003D" stopOpacity={0} />
          <Stop offset={0.343} stopColor="#CD0E2D" stopOpacity={0.343} />
          <Stop offset={1} stopColor="#972E07" />
        </LinearGradient>
        <LinearGradient
          id="paint16_linear_1_1262"
          x1={52.9316}
          y1={41.2512}
          x2={59.49}
          y2={49.9957}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3FA9F5" />
          <Stop offset={1} stopColor="#666AD6" />
        </LinearGradient>
        <LinearGradient
          id="paint17_linear_1_1262"
          x1={90.938}
          y1={38.4484}
          x2={97.4965}
          y2={47.193}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3FA9F5" />
          <Stop offset={1} stopColor="#666AD6" />
        </LinearGradient>
        <LinearGradient
          id="paint18_linear_1_1262"
          x1={73.0818}
          y1={8.12139}
          x2={79.64}
          y2={16.8659}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#A34A9E" />
          <Stop offset={1} stopColor="#343168" />
        </LinearGradient>
        <LinearGradient
          id="paint19_linear_1_1262"
          x1={73.3229}
          y1={29.9651}
          x2={78.1037}
          y2={36.3396}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#C4F8B6" />
          <Stop offset={1} stopColor="#3B8EAC" />
        </LinearGradient>
        <LinearGradient
          id="paint20_linear_1_1262"
          x1={79.4735}
          y1={18.1912}
          x2={84.2543}
          y2={24.5657}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFE548" />
          <Stop offset={0.176} stopColor="#FFDE50" />
          <Stop offset={0.445} stopColor="#FFCA65" />
          <Stop offset={0.771} stopColor="#FFAA87" />
          <Stop offset={1} stopColor="#FF90A4" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
