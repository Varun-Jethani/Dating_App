import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProgressBar from '../../components/ProgressBar';
import NextButton from '../../components/NextButton';
import Header from '../../components/Header';
// Import your user context if you have one
// import { UserContext } from '../../context/UserContext';

const GenderScreen = ({navigation, route}) => {
  const currentStep = 2;
  // Get the next screen from route params or default to a fallback
  const nextScreen = route.params?.nextScreen || 'Preferences';

  // If using context to store user data:
  // const { userData, updateUserData } = useContext(UserContext);

  const [selectedGender, setSelectedGender] = useState(null);

  // Gender options array
  const genderOptions = [
    'Men',
    'Women',
    'Non-binary',
    'Transgender',
    'Prefer not to say',
    'Other',
  ];

  const handleContinue = () => {
    if (!selectedGender) return;

    // Store gender data in your app's state management system
    // If using context:
    // updateUserData({...userData, gender: selectedGender});

    // If using async storage:
    // import AsyncStorage from '@react-native-async-storage/async-storage';
    // AsyncStorage.setItem('userGender', selectedGender);

    // Navigate to next screen with the selected gender
    navigation.navigate(nextScreen, {
      gender: selectedGender,
      // Include any other data you need to pass
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="newspaper-variant-outline"
          title="Which gender describes you the best?"
          subtitle="Select one of the following options."
        />

        <View style={styles.formContainer}>
          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}>
            {genderOptions.map((gender, index) => (
              <Pressable
                key={index}
                style={styles.optionItem}
                onPress={() => setSelectedGender(gender)}>
                <Text style={styles.optionText}>{gender}</Text>
                <FontAwesome
                  name={selectedGender === gender ? 'dot-circle-o' : 'circle-o'}
                  size={24}
                  color={selectedGender === gender ? '#EC4899' : 'black'}
                />
              </Pressable>
            ))}
          </ScrollView>

          <NextButton onPress={() => navigation.navigate('Intention')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 10,
    flex: 1,
  },
  optionsContainer: {
    flexGrow: 0,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#EC4899',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GenderScreen;
