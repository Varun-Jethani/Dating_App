import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

// Comprehensive list of Indian languages
const languages = [
  'Hindi',
  'Bengali',
  'Telugu',
  'Marathi',
  'Tamil',
  'Urdu',
  'Gujarati',
  'Kannada',
  'Odia',
  'Malayalam',
  'Punjabi',
  'Assamese',
  'Maithili',
  'Sanskrit',
  'Kashmiri',
  'Konkani',
  'Sindhi',
  'Manipuri',
  'Nepali',
  'Dogri',
  'Bodo',
  'Santali',
  'English',
];

const LanguageScreen = ({navigation}) => {
  const [motherTongue, setMotherTongue] = useState('');
  const [knownLanguages, setKnownLanguages] = useState([]);
  const currentStep = 2;

  const toggleMotherTongue = language => {
    if (motherTongue === language) {
      setMotherTongue('');
    } else {
      setMotherTongue(language);
      // Remove from known languages if it's already there
      if (knownLanguages.includes(language)) {
        setKnownLanguages(knownLanguages.filter(lang => lang !== language));
      }
    }
  };

  const toggleKnownLanguage = language => {
    if (language === motherTongue) return; // Can't select mother tongue as known language

    if (knownLanguages.includes(language)) {
      setKnownLanguages(knownLanguages.filter(lang => lang !== language));
    } else {
      setKnownLanguages([...knownLanguages, language]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="translate"
          title="What languages do you speak?"
          subtitle="Select your mother tongue and other languages you know"
        />

        <Text style={styles.sectionTitle}>Mother Tongue</Text>
        <Text style={styles.sectionSubtitle}>Select your native language</Text>

        <ScrollView style={styles.languageSection}>
          {languages.map(language => (
            <TouchableOpacity
              key={`mother-${language}`}
              style={[
                styles.languageItem,
                motherTongue === language && styles.selectedLanguage,
              ]}
              onPress={() => toggleMotherTongue(language)}>
              <Text
                style={[
                  styles.languageText,
                  motherTongue === language && styles.selectedLanguageText,
                ]}>
                {language}
              </Text>
              {motherTongue === language && (
                <Icon name="check" size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Other Languages</Text>
        <Text style={styles.sectionSubtitle}>Select all that apply</Text>

        <ScrollView style={styles.languageSection}>
          {languages.map(language => (
            <TouchableOpacity
              key={`known-${language}`}
              style={[
                styles.languageItem,
                knownLanguages.includes(language) && styles.selectedLanguage,
                language === motherTongue && styles.disabledLanguage,
              ]}
              onPress={() => toggleKnownLanguage(language)}
              disabled={language === motherTongue}>
              <Text
                style={[
                  styles.languageText,
                  knownLanguages.includes(language) &&
                    styles.selectedLanguageText,
                  language === motherTongue && styles.disabledLanguageText,
                ]}>
                {language}
              </Text>
              {knownLanguages.includes(language) && (
                <Icon name="check" size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <NextButton
        onPress={() => navigation.navigate('Photos')}
        disabled={!motherTongue}
      />
    </SafeAreaView>
  );
};

export default LanguageScreen;

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 12,
  },
  languageSection: {
    maxHeight: 200,
  },
  languageItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  selectedLanguage: {
    backgroundColor: '#4A7DFF',
  },
  disabledLanguage: {
    backgroundColor: '#EBEBEB',
    opacity: 0.6,
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  selectedLanguageText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  disabledLanguageText: {
    color: '#999',
  },
});
