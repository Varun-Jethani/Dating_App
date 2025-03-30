import {StyleSheet, View, TextInput, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../../registrationutils';
import {useNavigation} from '@react-navigation/native';
const BirthScreen = ({}) => {
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
      <View style={styles.contentContainer}>
        <Header
          iconName="account"
          title="Tell us about yourself"
          subtitle="We need a few details to get started"
        />
        <View style={styles.inputsContainer}>
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
      </View>
      <NextButton
        onPress={handleNext}
        disabled={isLoading || !fullName || !email || !phoneNumber}
      />
    </SafeAreaView>
  );
};

export default BirthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputsContainer: {
    marginTop: 20,
    gap: 15,
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
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
});
