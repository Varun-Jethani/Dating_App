import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StackNavigator from './Navigation/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <>
      <StackNavigator></StackNavigator>
    </>
  );
};

export default App;
