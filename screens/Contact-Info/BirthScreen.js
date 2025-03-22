import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const BirthScreen = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const dayRef = React.useRef();
  const monthRef = React.useRef();
  const yearRef = React.useRef();

  const navigation = useNavigation();

  const handleDayChange = text => {
    setDay(text);
    if (text.length === 2) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = text => {
    setMonth(text);
    if (text.length === 2) {
      yearRef.current.focus();
    }
  };

  const handleNext = () => {
    // Validate date before proceeding
    // Example validation here
    // Navigate to next screen
    // navigation.navigate('NextScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/Img-1.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>What's Your Birthday?</Text>
            <Text style={styles.subtitle}>Let's make it happen.</Text>

            <View style={styles.dateContainer}>
              {/* Date input with improved layout */}
              <View style={styles.dateInputContainer}>
                <View style={styles.dateBox}>
                  <TextInput
                    ref={dayRef}
                    style={styles.dateInput}
                    placeholder="DD"
                    placeholderTextColor="#AAA"
                    value={day}
                    onChangeText={handleDayChange}
                    keyboardType="numeric"
                    maxLength={2}
                    selectTextOnFocus
                  />
                  <Text style={styles.dateLabel}>Day</Text>
                </View>

                <Text style={styles.dateSeparator}>/</Text>

                <View style={styles.dateBox}>
                  <TextInput
                    ref={monthRef}
                    style={styles.dateInput}
                    placeholder="MM"
                    placeholderTextColor="#AAA"
                    value={month}
                    onChangeText={handleMonthChange}
                    keyboardType="numeric"
                    maxLength={2}
                    selectTextOnFocus
                  />
                  <Text style={styles.dateLabel}>Month</Text>
                </View>

                <Text style={styles.dateSeparator}>/</Text>

                <View style={[styles.dateBox, styles.yearBox]}>
                  <TextInput
                    ref={yearRef}
                    style={styles.dateInput}
                    placeholder="YYYY"
                    placeholderTextColor="#AAA"
                    value={year}
                    onChangeText={setYear}
                    keyboardType="numeric"
                    maxLength={4}
                    selectTextOnFocus
                  />
                  <Text style={styles.dateLabel}>Year</Text>
                </View>
              </View>

              <Text style={styles.ageNote}>
                You must be at least 18 years old to use this app
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Location')}>
            <MaterialIcons name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BirthScreen;

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
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 40,
  },
  dateContainer: {
    marginTop: 10,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dateBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  yearBox: {
    minWidth: 100,
  },
  dateInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  dateLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  dateSeparator: {
    fontSize: 28,
    color: '#CCC',
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  ageNote: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },
});
