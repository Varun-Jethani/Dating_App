import {StyleSheet, View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeTownScreen = ({navigation}) => {
  const [hometown, setHometown] = useState('');
  const currentStep = 6;

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="home-city"
          title="Do you have a hometown?"
          subtitle="We will match you with people from your hometown living here."
        />
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your hometown"
              placeholderTextColor="#999"
              value={hometown}
              onChangeText={setHometown}
            />
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color="#666"
              style={styles.inputIcon}
            />
          </View>
          <Text style={styles.helperText}>
            This helps us find people from your hometown who are living in your
            current location
          </Text>
        </View>
      </View>
      <NextButton
        disabled={!hometown.trim()}
        onPress={() => navigation.navigate('College')}
      />
    </SafeAreaView>
  );
};

export default HomeTownScreen;

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
  helperText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginLeft: 4,
  },
});
