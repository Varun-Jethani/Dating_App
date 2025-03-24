import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

const SampleScreen = () => {
  const currentStep = 5;
  return (
    <SafeAreaView style={styles.Container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="human-male-height"
          title="Whats your height"
          subtitle="Do Hight really maters?"
        />
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}></View>
        </View>
      </View>
      <NextButton onPress={() => navigation.navigate('Gender')} />
    </SafeAreaView>
  );
};

export default SampleScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  inputsContainer: {
    marginTop: 20,
    gap: 15,
  },
  inputWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputIcon: {
    marginLeft: 10,
  },
});
