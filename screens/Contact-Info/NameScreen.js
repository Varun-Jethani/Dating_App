import {StyleSheet, View, TextInput, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../../registrationutils';

const NameScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data when component mounts
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        setIsLoading(true);
        const progressData = await getRegistrationProgress('UserInfo');
        if (progressData) {
          setFullName(progressData.fullName || '');
          setEmail(progressData.email || '');
          setPhoneNumber(progressData.phoneNumber || '');
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
        Alert.alert(
          'Error',
          'Failed to load your information. Please try again.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []); // Empty dependency array means this runs once on mount

  const handleNext = async () => {
    try {
      if (
        fullName.trim() === '' ||
        email.trim() === '' ||
        phoneNumber.trim() === ''
      ) {
        Alert.alert(
          'Missing Information',
          'Please fill in all fields to continue.',
        );
        return;
      }

      // Save all user information
      await saveRegistrationProgress('UserInfo', {
        fullName,
        email,
        phoneNumber,
      });

      // Navigate to next screen
      navigation.navigate('Birth');
    } catch (error) {
      console.error('Failed to save data:', error);
      Alert.alert(
        'Error',
        'Failed to save your information. Please try again.',
      );
    }
  };

  const currentStep = 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* <ProgressBar step={currentStep} /> */}
      <View style={styles.contentContainer}>
        <Header
          iconName="account"
          title="Tell us about yourself"
          subtitle="We need a few details to get started"
        />
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <Icon
              name="account"
              size={24}
              color="#888"
              style={styles.inputIcon}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Icon
              name="email"
              size={24}
              color="#888"
              style={styles.inputIcon}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <Icon
              name="phone"
              size={24}
              color="#888"
              style={styles.inputIcon}
            />
          </View>
        </View>
      </View>
      <NextButton
        onPress={handleNext}
        disabled={isLoading || !fullName || !email || !phoneNumber}
      />
    </SafeAreaView>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: {
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
