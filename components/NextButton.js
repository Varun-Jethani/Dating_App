import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NextButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
      <MaterialIcons name="arrow-forward" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NextButton;
