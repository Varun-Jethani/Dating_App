import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ProgressBar from '../../components/ProgressBar';
import NextButton from '../../components/NextButton';
import Header from '../../components/Header';

const DatingPreferences = ({navigation}) => {
  const [preference, setPreference] = useState('');
  const currentStep = 4;

  // Sample data - replace with your own city/area data

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />

      <View style={styles.contentContainer}>
        <Header
          iconName="flag"
          title="What are your dating preferences?"
          subtitle="What Green Flags are you looking for?"
        />

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
      </View>

      <NextButton onPress={() => navigation.navigate('Height')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 22,
    color: '#999',
    marginBottom: 30,
  },
  inputContainer: {
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
