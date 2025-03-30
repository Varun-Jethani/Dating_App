import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

const OneWordScreen = ({navigation}) => {
  const [word, setWord] = useState('');
  const currentStep = 16;

  const wordSuggestions = [
    'Adventurous',
    'Creative',
    'Ambitious',
    'Compassionate',
    'Resilient',
    'Genuine',
    'Passionate',
    'Thoughtful',
  ];

  return (
    <SafeAreaView style={styles.Container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="format-quote-close"
          title="One word that describes you"
          subtitle="Share the essence of who you are"
        />
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Your word..."
              value={word}
              onChangeText={setWord}
              maxLength={20}
            />
            {word.length > 0 && (
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => setWord('')}>
                <Icon name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.suggestionsTitle}>Suggestions</Text>
          <View style={styles.suggestionsContainer}>
            {wordSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionBubble}
                onPress={() => setWord(suggestion)}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.helpText}>
            Choose a single word that you feel represents your core personality
            or character
          </Text>
        </View>
      </View>
      <NextButton
        onPress={() => navigation.navigate('MemeScreen')}
        disabled={!word.trim()}
      />
    </SafeAreaView>
  );
};

export default OneWordScreen;

const styles = StyleSheet.create({
  Container: {
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
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionBubble: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  suggestionText: {
    color: '#555',
    fontSize: 14,
  },
  helpText: {
    marginTop: 10,
    color: '#777',
    fontSize: 14,
    lineHeight: 20,
  },
});
