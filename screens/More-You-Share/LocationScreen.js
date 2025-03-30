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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from '../../components/ProgressBar';
import NextButton from '../../components/NextButton';
import Header from '../../components/Header';

const LocationScreen = ({navigation}) => {
  const currentStep = 1;
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // Sample data - replace with your own city/area data
  const popularCities = [
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Chennai',
    'Hyderabad',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />

      <View style={styles.contentContainer}>
        <Header
          iconName="map-marker"
          title="Where Do you Live?"
          subtitle="Let's make it happen."
        />

        <View style={styles.inputsContainer}>
          {/* City Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              placeholderTextColor="#999"
              value={city}
              onChangeText={text => {
                setCity(text);
                setShowCitySuggestions(true);
              }}
            />
            <MaterialIcons
              name="location-city"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
          </View>

          {/* City Suggestions */}
          {showCitySuggestions && (
            <View style={styles.suggestionsContainer}>
              <ScrollView nestedScrollEnabled={true} style={{maxHeight: 150}}>
                {popularCities
                  .filter(item =>
                    item.toLowerCase().includes(city.toLowerCase()),
                  )
                  .map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => {
                        setCity(item);
                        setShowCitySuggestions(false);
                      }}>
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          )}

          {/* Area Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your area or neighborhood"
              placeholderTextColor="#999"
              value={area}
              onChangeText={setArea}
            />
            <MaterialIcons
              name="home"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
          </View>
        </View>

        <Text style={styles.infoText}>
          This helps us find people close to you. Your exact address won't be
          shared with others.
        </Text>
      </View>
      <NextButton onPress={() => navigation.navigate('Gender')} />
      {/* <NextButton onPress={() => navigation.navigate('BioScreen')} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  suggestionsContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: -10,
    marginBottom: 10,
    backgroundColor: 'white',
    zIndex: 1,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default LocationScreen;
