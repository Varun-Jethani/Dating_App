import React from 'react';
import {View, StyleSheet} from 'react-native';

const ProgressBar = ({step}) => {
  const totalSteps = 20;
  // Calculate percentage of completion
  const progress = (step / totalSteps) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, {width: `${progress}%`}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    height: 6,
    backgroundColor: '#F3E5F5', // Light purple background (empty part)
    width: '80%',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: '10',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#EC4899', // Pink color to match your active tab color
    borderRadius: 3,
  },
});

export default ProgressBar;
