import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from '../../components/ProgressBar';
import NextButton from '../../components/NextButton';
import Header from '../../components/Header';

const DatingPreferences = ({navigation, route}) => {
  const currentStep = 3; // Assuming this is the next step after gender selection
  const nextScreen = route.params?.nextScreen || 'MatchScreen'; // Set your next screen

  const [preference, setPreference] = useState('');

  const handleContinue = () => {
    if (!preference.trim()) return;

    // Navigate to next screen with the entered preference
    navigation.navigate(nextScreen, {
      preference: preference,
      // Include any previously collected data
      ...route.params,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <ProgressBar step={currentStep} />
        <View style={styles.contentContainer}>
          <Header
            iconName="heart-outline"
            title="What are you looking for?"
            subtitle="Tell us about your dating preferences."
          />

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your dating preferences..."
                value={preference}
                onChangeText={setPreference}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <NextButton
              onPress={handleContinue}
              disabled={!preference.trim()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  formContainer: {
    marginTop: 20,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    fontSize: 16,
    minHeight: 120,
    paddingHorizontal: 5,
  },
});

export default DatingPreferences;
