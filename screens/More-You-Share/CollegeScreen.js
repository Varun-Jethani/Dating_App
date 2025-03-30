import {StyleSheet, View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CollegeScreen = ({navigation}) => {
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [workPosition, setWorkPosition] = useState('');
  const currentStep = 8;

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="school"
          title="Your Education & Work"
          subtitle="Tell us about your educational and professional background"
        />
        <View style={styles.inputsContainer}>
          <Text style={styles.inputLabel}>Which college are you in?</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your college name"
              placeholderTextColor="#999"
              value={college}
              onChangeText={setCollege}
            />
            <MaterialCommunityIcons
              name="school-outline"
              size={24}
              color="#666"
              style={styles.inputIcon}
            />
          </View>

          <Text style={styles.inputLabel}>What course are you studying?</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your course name"
              placeholderTextColor="#999"
              value={course}
              onChangeText={setCourse}
            />
            <MaterialCommunityIcons
              name="book-open-variant"
              size={24}
              color="#666"
              style={styles.inputIcon}
            />
          </View>

          <Text style={styles.inputLabel}>
            What is your current work position?
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your job title or 'Student' if not working"
              placeholderTextColor="#999"
              value={workPosition}
              onChangeText={setWorkPosition}
            />
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={24}
              color="#666"
              style={styles.inputIcon}
            />
          </View>
        </View>
      </View>
      <NextButton
        disabled={!college.trim() || !course.trim() || !workPosition.trim()}
        onPress={() => navigation.navigate('Drink')}
      />
    </SafeAreaView>
  );
};

export default CollegeScreen;

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
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
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
