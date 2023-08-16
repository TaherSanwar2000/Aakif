import {
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import MiniLogo from '../SVG/MiniLogo';
import Svg, {Path, Circle, Mask, G, Defs, Rect} from 'react-native-svg';
import Icons from '../SVG/Icons';

const Profile = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Finding Your Location..',
  );
  useEffect(() => {
    requestLocationPermission();
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
  return (
    <View style={{flex: 1, backgroundColor: '#5775F1'}}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column', marginLeft: '3%'}}>
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
        <ScrollView style={{marginBottom: '5%'}}>
          <View style={{alignItems: 'center', marginTop: '10%'}}>
            <View
              style={{
                width: '85%',
                height: 100,
                borderWidth: 1,
                borderColor: '#7F5EC8',
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '5%',
                }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: '3%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: '#EEE5FF',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#7F5EC8',
                        textAlign: 'center',
                      }}>
                      JD
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: '2%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}>
                      Jhon Deo
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '2%',
                      }}>
                      <Text style={{fontSize: 12, color: '#4F4F4F'}}>
                        +91-789526361
                      </Text>
                      <View
                        style={{
                          height: 4,
                          width: 4,
                          borderRadius: 2,
                          backgroundColor: '#4F4F4F',
                          marginHorizontal: '3%',
                        }}></View>
                      <Text style={{fontSize: 12, color: '#4F4F4F'}}>
                        johndoe@gmail.com
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '2%',
                      }}>
                      <Text style={{fontSize: 12, color: '#4F4F4F'}}>
                        31/05/1996
                      </Text>
                      <View
                        style={{
                          height: 4,
                          width: 4,
                          borderRadius: 2,
                          backgroundColor: '#4F4F4F',
                          marginHorizontal: '3%',
                        }}></View>
                      <Text style={{fontSize: 12, color: '#4F4F4F'}}>
                        Female
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={{right: 10}}>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', color: '#5775F1'}}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: '5%',
            }}>
            <View
              style={{
                width: '40%',
                height: 100,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFF',
                borderRadius: 25,
                paddingHorizontal: 10,
                elevation: 2.5,
              }}>
              <Circlecube />
              <View style={{flexDirection: 'column', marginLeft: '3%'}}>
                <Text style={{fontSize: 16, color: '#000000'}}>
                  Total Order
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#000000'}}>
                  124
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '40%',
                height: 100,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFF',
                borderRadius: 25,
                paddingHorizontal: 10,
                elevation: 2.5,
              }}>
              <TotalCoins />
              <View style={{flexDirection: 'column', marginLeft: '3%'}}>
                <Text style={{fontSize: 16, color: '#000000'}}>
                  Total Coins
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#000000'}}>
                  124
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: '5%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontWeight: 'bold',
                right: 120,
              }}>
              Support
            </Text>
            <View>
              <SupportSvg />
            </View>
          </View>
          <View style={{marginTop: '5%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontWeight: 'bold',
                right: 130,
              }}>
              Other
            </Text>
            <View>
              <OtherSVG />
            </View>
          </View>
          <View style={{alignItems: 'center', marginBottom: '5%'}}>
            <View
              style={{
                width: '90%',
                backgroundColor: '#F8F9FE',
                borderRadius: 15,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <LogOut />

              <Text style={{fontSize: 18, color: '#EB5757',marginLeft:'4%',fontWeight:'bold'}}>Log Out</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;
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
function Circlecube(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={20} cy={20} r={20} fill="#FFEAEA" />
      <Path
        d="M27.463 16.2l-7 4.055a.937.937 0 01-.927 0l-7-4.055c-.5-.29-.627-.973-.245-1.4.263-.3.563-.545.882-.718l4.927-2.727c1.054-.591 2.763-.591 3.818 0l4.927 2.727c.319.173.619.427.882.718.364.427.236 1.11-.264 1.4zM19.482 21.945v6.2c0 .691-.7 1.146-1.319.846-1.872-.918-5.027-2.636-5.027-2.636-1.109-.628-2.018-2.21-2.018-3.51v-4.69c0-.719.755-1.173 1.373-.819l6.536 3.791a.978.978 0 01.455.818zM20.518 21.945v6.2c0 .691.7 1.146 1.318.846 1.873-.918 5.027-2.636 5.027-2.636 1.11-.628 2.019-2.21 2.019-3.51v-4.69c0-.719-.755-1.173-1.373-.819l-6.536 3.791a.978.978 0 00-.455.818z"
        fill="#E17F7F"
      />
    </Svg>
  );
}
function TotalCoins(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={20} cy={20} r={20} fill="#FFF0DA" />
      <Mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={9}
        y={9}
        width={22}
        height={22}>
        <Path d="M9 9h21.82v21.82H9V9z" fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        <Mask
          id="b"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.137 10.43l19.638-.446.358 20.002-19.63.436-.366-19.992z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#b)">
          <Mask
            id="c"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.138 10.43l19.638-.446.358 20.002-19.63.435-.366-19.992z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#c)">
            <Mask
              id="d"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.139 10.429l19.638-.445.358 20.001-19.63.436L9.14 10.43z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#d)">
              <Mask
                id="e"
                style={{
                  maskType: 'luminance',
                }}
                maskUnits="userSpaceOnUse"
                x={9}
                y={9}
                width={21}
                height={22}>
                <Path
                  d="M9.946 10.41l18.803-.426.367 20.371-18.803.426-.367-20.37z"
                  fill="#fff"
                />
              </Mask>
              <G mask="url(#e)">
                <Mask
                  id="f"
                  style={{
                    maskType: 'luminance',
                  }}
                  maskUnits="userSpaceOnUse"
                  x={9}
                  y={9}
                  width={21}
                  height={22}>
                  <Path
                    d="M9.943 10.41l18.803-.426.358 20.002-18.794.426-.367-20.002z"
                    fill="#fff"
                  />
                </Mask>
                <G mask="url(#f)">
                  <Path
                    d="M19.38 10.315l-.512.029a8.89 8.89 0 00-3.708 1.155 9.063 9.063 0 00-1.713 1.24 9.692 9.692 0 00-1.645 1.97 9.568 9.568 0 00-.98 1.99 10.397 10.397 0 00-.622 3.768c.102 5.493 4.364 9.85 9.546 9.727a8.8 8.8 0 003.52-.815 8.65 8.65 0 001.833-1.117 9.802 9.802 0 001.79-1.819c.426-.577.8-1.202 1.099-1.865a10.29 10.29 0 00.938-4.527c-.103-5.493-4.373-9.85-9.547-9.736z"
                    fill="#FFBD00"
                  />
                </G>
              </G>
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="g"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={9}
        y={9}
        width={20}
        height={22}>
        <Path d="M9 9h19.638v21.82H9V9z" fill="#fff" />
      </Mask>
      <G mask="url(#g)">
        <Mask
          id="h"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.137 10.43l19.638-.446.358 20.002-19.63.436-.366-19.992z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#h)">
          <Mask
            id="i"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.138 10.43l19.638-.446.358 20.002-19.63.435-.366-19.992z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#i)">
            <Mask
              id="j"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.139 10.429l19.638-.445.358 20.001-19.63.436L9.14 10.43z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#j)">
              <Path
                d="M18.532 10.212l-.52.028a9.17 9.17 0 00-2.387.53c-.452.171-.895.38-1.321.626-.009 0-.009.01-.017.01a6.212 6.212 0 00-.529.321 7.814 7.814 0 00-.707.521 9.235 9.235 0 00-.452.388 9.559 9.559 0 00-1.636 1.95c-.009.001-.009.01-.017.02a9.54 9.54 0 00-.972 1.989 10.22 10.22 0 00-.63 3.77c.102 5.492 4.372 9.849 9.546 9.735a8.806 8.806 0 003.52-.824 8.933 8.933 0 001.84-1.118s.01-.01.018-.01a9.88 9.88 0 001.764-1.808c.12-.17.247-.331.35-.502.17-.256.323-.511.46-.776.102-.18.196-.38.29-.569v-.019c.213-.464.392-.937.537-1.43.281-.985.426-2.017.4-3.096-.093-5.493-4.372-9.85-9.537-9.736z"
                fill="#FFDE50"
              />
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="k"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={9}
        y={11}
        width={18}
        height={18}>
        <Path d="M9 11.425h17.456v16.97H9v-16.97z" fill="#fff" />
      </Mask>
      <G mask="url(#k)">
        <Mask
          id="l"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.137 10.43l19.638-.446.358 20.002-19.63.436-.366-19.992z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#l)">
          <Mask
            id="m"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.138 10.43l19.638-.446.358 20.002-19.63.435-.366-19.992z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#m)">
            <Mask
              id="n"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.139 10.43l19.638-.446.358 20.002-19.63.435L9.14 10.43z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#n)">
              <Path
                d="M25.53 26.956c-.385.435-.81.833-1.262 1.193L10.962 14.587a9.566 9.566 0 011.075-1.392l13.492 13.76z"
                fill="#FFEA94"
              />
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="o"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={13}
        y={9}
        width={16}
        height={17}>
        <Path d="M13.364 9h15.273v16.971H13.364V9z" fill="#fff" />
      </Mask>
      <G mask="url(#o)">
        <Mask
          id="p"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.138 10.43l19.638-.445.358 20.001-19.63.436-.366-19.992z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#p)">
          <Mask
            id="q"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.14 10.43l19.638-.445.358 20.002-19.63.435L9.14 10.43z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#q)">
            <Mask
              id="r"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.14 10.43l19.638-.445.358 20.001-19.63.436L9.14 10.43z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#r)">
              <Path
                d="M27.67 23.045a10.55 10.55 0 01-.537 1.43v.019L14.288 11.406c.009 0 .009-.01.017-.01a8.98 8.98 0 011.321-.625L27.67 23.045z"
                fill="#FFEA94"
              />
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="s"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={11}
        y={11}
        width={18}
        height={15}>
        <Path d="M11.183 11.425H28.64V25.97H11.183V11.425z" fill="#fff" />
      </Mask>
      <G mask="url(#s)">
        <Mask
          id="t"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.14 10.43l19.638-.445.358 20.002-19.63.435L9.14 10.43z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#t)">
          <Mask
            id="u"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.14 10.43l19.638-.445.358 20.001-19.63.436L9.14 10.43z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#u)">
            <Mask
              id="v"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.142 10.43l19.639-.445.357 20.002-19.629.435-.367-19.992z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#v)">
              <Path
                d="M26.846 25.062c-.136.265-.29.521-.46.777l-13.33-13.59c.23-.19.46-.36.707-.521l13.083 13.334z"
                fill="#FFEA94"
              />
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="w"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={11}
        y={13}
        width={14}
        height={16}>
        <Path d="M11.183 13.85h13.092v14.546H11.183V13.85z" fill="#fff" />
      </Mask>
      <G mask="url(#w)">
        <Mask
          id="x"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.14 10.43l19.638-.445.358 20.002-19.63.435L9.14 10.43z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#x)">
          <Mask
            id="y"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.14 10.43l19.638-.445.358 20.001-19.63.436L9.14 10.43z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#y)">
            <Mask
              id="z"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.142 10.43l19.639-.445.357 20.001-19.629.436-.367-19.992z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#z)">
              <Path
                d="M14.897 25.48c1.261 1.278 2.847 1.96 4.458 2.045 1.61-.152 3.179-.91 4.39-2.245l-9.513-9.688c-2.173 2.955-1.935 7.235.665 9.887z"
                fill="#FAA300"
              />
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="A"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={11}
        y={11}
        width={9}
        height={18}>
        <Path d="M11.183 11.425h8.728v16.97h-8.728v-16.97z" fill="#fff" />
      </Mask>
      <G mask="url(#A)">
        <Mask
          id="B"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.14 10.43l19.638-.445.358 20.002-19.63.435L9.14 10.43z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#B)">
          <Mask
            id="C"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.14 10.43l19.638-.445.358 20.001-19.63.436L9.14 10.43z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#C)">
            <Mask
              id="D"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.142 10.43l19.639-.445.357 20.002-19.629.435-.367-19.992z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#D)">
              <Path
                d="M13.88 25.497c1.518 1.553 3.53 2.226 5.473 2.027-1.611-.085-3.197-.767-4.458-2.046-2.6-2.651-2.838-6.932-.665-9.887.154-.199.307-.397.477-.587 1.202-1.335 2.77-2.083 4.381-2.245-1.951-.113-3.937.654-5.403 2.274-2.677 2.945-2.583 7.633.196 10.464z"
                fill="#F68E00"
              />
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="E"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={13}
        y={11}
        width={14}
        height={15}>
        <Path d="M13.364 11.425h13.091V25.97H13.365V11.425z" fill="#fff" />
      </Mask>
      <G mask="url(#E)">
        <Mask
          id="F"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.138 10.43l19.638-.445.358 20.002-19.63.435-.366-19.992z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#F)">
          <Mask
            id="G"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.14 10.43l19.638-.445.358 20.002-19.63.435L9.14 10.43z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#G)">
            <Mask
              id="H"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.14 10.43l19.638-.445.358 20.001-19.63.436L9.14 10.43z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#H)">
              <Path
                d="M14.23 15.591l9.512 9.688c2.668-2.954 2.582-7.633-.196-10.474-1.253-1.278-2.847-1.96-4.458-2.045-1.611.16-3.18.909-4.381 2.244-.17.19-.324.388-.478.587z"
                fill="#FFBD00"
              />
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="I"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={13}
        y={16}
        width={14}
        height={10}>
        <Path d="M13.364 16.273h13.091v9.698H13.365v-9.698z" fill="#fff" />
      </Mask>
      <G mask="url(#I)">
        <Mask
          id="J"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.138 10.43l19.638-.445.358 20.002-19.63.435-.366-19.992z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#J)">
          <Mask
            id="K"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.14 10.43l19.638-.445.358 20.002-19.63.435L9.14 10.43z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#K)">
            <Mask
              id="L"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.14 10.43l19.638-.446.358 20.002-19.63.436L9.14 10.43z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#L)">
              <Path
                d="M22.931 16.377l-1.116 5.966-1.517-5.91-1.918.048-1.364 5.872-1.312-5.815-1.654.038 2.063 8.457 1.756-.038 1.474-6.392 1.713 6.326 1.713-.038 1.799-8.552-1.637.038z"
                fill="#F68E00"
              />
            </G>
          </G>
        </G>
      </G>
      <Mask
        id="M"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={13}
        y={16}
        width={12}
        height={10}>
        <Path d="M13.364 16.273h10.91v9.698h-10.91v-9.698z" fill="#fff" />
      </Mask>
      <G mask="url(#M)">
        <Mask
          id="N"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={9}
          width={21}
          height={22}>
          <Path
            d="M9.138 10.43l19.638-.445.358 20.002-19.63.435-.366-19.992z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#N)">
          <Mask
            id="O"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={9}
            y={9}
            width={21}
            height={22}>
            <Path
              d="M9.14 10.43l19.638-.445.358 20.002-19.63.435L9.14 10.43z"
              fill="#fff"
            />
          </Mask>
          <G mask="url(#O)">
            <Mask
              id="P"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={9}
              y={9}
              width={21}
              height={22}>
              <Path
                d="M9.14 10.43l19.638-.446.358 20.002-19.63.436L9.14 10.43z"
                fill="#fff"
              />
            </Mask>
            <G mask="url(#P)">
              <Path
                d="M22.633 16.51l-1.125 5.976-1.509-5.91-1.926.038-1.355 5.872-1.322-5.806-1.653.029 2.071 8.466 1.756-.037 1.474-6.393 1.714 6.317 1.713-.038 1.79-8.543-1.628.029z"
                fill="#FFEA94"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}
function SupportSvg(props) {
  return (
    <Svg
      width={350}
      height={204}
      viewBox="0 0 408 204"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_1_4883)">
        <Rect x={9} y={5} width={390} height={186} rx={13} fill="#F8F9FE" />
        <Path
          d="M38.5 34.792h-5.833a.63.63 0 01-.625-.625.63.63 0 01.625-.625H38.5a.63.63 0 01.625.625.63.63 0 01-.625.625zM36.317 38.125h-3.65a.63.63 0 01-.625-.625.63.63 0 01.625-.625h3.65a.63.63 0 01.625.625.63.63 0 01-.625.625zM37.667 29.625h-3.334c-.8 0-2.291 0-2.291-2.292 0-2.291 1.491-2.291 2.291-2.291h3.334c.8 0 2.291 0 2.291 2.291 0 .8 0 2.292-2.291 2.292zm-3.334-3.333c-.825 0-1.041 0-1.041 1.041 0 1.042.216 1.042 1.041 1.042h3.334c1.041 0 1.041-.217 1.041-1.042 0-1.041-.216-1.041-1.041-1.041h-3.334z"
          fill="#292D32"
        />
        <Path
          d="M38.5 42.958h-5c-4.683 0-5.625-2.15-5.625-5.625v-5c0-3.8 1.375-5.425 4.758-5.6a.63.63 0 01.659.592.618.618 0 01-.592.65c-2.367.133-3.575.842-3.575 4.358v5c0 3.084.608 4.375 4.375 4.375h5c3.767 0 4.375-1.291 4.375-4.375v-5c0-3.516-1.208-4.225-3.575-4.358a.63.63 0 01-.592-.658.63.63 0 01.659-.592c3.383.183 4.758 1.808 4.758 5.6v5c0 3.483-.942 5.633-5.625 5.633z"
          fill="#292D32"
        />
        <Path
          d="M55.281 28.878h6.468l-.007 1.288h-4.935v3.129h4.389v1.274h-4.389V39h-1.526V28.878zM61.99 39l3.654-10.122h1.652L70.943 39H69.43l-.952-2.653h-3.997L63.509 39h-1.52zm2.849-4.011h3.255l-1.617-4.641-1.638 4.641zm6.877-1.029c0-1.106.181-2.046.546-2.821.364-.78.88-1.374 1.546-1.785.668-.41 1.459-.616 2.373-.616.91 0 1.7.205 2.367.616.667.41 1.18 1.006 1.54 1.785.359.775.538 1.715.538 2.821 0 1.013-.151 1.888-.455 2.625a3.948 3.948 0 01-1.434 1.785c.154.35.394.614.72.791.332.182.698.28 1.1.294v1.246c-.36 0-.726-.04-1.1-.119a3.12 3.12 0 01-1.098-.483c-.355-.238-.686-.597-.994-1.078-.234.037-.444.065-.63.084a4.351 4.351 0 01-.553.035c-.91 0-1.7-.2-2.367-.602-.667-.401-1.185-.987-1.553-1.757-.365-.775-.546-1.715-.546-2.821zm1.652.028c0 1.349.245 2.331.735 2.947.494.616 1.187.924 2.079.924.89 0 1.581-.308 2.072-.924.494-.62.742-1.608.742-2.961 0-1.353-.245-2.35-.736-2.989-.485-.644-1.178-.966-2.079-.966-.9 0-1.596.322-2.085.966-.486.644-.728 1.645-.728 3.003zm8.635-1.631l.784-1.785-.63-.042v-1.652h1.736v1.449l-1.246 2.03h-.644zm5.456 6.783c-.504 0-.978-.08-1.421-.238a2.638 2.638 0 01-1.106-.749c-.294-.34-.478-.777-.553-1.309h1.337c.06.275.175.504.343.686.173.177.378.31.616.399.243.084.502.126.777.126.457 0 .826-.082 1.106-.245.285-.168.427-.425.427-.77 0-.247-.077-.446-.231-.595-.15-.15-.387-.259-.714-.329l-1.442-.343c-.597-.14-1.076-.362-1.435-.665-.36-.308-.541-.737-.546-1.288 0-.425.105-.803.315-1.134.215-.331.532-.59.952-.777.42-.191.943-.287 1.568-.287.817 0 1.472.182 1.967.546.495.364.751.891.77 1.582h-1.295a1.11 1.11 0 00-.455-.777c-.252-.191-.586-.287-1.001-.287-.43 0-.782.086-1.057.259-.275.168-.413.427-.413.777 0 .238.1.427.301.567.2.135.502.247.903.336l1.372.343c.355.093.646.217.875.371.229.15.408.315.539.497.13.182.222.371.273.567.056.196.084.38.084.553 0 .457-.117.85-.35 1.176-.229.322-.558.572-.987.749-.425.173-.931.259-1.519.259z"
          fill="#000"
        />
        <Path
          d="M366.91 42.67c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l6.52-6.52c.48-.48.48-1.26 0-1.74l-6.52-6.52a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l6.52 6.52c.51.51.8 1.2.8 1.93s-.28 1.42-.8 1.93l-6.52 6.52c-.15.14-.34.22-.53.22z"
          fill="#292D32"
        />
        <Path stroke="#E0E0E0" d="M26 65.5L382 65.5" />
        <Path
          d="M39.333 106.958h-6.666c-3.042 0-4.792-1.75-4.792-4.791v-8.334c0-3.041 1.75-4.791 4.792-4.791h6.666c3.042 0 4.792 1.75 4.792 4.791v8.334c0 3.041-1.75 4.791-4.792 4.791zm-6.666-16.666c-2.384 0-3.542 1.158-3.542 3.541v8.334c0 2.383 1.158 3.541 3.542 3.541h6.666c2.384 0 3.542-1.158 3.542-3.541v-8.334c0-2.383-1.158-3.541-3.542-3.541h-6.666z"
          fill="#292D32"
        />
        <Path
          d="M41.417 95.708H39.75a2.29 2.29 0 01-2.292-2.291V91.75a.63.63 0 01.625-.625.63.63 0 01.625.625v1.667c0 .575.467 1.041 1.042 1.041h1.667a.63.63 0 01.625.625.63.63 0 01-.625.625zM36 99.458h-3.333a.63.63 0 01-.625-.625.63.63 0 01.625-.625H36a.63.63 0 01.625.625.63.63 0 01-.625.625zM39.333 102.792h-6.666a.63.63 0 01-.625-.625.63.63 0 01.625-.625h6.666a.63.63 0 01.625.625.63.63 0 01-.625.625z"
          fill="#292D32"
        />
        <Path
          d="M58.816 103.14c-.48 0-.95-.061-1.407-.182a4.39 4.39 0 01-1.246-.539 3.311 3.311 0 01-.931-.903 2.851 2.851 0 01-.455-1.26h1.561c.08.364.236.67.469.917.238.247.53.434.875.56.345.126.721.189 1.127.189.448 0 .85-.061 1.204-.182.36-.126.644-.303.854-.532.21-.233.315-.513.315-.84 0-.294-.072-.544-.217-.749a1.598 1.598 0 00-.602-.511 3.5 3.5 0 00-.931-.329l-1.918-.434c-.751-.159-1.344-.453-1.778-.882-.43-.434-.646-1.008-.651-1.722-.005-.597.152-1.12.469-1.568.322-.448.76-.796 1.316-1.043.555-.252 1.188-.378 1.897-.378.826 0 1.519.138 2.079.413.565.275.992.64 1.281 1.092.29.448.436.936.441 1.463h-1.533c-.037-.43-.163-.77-.378-1.022a1.769 1.769 0 00-.812-.539 3.22 3.22 0 00-1.064-.168c-.28 0-.548.035-.805.105-.257.07-.483.173-.679.308a1.559 1.559 0 00-.469.504 1.344 1.344 0 00-.168.679c0 .345.117.625.35.84.233.215.663.399 1.288.553l1.876.427c.537.112.97.278 1.302.497.331.215.586.46.763.735.177.275.299.562.364.861.065.294.098.576.098.847 0 .523-.156.996-.469 1.421-.313.42-.758.754-1.337 1.001-.579.247-1.272.371-2.079.371zm8.361 0a3.664 3.664 0 01-1.043-.161 2.747 2.747 0 01-.889-.462 2.292 2.292 0 01-.616-.763 2.364 2.364 0 01-.224-1.057v-4.935h1.505v4.774c0 .434.135.786.406 1.057.27.271.679.406 1.225.406.495 0 .891-.128 1.19-.385.299-.261.448-.642.448-1.141v-4.711h1.491V103h-1.162l-.168-1.4c-.084.378-.236.681-.455.91a1.915 1.915 0 01-.77.49 2.811 2.811 0 01-.938.14zm5.502 2.114v-9.492h1.498l.014 1.204c.089-.159.203-.315.343-.469a2.652 2.652 0 011.162-.756c.252-.08.53-.119.833-.119.57 0 1.071.133 1.505.399.439.261.78.665 1.022 1.211.247.541.371 1.23.371 2.065 0 .84-.124 1.545-.37 2.114-.244.569-.591 1.001-1.044 1.295-.453.289-.99.434-1.61.434-.299 0-.567-.042-.805-.126a2.379 2.379 0 01-.63-.329 2.855 2.855 0 01-.469-.448 3.362 3.362 0 01-.315-.483v3.5H72.68zm3.41-3.255c.554 0 1.01-.215 1.364-.644.36-.434.54-1.111.54-2.03 0-.789-.167-1.412-.498-1.869-.327-.462-.796-.693-1.407-.693-.63 0-1.106.24-1.428.721-.322.476-.483 1.09-.483 1.841 0 .49.07.938.21 1.344.145.401.36.723.644.966.285.243.637.364 1.057.364zm4.944 3.255v-9.492h1.498l.014 1.204c.088-.159.203-.315.343-.469a2.652 2.652 0 011.162-.756c.252-.08.53-.119.833-.119.569 0 1.07.133 1.505.399.438.261.779.665 1.022 1.211.247.541.37 1.23.37 2.065 0 .84-.123 1.545-.37 2.114-.243.569-.59 1.001-1.043 1.295-.453.289-.99.434-1.61.434-.3 0-.567-.042-.805-.126a2.379 2.379 0 01-.63-.329 2.855 2.855 0 01-.47-.448 3.362 3.362 0 01-.314-.483v3.5h-1.505zm3.409-3.255c.555 0 1.01-.215 1.365-.644.359-.434.539-1.111.539-2.03 0-.789-.166-1.412-.497-1.869-.327-.462-.796-.693-1.407-.693-.63 0-1.106.24-1.428.721-.322.476-.483 1.09-.483 1.841 0 .49.07.938.21 1.344.144.401.359.723.644.966.284.243.637.364 1.057.364zm7.884 1.141c-.677 0-1.27-.145-1.778-.434a2.996 2.996 0 01-1.176-1.274c-.275-.555-.413-1.227-.413-2.016 0-.76.13-1.426.392-1.995.266-.57.651-1.01 1.155-1.323.504-.317 1.113-.476 1.827-.476.681 0 1.272.15 1.771.448.5.294.887.726 1.162 1.295.275.565.413 1.248.413 2.051 0 .733-.13 1.379-.392 1.939-.257.56-.635.999-1.134 1.316-.495.313-1.104.469-1.827.469zm.007-1.155c.41 0 .754-.107 1.03-.322.28-.219.49-.525.63-.917.14-.397.21-.854.21-1.372 0-.48-.064-.917-.19-1.309-.121-.397-.32-.712-.595-.945-.275-.233-.637-.35-1.085-.35-.42 0-.77.107-1.05.322-.28.21-.492.511-.637.903-.14.387-.21.847-.21 1.379 0 .471.063.905.19 1.302.125.397.328.714.608.952.28.238.646.357 1.1.357zM97.288 103v-7.238h1.435v1.484c.122-.355.29-.651.504-.889a2.271 2.271 0 011.96-.714c.089.01.159.028.21.056v1.442a.738.738 0 00-.238-.056 7.658 7.658 0 00-.245-.021 3.072 3.072 0 00-.868.049c-.26.056-.487.15-.679.28-.186.13-.33.301-.434.511a1.74 1.74 0 00-.147.742V103h-1.498zm9.54-6.16h-1.624l.007 4.319c0 .238.024.413.07.525a.385.385 0 00.252.21c.122.028.285.042.49.042h.847v.973c-.093.037-.233.07-.42.098a4.812 4.812 0 01-.707.042c-.536 0-.954-.072-1.253-.217a1.232 1.232 0 01-.616-.623c-.112-.275-.168-.607-.168-.994V96.84h-1.176v-1.078h1.218l.371-2.128h1.085v2.121h1.624v1.085z"
          fill="#000"
        />
        <Path
          d="M366.91 106.67c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l6.52-6.52c.48-.48.48-1.26 0-1.74l-6.52-6.52a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l6.52 6.52c.51.51.8 1.2.8 1.93s-.28 1.42-.8 1.93l-6.52 6.52c-.15.14-.34.22-.53.22z"
          fill="#292D32"
        />
        <Path stroke="#E0E0E0" d="M26 129.5L382 129.5" />
        <Path
          d="M36.842 170.75c-.5 0-1.275-.242-2.017-1.458l-1.466-2.375c-.142-.234-.575-.459-.842-.442l-2.783.142c-1.667.083-2.25-.609-2.459-1.025-.208-.417-.391-1.309.692-2.575l1.65-1.917c.167-.2.258-.633.183-.883l-.841-2.692c-.425-1.35.05-2.075.366-2.392.317-.316 1.05-.775 2.4-.325l2.459.809c.225.075.641.008.833-.125l2.567-1.85c1.175-.85 2.025-.625 2.416-.417.392.208 1.059.775 1.034 2.225l-.059 3.158c-.008.234.184.617.367.759l2.067 1.566c1.125.859 1.166 1.717 1.091 2.159-.075.441-.408 1.241-1.758 1.658l-2.692.842c-.25.075-.558.4-.625.65l-.641 2.45c-.425 1.608-1.259 1.966-1.725 2.033a.801.801 0 01-.217.025zm-4.3-5.525c.717 0 1.508.433 1.875 1.033l1.467 2.375c.416.684.791.892.991.859.192-.025.492-.342.7-1.109l.642-2.45c.175-.666.8-1.325 1.458-1.525l2.692-.841c.517-.159.85-.417.9-.684.05-.266-.183-.616-.617-.95l-2.066-1.566c-.509-.384-.875-1.15-.867-1.784l.058-3.158c.009-.558-.125-.975-.366-1.1-.242-.125-.65 0-1.109.325l-2.566 1.85c-.509.367-1.35.5-1.959.3l-2.458-.808c-.517-.167-.933-.159-1.125.033-.192.192-.208.608-.05 1.125l.842 2.692c.208.658.025 1.55-.425 2.066l-1.65 1.917c-.525.608-.609 1.033-.517 1.208.083.175.483.367 1.275.325l2.783-.141a.39.39 0 00.092.008zM44.258 170.958a.618.618 0 01-.442-.183l-2.525-2.525a.628.628 0 010-.883.628.628 0 01.884 0l2.525 2.525a.628.628 0 010 .883.618.618 0 01-.442.183z"
          fill="#292D32"
        />
        <Path
          d="M62.687 167h-1.575l-1.792-4.235h-2.541V167h-1.498v-10.122h4.018c.751 0 1.374.117 1.869.35.495.229.863.555 1.106.98.243.425.364.926.364 1.505 0 .546-.093 1.001-.28 1.365-.182.364-.42.66-.714.889a3.75 3.75 0 01-.917.539l1.96 4.494zm-3.794-5.446c.705 0 1.25-.152 1.638-.455.387-.308.581-.747.581-1.316 0-.56-.177-.985-.532-1.274-.35-.289-.826-.434-1.428-.434h-2.373v3.479h2.114zm7.558 5.586c-.466 0-.882-.084-1.246-.252a1.988 1.988 0 01-.847-.728c-.205-.317-.308-.7-.308-1.148 0-.803.285-1.402.854-1.799.57-.397 1.477-.607 2.723-.63l1.19-.035v-.525c0-.415-.123-.742-.37-.98-.248-.238-.628-.355-1.142-.35-.387 0-.732.089-1.036.266-.298.177-.494.469-.588.875H64.38c.028-.481.166-.884.413-1.211a2.299 2.299 0 011.036-.749c.439-.168.955-.252 1.547-.252.658 0 1.2.091 1.624.273.425.177.74.439.945.784.21.345.315.765.315 1.26V167h-1.267l-.119-1.33c-.27.555-.613.94-1.029 1.155-.41.21-.875.315-1.393.315zm.47-1.043c.228 0 .454-.04.678-.119.224-.084.427-.196.61-.336.181-.145.326-.306.433-.483a1.06 1.06 0 00.175-.546v-1.197l-.98.021c-.5.005-.924.056-1.274.154-.345.098-.611.25-.798.455-.182.205-.273.478-.273.819 0 .387.136.691.406.91.27.215.612.322 1.022.322zm8.981-5.257h-1.624l.007 4.319c0 .238.024.413.07.525a.382.382 0 00.252.21c.122.028.285.042.49.042h.848v.973c-.094.037-.234.07-.42.098a4.819 4.819 0 01-.708.042c-.536 0-.954-.072-1.252-.217a1.23 1.23 0 01-.617-.623c-.111-.275-.167-.607-.167-.994v-4.375h-1.177v-1.078h1.219l.37-2.128h1.085v2.121h1.624v1.085zm2.71 2.891c0 .434.07.824.21 1.169.145.341.362.611.65.812.29.196.65.294 1.079.294.43 0 .8-.098 1.113-.294.317-.196.525-.488.623-.875h1.386a2.44 2.44 0 01-.595 1.26 2.97 2.97 0 01-1.12.784 3.725 3.725 0 01-1.38.259c-.685 0-1.29-.147-1.812-.441a3.13 3.13 0 01-1.225-1.274c-.29-.551-.434-1.206-.434-1.967 0-.751.133-1.414.399-1.988a3.138 3.138 0 011.155-1.358c.504-.327 1.11-.49 1.82-.49.7 0 1.288.149 1.764.448.48.299.845.719 1.092 1.26.247.537.37 1.171.37 1.904v.497h-5.095zm0-.973h3.668c0-.378-.065-.721-.196-1.029a1.583 1.583 0 00-.602-.735c-.266-.182-.602-.273-1.008-.273-.415 0-.76.1-1.036.301a1.895 1.895 0 00-.623.77 2.412 2.412 0 00-.203.966zm17.705.644c0 .789-.13 1.463-.392 2.023-.26.555-.672.98-1.232 1.274-.555.294-1.28.441-2.177.441-.905 0-1.638-.149-2.198-.448a2.701 2.701 0 01-1.218-1.309c-.252-.574-.378-1.274-.378-2.1v-6.405h1.547v6.594c0 .803.196 1.4.588 1.792.397.387.95.581 1.66.581.47 0 .877-.084 1.217-.252.346-.173.61-.434.791-.784.182-.355.273-.8.273-1.337v-6.594h1.52v6.524zm4.691 3.738c-.504 0-.978-.079-1.421-.238a2.638 2.638 0 01-1.106-.749c-.294-.341-.478-.777-.553-1.309h1.337c.06.275.175.504.343.686.172.177.378.31.616.399.243.084.502.126.777.126.457 0 .826-.082 1.106-.245.285-.168.427-.425.427-.77 0-.247-.077-.446-.231-.595-.149-.149-.387-.259-.714-.329l-1.442-.343c-.598-.14-1.076-.362-1.435-.665-.36-.308-.541-.737-.546-1.288 0-.425.105-.803.315-1.134.215-.331.532-.59.952-.777.42-.191.943-.287 1.568-.287.817 0 1.472.182 1.967.546.495.364.751.891.77 1.582h-1.295a1.111 1.111 0 00-.455-.777c-.252-.191-.586-.287-1.001-.287-.429 0-.782.086-1.057.259-.276.168-.413.427-.413.777 0 .238.1.427.3.567.202.135.503.247.904.336l1.372.343c.355.093.646.217.875.371.229.149.408.315.539.497.131.182.222.371.273.567.056.196.084.38.084.553 0 .457-.117.849-.35 1.176-.229.322-.558.572-.987.749-.425.173-.931.259-1.519.259z"
          fill="#000"
        />
        <Path
          d="M366.91 170.67c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l6.52-6.52c.48-.48.48-1.26 0-1.74l-6.52-6.52a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l6.52 6.52c.51.51.8 1.2.8 1.93s-.28 1.42-.8 1.93l-6.52 6.52c-.15.14-.34.22-.53.22z"
          fill="#292D32"
        />
        <Rect
          x={9}
          y={5}
          width={390}
          height={186}
          rx={13}
          stroke="#fff"
          strokeWidth={2}
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}
function OtherSVG(props) {
  return (
    <Svg
      width={350}
      height={204}
      viewBox="0 0 408 204"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_1_4635)">
        <Rect x={9} y={5} width={390} height={186} rx={13} fill="#F8F9FE" />
        <Path
          d="M31.108 28.326c-.608-1.105-1.954-1.484-3.007-.846-1.053.638-1.414 2.052-.806 3.158l1.883 3.461 1.837-3.306a2.41 2.41 0 00.093-2.467zm-1.902 2.03c-.453 0-.82-.39-.82-.873s.367-.874.82-.874c.453 0 .82.39.82.873s-.367.874-.82.874zM42.472 27.198c-.49.236-.756.674-.984 1.14-1.087 2.225-2.179 4.447-3.26 6.674-.57 1.173-1.168 2.336-1.668 3.538-.437 1.055.476 2.275 1.745 2.264.512-.087 1.092-.267 1.41-.913.92-1.876 1.853-3.747 2.78-5.62.781-1.582 1.573-3.159 2.336-4.75.33-.687.157-1.542-.345-2.018-.561-.533-1.307-.655-2.014-.315zM38.542 27.895c-.346-.602-.91-.91-1.561-.894-.742.018-1.283.442-1.619 1.132-1.53 3.148-3.078 6.287-4.607 9.436-.228.468-.533.92-.514 1.304-.009 1.02.527 1.663 1.465 1.933.541.156 1.38-.214 1.724-.831.395-.705.734-1.441 1.092-2.167 1.335-2.708 2.66-5.42 4.007-8.123.304-.611.358-1.19.013-1.79z"
          fill="#292D32"
        />
        <Path
          d="M54.525 39l3.654-10.122h1.652L63.478 39h-1.512l-.952-2.653h-3.997L56.044 39h-1.519zm2.849-4.011h3.255l-1.617-4.641-1.638 4.641zm11.352 4.151c-.406 0-.751-.054-1.036-.161a2.208 2.208 0 01-.707-.413 2.264 2.264 0 01-.434-.532 3.517 3.517 0 01-.238-.518L66.15 39h-1.127V28.598h1.512v4.263a2.12 2.12 0 01.287-.406c.13-.145.291-.28.483-.406a2.75 2.75 0 01.679-.308c.257-.08.546-.119.868-.119.9 0 1.614.317 2.142.952.532.635.798 1.559.798 2.772 0 .765-.115 1.433-.343 2.002-.229.565-.572 1.006-1.03 1.323-.452.313-1.016.469-1.693.469zm-.294-1.127c.55 0 .998-.215 1.344-.644.35-.43.525-1.12.525-2.072 0-.821-.163-1.449-.49-1.883-.322-.434-.789-.651-1.4-.651-.439 0-.796.098-1.071.294-.276.191-.478.476-.61.854-.125.378-.19.84-.195 1.386 0 .966.15 1.661.448 2.086.298.42.781.63 1.449.63zm7.898 1.127c-.677 0-1.27-.145-1.778-.434a2.995 2.995 0 01-1.176-1.274c-.275-.555-.413-1.227-.413-2.016 0-.76.13-1.426.392-1.995.266-.57.651-1.01 1.155-1.323.504-.317 1.113-.476 1.827-.476.681 0 1.272.15 1.771.448.5.294.887.726 1.162 1.295.275.565.413 1.248.413 2.051 0 .733-.13 1.379-.392 1.939-.257.56-.635.999-1.134 1.316-.495.313-1.104.469-1.827.469zm.007-1.155c.41 0 .754-.107 1.029-.322.28-.22.49-.525.63-.917.14-.397.21-.854.21-1.372 0-.48-.063-.917-.189-1.309-.121-.397-.32-.712-.595-.945-.275-.233-.637-.35-1.085-.35-.42 0-.77.107-1.05.322-.28.21-.492.511-.637.903-.14.387-.21.847-.21 1.379 0 .471.063.905.189 1.302s.329.714.609.952c.28.238.646.357 1.099.357zm7.506 1.155a3.664 3.664 0 01-1.043-.161 2.735 2.735 0 01-.889-.462 2.292 2.292 0 01-.616-.763 2.364 2.364 0 01-.224-1.057v-4.935h1.505v4.774c0 .434.135.786.406 1.057.27.27.679.406 1.225.406.495 0 .891-.128 1.19-.385.299-.261.448-.642.448-1.141v-4.711h1.491V39h-1.162l-.168-1.4c-.084.378-.236.681-.455.91a1.912 1.912 0 01-.77.49 2.82 2.82 0 01-.938.14zm9.368-6.3h-1.624l.007 4.319c0 .238.023.413.07.525a.38.38 0 00.252.21c.121.028.285.042.49.042h.847v.973c-.093.037-.233.07-.42.098a4.818 4.818 0 01-.707.042c-.537 0-.954-.072-1.253-.217a1.231 1.231 0 01-.616-.623c-.112-.275-.168-.607-.168-.994V32.84h-1.176v-1.078h1.218l.371-2.128h1.085v2.121h1.624v1.085zm16.706-3.962L106.956 39h-1.316l-2.135-7.511L101.342 39h-1.281l-2.933-10.122h1.498l2.142 7.686 2.17-7.686h1.148l2.17 7.686 2.17-7.686h1.491zm2.704 10.262c-.466 0-.882-.084-1.246-.252a1.992 1.992 0 01-.847-.728c-.205-.317-.308-.7-.308-1.148 0-.803.285-1.402.854-1.799.57-.397 1.477-.607 2.723-.63l1.19-.035v-.525c0-.415-.123-.742-.371-.98-.247-.238-.627-.355-1.141-.35-.387 0-.732.089-1.036.266-.298.177-.494.469-.588.875h-1.302c.028-.48.166-.884.413-1.211.252-.331.598-.581 1.036-.749.439-.168.955-.252 1.547-.252.658 0 1.2.091 1.624.273.425.177.74.439.945.784.21.345.315.765.315 1.26V39h-1.267l-.119-1.33c-.27.555-.613.94-1.029 1.155-.41.21-.875.315-1.393.315zm.469-1.043c.229 0 .455-.04.679-.119.224-.084.427-.196.609-.336.182-.145.327-.306.434-.483.112-.177.171-.36.175-.546v-1.197l-.98.021c-.499.005-.924.056-1.274.154-.345.098-.611.25-.798.455-.182.205-.273.478-.273.819 0 .387.136.69.406.91.271.215.612.322 1.022.322zm7.447 1.043c-.466 0-.882-.084-1.246-.252a1.992 1.992 0 01-.847-.728c-.205-.317-.308-.7-.308-1.148 0-.803.285-1.402.854-1.799.57-.397 1.477-.607 2.723-.63l1.19-.035v-.525c0-.415-.123-.742-.371-.98-.247-.238-.627-.355-1.141-.35-.387 0-.732.089-1.036.266-.298.177-.494.469-.588.875h-1.302c.028-.48.166-.884.413-1.211.252-.331.598-.581 1.036-.749.439-.168.955-.252 1.547-.252.658 0 1.2.091 1.624.273.425.177.74.439.945.784.21.345.315.765.315 1.26V39h-1.267l-.119-1.33c-.27.555-.613.94-1.029 1.155-.41.21-.875.315-1.393.315zm.469-1.043c.229 0 .455-.04.679-.119.224-.084.427-.196.609-.336.182-.145.327-.306.434-.483.112-.177.171-.36.175-.546v-1.197l-.98.021c-.499.005-.924.056-1.274.154-.345.098-.611.25-.798.455-.182.205-.273.478-.273.819 0 .387.136.69.406.91.271.215.612.322 1.022.322zm11.976.903h-1.554l-2.177-3.493-1.302 1.351V39h-1.498V28.598h1.498v6.615l3.199-3.451h1.68l-2.618 2.793L132.982 39zm3.008-7.238V39h-1.442v-7.238h1.442zm.028-2.877v1.477h-1.505v-1.477h1.505zm6.301 2.877v1.078h-1.694V39h-1.505v-6.16h-1.477v-1.078h1.477v-1.099c0-.579.154-1.02.462-1.323.308-.308.761-.462 1.358-.462h1.442l.007 1.036h-1.043c-.289 0-.488.077-.595.231-.103.15-.154.38-.154.693v.924h1.722z"
          fill="#000"
        />
        <Path
          d="M366.91 42.67c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l6.52-6.52c.48-.48.48-1.26 0-1.74l-6.52-6.52a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l6.52 6.52c.51.51.8 1.2.8 1.93s-.28 1.42-.8 1.93l-6.52 6.52c-.15.14-.34.22-.53.22z"
          fill="#292D32"
        />
        <Path stroke="#E0E0E0" d="M26 65.5L382 65.5" />
        <Path
          d="M40.683 96.017h-4.375a.63.63 0 01-.625-.625.63.63 0 01.625-.625h4.375a.624.624 0 110 1.25zM31.933 96.65a.618.618 0 01-.441-.183l-.625-.625a.629.629 0 010-.884.629.629 0 01.883 0l.183.184 1.434-1.434a.629.629 0 01.883 0 .629.629 0 010 .884l-1.875 1.875a.625.625 0 01-.442.183zM40.683 101.85h-4.375a.63.63 0 01-.625-.625.63.63 0 01.625-.625h4.375a.624.624 0 110 1.25zM31.933 102.483a.618.618 0 01-.441-.183l-.625-.625a.628.628 0 010-.883.628.628 0 01.883 0l.183.183 1.434-1.433a.629.629 0 01.883 0 .629.629 0 010 .883l-1.875 1.875a.623.623 0 01-.442.183z"
          fill="#292D32"
        />
        <Path
          d="M38.5 106.958h-5c-4.525 0-6.458-1.933-6.458-6.458v-5c0-4.525 1.933-6.458 6.458-6.458h5c4.525 0 6.458 1.933 6.458 6.458v5c0 4.525-1.933 6.458-6.458 6.458zm-5-16.666c-3.842 0-5.208 1.366-5.208 5.208v5c0 3.842 1.366 5.208 5.208 5.208h5c3.842 0 5.208-1.366 5.208-5.208v-5c0-3.842-1.366-5.208-5.208-5.208h-5z"
          fill="#292D32"
        />
        <Path
          d="M54.308 94.243v-1.365h7.777v1.365h-3.059V103h-1.512v-8.757h-3.206zm9.237 5.488c0 .434.07.824.21 1.169.145.341.362.611.651.812.29.196.65.294 1.078.294.43 0 .8-.098 1.114-.294.317-.196.525-.488.623-.875h1.385a2.44 2.44 0 01-.594 1.26 2.97 2.97 0 01-1.12.784 3.725 3.725 0 01-1.38.259c-.686 0-1.29-.147-1.813-.441a3.13 3.13 0 01-1.224-1.274c-.29-.551-.434-1.206-.434-1.967 0-.751.133-1.414.399-1.988a3.138 3.138 0 011.154-1.358c.505-.327 1.111-.49 1.82-.49.7 0 1.288.15 1.764.448.481.299.845.719 1.093 1.26.247.537.37 1.171.37 1.904v.497h-5.096zm0-.973h3.668c0-.378-.065-.721-.195-1.029a1.586 1.586 0 00-.603-.735c-.266-.182-.602-.273-1.008-.273-.415 0-.76.1-1.035.301-.276.2-.483.457-.623.77a2.41 2.41 0 00-.204.966zM70.314 103v-7.238h1.435v1.484c.121-.355.29-.651.504-.889a2.272 2.272 0 011.96-.714c.088.01.158.028.21.056v1.442a.742.742 0 00-.238-.056 7.732 7.732 0 00-.245-.021 3.07 3.07 0 00-.868.049c-.261.056-.488.15-.68.28-.186.13-.33.301-.433.511a1.74 1.74 0 00-.147.742V103h-1.498zm5.496 0v-7.238h1.456v1.043a2.84 2.84 0 01.84-.826c.355-.238.812-.357 1.372-.357.261 0 .525.044.79.133.272.089.519.222.743.399.229.173.408.387.539.644.229-.345.534-.628.917-.847.383-.22.812-.329 1.288-.329.257 0 .523.042.798.126.275.08.53.217.763.413.238.191.43.457.574.798.15.34.224.772.224 1.295V103h-1.505v-4.585c0-.397-.068-.707-.203-.931a1.067 1.067 0 00-.518-.469 1.636 1.636 0 00-.672-.14c-.215 0-.439.042-.672.126a1.366 1.366 0 00-.595.42c-.163.196-.245.462-.245.798V103h-1.498v-4.907c0-.266-.072-.49-.217-.672a1.272 1.272 0 00-.532-.406 1.54 1.54 0 00-.63-.14c-.233 0-.467.047-.7.14-.233.093-.43.24-.588.441-.154.196-.231.45-.231.763V103H75.81zm14.766.14c-.504 0-.977-.079-1.42-.238a2.638 2.638 0 01-1.107-.749c-.294-.341-.478-.777-.553-1.309h1.337c.06.275.175.504.343.686.173.177.378.31.616.399.243.084.502.126.777.126.457 0 .826-.082 1.106-.245.285-.168.427-.425.427-.77 0-.247-.077-.446-.23-.595-.15-.149-.388-.259-.715-.329l-1.442-.343c-.597-.14-1.076-.362-1.435-.665-.36-.308-.541-.737-.546-1.288 0-.425.105-.803.315-1.134.215-.331.532-.59.952-.777.42-.191.943-.287 1.568-.287.817 0 1.472.182 1.967.546.495.364.751.891.77 1.582h-1.295a1.11 1.11 0 00-.455-.777c-.252-.191-.585-.287-1-.287-.43 0-.782.086-1.058.259-.275.168-.413.427-.413.777 0 .238.1.427.301.567.2.135.502.247.903.336l1.372.343c.355.093.647.217.875.371.229.15.409.315.54.497.13.182.22.371.272.567.056.196.084.38.084.553 0 .457-.117.849-.35 1.176-.228.322-.557.572-.987.749-.424.173-.93.259-1.519.259zm9.686 0c-.467 0-.882-.084-1.246-.252a1.988 1.988 0 01-.847-.728c-.206-.317-.308-.7-.308-1.148 0-.803.284-1.402.854-1.799.57-.397 1.477-.607 2.723-.63l1.19-.035v-.525c0-.415-.124-.742-.371-.98-.248-.238-.628-.355-1.141-.35-.388 0-.733.089-1.036.266-.299.177-.495.469-.588.875H98.19c.028-.48.166-.884.413-1.211.252-.331.597-.581 1.036-.749.438-.168.954-.252 1.547-.252.658 0 1.199.091 1.624.273.424.177.739.439.945.784.21.345.315.765.315 1.26V103h-1.267l-.119-1.33c-.271.555-.614.94-1.029 1.155-.411.21-.875.315-1.393.315zm.469-1.043c.228 0 .455-.04.679-.119.224-.084.427-.196.609-.336.182-.145.326-.306.434-.483.112-.177.17-.359.175-.546v-1.197l-.98.021c-.5.005-.924.056-1.274.154-.346.098-.611.25-.798.455-.182.205-.273.478-.273.819 0 .387.135.691.406.91.27.215.611.322 1.022.322zm5.444.903v-7.238h1.463v1.043c.117-.196.273-.38.469-.553.201-.173.446-.313.735-.42a2.95 2.95 0 011.015-.161c.453 0 .87.091 1.253.273.387.177.698.457.931.84.233.378.35.868.35 1.47V103h-1.498v-4.585c0-.518-.14-.903-.42-1.155-.275-.252-.632-.378-1.071-.378a2.41 2.41 0 00-.84.147 1.46 1.46 0 00-.644.448c-.163.196-.245.443-.245.742V103h-1.498zm10.774.14c-.952 0-1.701-.324-2.247-.973-.546-.653-.819-1.594-.819-2.821 0-.751.11-1.405.329-1.96.219-.56.546-.994.98-1.302.439-.308.98-.462 1.624-.462.327 0 .616.04.868.119.257.08.481.182.672.308.196.126.357.261.483.406.131.145.231.28.301.406v-4.263h1.505V103h-1.12l-.168-1.484a2.76 2.76 0 01-.238.518 2.17 2.17 0 01-.441.532 2.113 2.113 0 01-.7.413c-.285.107-.628.161-1.029.161zm.287-1.127c.672 0 1.157-.21 1.456-.63.299-.425.448-1.12.448-2.086-.005-.546-.072-1.008-.203-1.386-.131-.378-.334-.663-.609-.854-.271-.196-.628-.294-1.071-.294-.555 0-1.008.2-1.358.602-.35.397-.525 1.04-.525 1.932 0 .877.159 1.549.476 2.016.322.467.784.7 1.386.7zm12.694-9.275c.728 0 1.375.15 1.939.448.565.299 1.018.7 1.358 1.204.346.504.551 1.062.616 1.673h-1.596a2.793 2.793 0 00-.406-1.036 2.079 2.079 0 00-.784-.735c-.326-.182-.714-.273-1.162-.273-.574 0-1.061.135-1.463.406-.401.27-.707.693-.917 1.267-.205.574-.308 1.314-.308 2.219 0 1.367.231 2.368.693 3.003.462.63 1.127.945 1.995.945.448 0 .836-.096 1.162-.287a2.27 2.27 0 00.784-.777c.201-.327.336-.681.406-1.064h1.596c-.056.443-.172.87-.35 1.281-.177.406-.424.77-.742 1.092a3.319 3.319 0 01-1.169.763c-.466.182-1.017.273-1.652.273-.914 0-1.698-.21-2.352-.63-.653-.425-1.155-1.027-1.505-1.806-.345-.784-.518-1.722-.518-2.814 0-1.087.173-2.014.518-2.779.346-.77.845-1.358 1.498-1.764.654-.406 1.44-.609 2.359-.609zm8.58 10.402c-.677 0-1.27-.145-1.778-.434a2.996 2.996 0 01-1.176-1.274c-.276-.555-.413-1.227-.413-2.016 0-.76.13-1.426.392-1.995.266-.57.651-1.01 1.155-1.323.504-.317 1.113-.476 1.827-.476.681 0 1.271.15 1.771.448.499.294.886.726 1.162 1.295.275.565.413 1.248.413 2.051 0 .733-.131 1.379-.392 1.939-.257.56-.635.999-1.134 1.316-.495.313-1.104.469-1.827.469zm.007-1.155c.41 0 .753-.107 1.029-.322.28-.219.49-.525.63-.917.14-.397.21-.854.21-1.372 0-.48-.063-.917-.189-1.309-.122-.397-.32-.712-.595-.945-.276-.233-.637-.35-1.085-.35-.42 0-.77.107-1.05.322-.28.21-.493.511-.637.903-.14.387-.21.847-.21 1.379 0 .471.063.905.189 1.302s.329.714.609.952c.28.238.646.357 1.099.357zm4.955 1.015v-7.238h1.463v1.043c.117-.196.273-.38.469-.553.201-.173.446-.313.735-.42a2.95 2.95 0 011.015-.161c.453 0 .87.091 1.253.273.387.177.698.457.931.84.233.378.35.868.35 1.47V103h-1.498v-4.585c0-.518-.14-.903-.42-1.155-.275-.252-.632-.378-1.071-.378a2.41 2.41 0 00-.84.147 1.46 1.46 0 00-.644.448c-.163.196-.245.443-.245.742V103h-1.498zm10.774.14c-.952 0-1.701-.324-2.247-.973-.546-.653-.819-1.594-.819-2.821 0-.751.109-1.405.329-1.96.219-.56.546-.994.98-1.302.438-.308.98-.462 1.624-.462.326 0 .616.04.868.119.256.08.48.182.672.308.196.126.357.261.483.406.13.145.231.28.301.406v-4.263h1.505V103h-1.12l-.168-1.484a2.825 2.825 0 01-.238.518 2.216 2.216 0 01-.441.532 2.124 2.124 0 01-.7.413c-.285.107-.628.161-1.029.161zm.287-1.127c.672 0 1.157-.21 1.456-.63.298-.425.448-1.12.448-2.086-.005-.546-.073-1.008-.203-1.386-.131-.378-.334-.663-.609-.854-.271-.196-.628-.294-1.071-.294-.556 0-1.008.2-1.358.602-.35.397-.525 1.04-.525 1.932 0 .877.158 1.549.476 2.016.322.467.784.7 1.386.7zm7.105-6.251V103h-1.442v-7.238h1.442zm.028-2.877v1.477h-1.505v-1.477h1.505zm6.07 3.955h-1.624l.007 4.319c0 .238.024.413.07.525a.385.385 0 00.252.21c.122.028.285.042.49.042h.847v.973c-.093.037-.233.07-.42.098a4.812 4.812 0 01-.707.042c-.536 0-.954-.072-1.253-.217a1.232 1.232 0 01-.616-.623c-.112-.275-.168-.607-.168-.994V96.84h-1.176v-1.078h1.218l.371-2.128h1.085v2.121h1.624v1.085zm3.349-1.078V103h-1.442v-7.238h1.442zm.028-2.877v1.477h-1.505v-1.477h1.505zm5.063 10.255c-.677 0-1.27-.145-1.778-.434a2.996 2.996 0 01-1.176-1.274c-.276-.555-.413-1.227-.413-2.016 0-.76.13-1.426.392-1.995.266-.57.651-1.01 1.155-1.323.504-.317 1.113-.476 1.827-.476.681 0 1.271.15 1.771.448.499.294.886.726 1.162 1.295.275.565.413 1.248.413 2.051 0 .733-.131 1.379-.392 1.939-.257.56-.635.999-1.134 1.316-.495.313-1.104.469-1.827.469zm.007-1.155c.41 0 .753-.107 1.029-.322.28-.219.49-.525.63-.917.14-.397.21-.854.21-1.372 0-.48-.063-.917-.189-1.309-.122-.397-.32-.712-.595-.945-.276-.233-.637-.35-1.085-.35-.42 0-.77.107-1.05.322-.28.21-.493.511-.637.903-.14.387-.21.847-.21 1.379 0 .471.063.905.189 1.302s.329.714.609.952c.28.238.646.357 1.099.357zm4.955 1.015v-7.238h1.463v1.043c.117-.196.273-.38.469-.553.201-.173.446-.313.735-.42a2.95 2.95 0 011.015-.161c.453 0 .87.091 1.253.273.387.177.698.457.931.84.233.378.35.868.35 1.47V103h-1.498v-4.585c0-.518-.14-.903-.42-1.155-.275-.252-.632-.378-1.071-.378a2.41 2.41 0 00-.84.147 1.46 1.46 0 00-.644.448c-.163.196-.245.443-.245.742V103h-1.498zm10.678.14a4.18 4.18 0 01-1.421-.238 2.644 2.644 0 01-1.106-.749c-.294-.341-.478-.777-.553-1.309h1.337c.061.275.175.504.343.686.173.177.378.31.616.399.243.084.502.126.777.126.458 0 .826-.082 1.106-.245.285-.168.427-.425.427-.77 0-.247-.077-.446-.231-.595-.149-.149-.387-.259-.714-.329l-1.442-.343c-.597-.14-1.075-.362-1.435-.665-.359-.308-.541-.737-.546-1.288 0-.425.105-.803.315-1.134.215-.331.532-.59.952-.777.42-.191.943-.287 1.568-.287.817 0 1.473.182 1.967.546.495.364.752.891.77 1.582h-1.295a1.107 1.107 0 00-.455-.777c-.252-.191-.585-.287-1.001-.287-.429 0-.781.086-1.057.259-.275.168-.413.427-.413.777 0 .238.101.427.301.567.201.135.502.247.903.336l1.372.343c.355.093.647.217.875.371.229.15.409.315.539.497.131.182.222.371.273.567.056.196.084.38.084.553 0 .457-.116.849-.35 1.176-.228.322-.557.572-.987.749-.424.173-.931.259-1.519.259z"
          fill="#000"
        />
        <Path
          d="M366.91 106.67c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l6.52-6.52c.48-.48.48-1.26 0-1.74l-6.52-6.52a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l6.52 6.52c.51.51.8 1.2.8 1.93s-.28 1.42-.8 1.93l-6.52 6.52c-.15.14-.34.22-.53.22z"
          fill="#292D32"
        />
        <Path stroke="#E0E0E0" d="M26 129.5L382 129.5" />
        <Path
          d="M39.333 170.958h-6.666c-3.042 0-4.792-1.75-4.792-4.791v-8.334c0-3.041 1.75-4.791 4.792-4.791h6.666c3.042 0 4.792 1.75 4.792 4.791v8.334c0 3.041-1.75 4.791-4.792 4.791zm-6.666-16.666c-2.384 0-3.542 1.158-3.542 3.541v8.334c0 2.383 1.158 3.541 3.542 3.541h6.666c2.384 0 3.542-1.158 3.542-3.541v-8.334c0-2.383-1.158-3.541-3.542-3.541h-6.666z"
          fill="#292D32"
        />
        <Path
          d="M41.417 159.708H39.75a2.29 2.29 0 01-2.292-2.291v-1.667a.63.63 0 01.625-.625.63.63 0 01.625.625v1.667c0 .575.467 1.041 1.042 1.041h1.667a.63.63 0 01.625.625.63.63 0 01-.625.625zM36 163.458h-3.333a.63.63 0 01-.625-.625.63.63 0 01.625-.625H36a.63.63 0 01.625.625.63.63 0 01-.625.625zM39.333 166.792h-6.666a.63.63 0 01-.625-.625.63.63 0 01.625-.625h6.666a.63.63 0 01.625.625.63.63 0 01-.625.625z"
          fill="#292D32"
        />
        <Path
          d="M55.281 167v-10.122h3.507c.723 0 1.37.124 1.939.371a3.043 3.043 0 011.351 1.092c.331.481.497 1.071.497 1.771 0 .672-.152 1.246-.455 1.722a2.902 2.902 0 01-1.26 1.085c-.537.247-1.16.371-1.869.371h-2.184V167h-1.526zm1.519-4.935h2.149c.644 0 1.169-.184 1.575-.553.406-.373.609-.868.609-1.484 0-.625-.21-1.104-.63-1.435-.42-.336-.957-.504-1.61-.504H56.8v3.976zM63.984 167v-7.238h1.435v1.484c.121-.355.29-.651.504-.889a2.272 2.272 0 011.96-.714.562.562 0 01.21.056v1.442a.735.735 0 00-.238-.056 10.091 10.091 0 00-.245-.021 3.08 3.08 0 00-.868.049 1.887 1.887 0 00-.68.28 1.322 1.322 0 00-.433.511c-.098.21-.147.457-.147.742V167h-1.498zm7.078-7.238V167H69.62v-7.238h1.442zm.028-2.877v1.477h-1.505v-1.477h1.505zm7.932 2.877L76.39 167h-1.267l-2.639-7.238h1.386l1.834 5.341h.098l1.834-5.341h1.386zm3.07 7.378c-.467 0-.882-.084-1.246-.252a1.988 1.988 0 01-.847-.728c-.206-.317-.308-.7-.308-1.148 0-.803.284-1.402.854-1.799.57-.397 1.477-.607 2.723-.63l1.19-.035v-.525c0-.415-.124-.742-.371-.98-.248-.238-.628-.355-1.141-.35-.388 0-.733.089-1.036.266-.299.177-.495.469-.588.875H80.02c.028-.481.166-.884.413-1.211a2.299 2.299 0 011.036-.749c.439-.168.954-.252 1.547-.252.658 0 1.2.091 1.624.273.424.177.74.439.945.784.21.345.315.765.315 1.26V167h-1.267l-.12-1.33c-.27.555-.613.94-1.028 1.155-.41.21-.875.315-1.393.315zm.469-1.043c.228 0 .455-.04.679-.119.224-.084.427-.196.609-.336.182-.145.326-.306.434-.483a1.06 1.06 0 00.175-.546v-1.197l-.98.021c-.5.005-.924.056-1.274.154-.345.098-.611.25-.798.455-.182.205-.273.478-.273.819 0 .387.135.691.406.91.27.215.611.322 1.022.322zm8.391-6.475c.542 0 1.022.107 1.442.322.425.21.768.504 1.03.882.26.378.42.819.475 1.323h-1.295a1.689 1.689 0 00-.273-.665 1.446 1.446 0 00-.553-.49 1.672 1.672 0 00-.819-.189c-.578 0-1.05.212-1.414.637-.364.425-.546 1.076-.546 1.953 0 .803.168 1.442.504 1.918.34.476.836.714 1.484.714.313 0 .584-.065.812-.196.234-.131.418-.299.553-.504.136-.205.222-.418.26-.637h1.273a2.645 2.645 0 01-1.505 2.142c-.42.205-.896.308-1.428.308-.658 0-1.241-.142-1.75-.427a3.024 3.024 0 01-1.197-1.267c-.284-.56-.427-1.239-.427-2.037 0-.751.133-1.412.4-1.981a3.063 3.063 0 011.154-1.33c.509-.317 1.116-.476 1.82-.476zm5.276 9.688c-.444 0-.752-.033-.924-.098a58.858 58.858 0 01-.252-.098v-.966l.735.014a2.3 2.3 0 00.686-.049 1.106 1.106 0 00.672-.455c.056-.093.098-.18.126-.259l.224-.609-2.821-7.028h1.498l2.03 5.348 2.016-5.348h1.47l-3.017 7.644c-.206.504-.432.894-.68 1.169a1.983 1.983 0 01-.804.574 2.784 2.784 0 01-.96.161zm10.117-2.31v-10.122h3.507c.724 0 1.37.124 1.939.371a3.04 3.04 0 011.351 1.092c.332.481.497 1.071.497 1.771 0 .672-.151 1.246-.455 1.722a2.894 2.894 0 01-1.26 1.085c-.536.247-1.159.371-1.869.371h-2.184V167h-1.526zm1.519-4.935h2.149c.644 0 1.169-.184 1.575-.553.406-.373.609-.868.609-1.484 0-.625-.21-1.104-.63-1.435-.42-.336-.956-.504-1.61-.504h-2.093v3.976zm9.878 5.075c-.677 0-1.269-.145-1.778-.434a2.996 2.996 0 01-1.176-1.274c-.275-.555-.413-1.227-.413-2.016 0-.761.131-1.426.392-1.995a3.022 3.022 0 011.155-1.323c.504-.317 1.113-.476 1.827-.476.681 0 1.272.149 1.771.448.499.294.887.726 1.162 1.295.275.565.413 1.248.413 2.051 0 .733-.131 1.379-.392 1.939-.257.56-.635.999-1.134 1.316-.495.313-1.104.469-1.827.469zm.007-1.155c.411 0 .754-.107 1.029-.322.28-.219.49-.525.63-.917.14-.397.21-.854.21-1.372 0-.481-.063-.917-.189-1.309-.121-.397-.32-.712-.595-.945-.275-.233-.637-.35-1.085-.35-.42 0-.77.107-1.05.322-.28.21-.492.511-.637.903-.14.387-.21.847-.21 1.379 0 .471.063.905.189 1.302s.329.714.609.952c.28.238.646.357 1.099.357zm6.915 1.113c-.429 0-.774-.056-1.036-.168a1.397 1.397 0 01-.588-.448 1.66 1.66 0 01-.273-.644 4.385 4.385 0 01-.063-.749v-8.491h1.477v8.337c0 .336.066.593.196.77.136.177.341.278.616.301l.378.014v.952a2.934 2.934 0 01-.364.091 1.84 1.84 0 01-.343.035zm3.861-7.336V167h-1.442v-7.238h1.442zm.028-2.877v1.477h-1.505v-1.477h1.505zm5.069 2.737c.541 0 1.022.107 1.442.322.425.21.768.504 1.029.882.261.378.42.819.476 1.323h-1.295a1.689 1.689 0 00-.273-.665 1.447 1.447 0 00-.553-.49 1.674 1.674 0 00-.819-.189c-.579 0-1.05.212-1.414.637-.364.425-.546 1.076-.546 1.953 0 .803.168 1.442.504 1.918.341.476.835.714 1.484.714.313 0 .583-.065.812-.196.233-.131.418-.299.553-.504.135-.205.222-.418.259-.637h1.274a2.64 2.64 0 01-1.505 2.142c-.42.205-.896.308-1.428.308-.658 0-1.241-.142-1.75-.427a3.02 3.02 0 01-1.197-1.267c-.285-.56-.427-1.239-.427-2.037 0-.751.133-1.412.399-1.981a3.063 3.063 0 011.155-1.33c.509-.317 1.115-.476 1.82-.476zm5.276 9.688c-.444 0-.752-.033-.924-.098a58.858 58.858 0 01-.252-.098v-.966l.735.014c.28.014.508-.002.686-.049.182-.047.324-.112.427-.196a.914.914 0 00.245-.259c.056-.093.098-.18.126-.259l.224-.609-2.821-7.028h1.498l2.03 5.348 2.016-5.348h1.47l-3.017 7.644c-.206.504-.432.894-.679 1.169a1.986 1.986 0 01-.805.574 2.785 2.785 0 01-.959.161zm8.447-12.432l-.455 3.444h-.819l-.441-3.444h1.715zm3.579 10.262c-.504 0-.978-.079-1.421-.238a2.638 2.638 0 01-1.106-.749c-.294-.341-.478-.777-.553-1.309h1.337c.061.275.175.504.343.686.173.177.378.31.616.399.243.084.502.126.777.126.457 0 .826-.082 1.106-.245.285-.168.427-.425.427-.77 0-.247-.077-.446-.231-.595-.149-.149-.387-.259-.714-.329l-1.442-.343c-.597-.14-1.076-.362-1.435-.665-.359-.308-.541-.737-.546-1.288 0-.425.105-.803.315-1.134.215-.331.532-.59.952-.777.42-.191.943-.287 1.568-.287.817 0 1.472.182 1.967.546.495.364.751.891.77 1.582h-1.295a1.111 1.111 0 00-.455-.777c-.252-.191-.586-.287-1.001-.287-.429 0-.782.086-1.057.259-.275.168-.413.427-.413.777 0 .238.1.427.301.567.201.135.502.247.903.336l1.372.343c.355.093.646.217.875.371.229.149.408.315.539.497.131.182.222.371.273.567.056.196.084.38.084.553 0 .457-.117.849-.35 1.176-.229.322-.558.572-.987.749-.425.173-.931.259-1.519.259z"
          fill="#000"
        />
        <Path
          d="M366.91 170.67c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l6.52-6.52c.48-.48.48-1.26 0-1.74l-6.52-6.52a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l6.52 6.52c.51.51.8 1.2.8 1.93s-.28 1.42-.8 1.93l-6.52 6.52c-.15.14-.34.22-.53.22z"
          fill="#292D32"
        />
        <Rect
          x={9}
          y={5}
          width={390}
          height={186}
          rx={13}
          stroke="#fff"
          strokeWidth={2}
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}
function LogOut(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.7 18.558h-.108c-3.7 0-5.484-1.458-5.792-4.725a.626.626 0 01.567-.683.637.637 0 01.683.567c.242 2.616 1.475 3.591 4.55 3.591h.108c3.392 0 4.592-1.2 4.592-4.591V7.283c0-3.391-1.2-4.591-4.592-4.591H12.6c-3.092 0-4.325.991-4.55 3.658a.632.632 0 01-.683.567.626.626 0 01-.575-.675c.283-3.317 2.075-4.8 5.8-4.8h.108c4.092 0 5.842 1.75 5.842 5.841v5.434c0 4.091-1.75 5.841-5.842 5.841z"
        fill="#EB5757"
      />
      <Path
        d="M12.5 10.625H3.017A.63.63 0 012.392 10a.63.63 0 01.625-.625H12.5a.63.63 0 01.625.625.63.63 0 01-.625.625z"
        fill="#EB5757"
      />
      <Path
        d="M4.875 13.417a.618.618 0 01-.442-.184l-2.791-2.791a.629.629 0 010-.884l2.791-2.791a.629.629 0 01.884 0 .629.629 0 010 .883L2.967 10l2.35 2.35a.629.629 0 010 .883.605.605 0 01-.442.184z"
        fill="#EB5757"
      />
    </Svg>
  );
}
