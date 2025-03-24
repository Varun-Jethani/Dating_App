import {StyleSheet, View, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import LikeScreen from '../screens/LikeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HomeScreen from '../screens/Homescreen';
import BasicInfo from '../screens/Contact-Info/BasicInfo';
import NameScreen from '../screens/Contact-Info/NameScreen';
import EmailScreen from '../screens/Contact-Info/EmailScreen';
import OtpScreen from '../screens/Contact-Info/OtpScreen';
import BirthScreen from '../screens/Contact-Info/BirthScreen';
import LocationScreen from '../screens/More-You-Share/LocationScreen';
import GenderScreen from '../screens/More-You-Share/GenderScreen';
import DatingPreferences from '../screens/More-You-Share/DatingPreferences';
import DatingType from '../screens/More-You-Share/DatingType';
import HeightScreen from '../screens/More-You-Share/HeightScreen';
import ReligionScreen from '../screens/More-You-Share/ReligionScreen';
import HomeTownScreen from '../screens/More-You-Share/HomeTownScreen';
import CollegeScreen from '../screens/More-You-Share/CollegeScreen';
import DrinkScreen from '../screens/More-You-Share/DrinkScreen';
import FoodScreen from '../screens/More-You-Share/FoodPreferencesScreen';
import LangScreen from '../screens/More-You-Share/MotherTongueScreen';
import PhotoScreen from '../screens/Profile/PhotoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar component that floats above the bottom
function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Render the appropriate icon based on the route name
          const getIcon = () => {
            if (route.name === 'Home') {
              return (
                <MaterialCommunityIcons
                  name="home"
                  color={isFocused ? '#EC4899' : '#989898'}
                  size={26}
                />
              );
            } else if (route.name === 'Likes') {
              return (
                <Entypo
                  name="heart"
                  color={isFocused ? '#EC4899' : '#989898'}
                  size={26}
                />
              );
            } else if (route.name === 'Chat') {
              return (
                <MaterialIcons
                  name="people"
                  color={isFocused ? '#EC4899' : '#989898'}
                  size={26}
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <Ionicons
                  name="chatbubble-outline"
                  color={isFocused ? '#EC4899' : '#989898'}
                  size={26}
                />
              );
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabButton}>
              {getIcon()}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Wrap the screen with padding to account for the floating tab bar
function ScreenWrapper({children}) {
  return <View style={styles.screenContainer}>{children}</View>;
}
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Basic"
        component={BasicInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Name"
        component={NameScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Email"
        component={EmailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Birth"
        component={BirthScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Gender"
        component={GenderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Intention"
        component={DatingType}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Preferences"
        component={DatingPreferences}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Height"
        component={HeightScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Religion"
        component={ReligionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeTown"
        component={HomeTownScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="College"
        component={CollegeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Drink"
        component={DrinkScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Food"
        component={FoodScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Language"
        component={LangScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Photos"
        component={PhotoScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  // Wrap each screen component to add bottom padding
  const WrappedHomeScreen = props => (
    <ScreenWrapper>
      <HomeScreen {...props} />
    </ScreenWrapper>
  );

  const WrappedLikeScreen = props => (
    <ScreenWrapper>
      <LikeScreen {...props} />
    </ScreenWrapper>
  );

  const WrappedChatScreen = props => (
    <ScreenWrapper>
      <ChatScreen {...props} />
    </ScreenWrapper>
  );

  const WrappedProfileScreen = props => (
    <ScreenWrapper>
      <ProfileScreen {...props} />
    </ScreenWrapper>
  );

  function BottomTabs() {
    return (
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen name="Home" component={WrappedHomeScreen} />
        <Tab.Screen name="Likes" component={WrappedLikeScreen} />
        <Tab.Screen name="Chat" component={WrappedChatScreen} />
        <Tab.Screen name="Profile" component={WrappedProfileScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator> */}
      <AuthStack screenOptions={{headerShown: false}} />
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingBottom: 80, // Add padding to account for the floating tab bar
  },
  tabBarWrapper: {
    position: 'absolute',
    bottom: 40, // This creates the floating effect by positioning it 20px from bottom
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
    width: '90%', // Makes the tab bar not full width
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    // elevation: 10,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.15,
    // shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
