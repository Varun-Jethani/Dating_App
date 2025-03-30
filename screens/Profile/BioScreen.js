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

const BioScreen = ({navigation}) => {
  const [bio, setBio] = useState('');
  const currentStep = 18;
  const maxCharCount = 150;

  const bioSuggestions = [
    'Coffee enthusiast, hiking addict, and full-time dreamer.',
    'Aspiring chef who can only make pasta and breakfast food.',
    'Lover of books, dogs, and spontaneous road trips.',
    'Always on the lookout for the next adventure.',
  ];

  const selectSuggestion = text => {
    setBio(text);
  };

  const charCount = bio.length;
  const charCountColor =
    charCount > maxCharCount * 0.8
      ? charCount >= maxCharCount
        ? '#FF3B30'
        : '#FF9500'
      : '#888';

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="text-box-outline"
          title="Write a short bio"
          subtitle="Tell others about yourself"
        />

        <View style={styles.inputsContainer}>
          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder="Share something interesting about yourself..."
              value={bio}
              onChangeText={setBio}
              multiline
              maxLength={maxCharCount}
              textAlignVertical="top"
            />
            <Text style={[styles.charCount, {color: charCountColor}]}>
              {charCount}/{maxCharCount}
            </Text>
          </View>

          <Text style={styles.tipsTitle}>Writing tips:</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <Icon name="lightbulb-outline" size={18} color="#555" />
              <Text style={styles.tipText}>Keep it concise and authentic</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="emoticon-outline" size={18} color="#555" />
              <Text style={styles.tipText}>Show your personality</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="heart-outline" size={18} color="#555" />
              <Text style={styles.tipText}>
                Mention what you're passionate about
              </Text>
            </View>
          </View>

          <Text style={styles.suggestionsTitle}>Need inspiration?</Text>
          <View style={styles.suggestionsContainer}>
            {bioSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => selectSuggestion(suggestion)}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
                <Icon name="arrow-right" size={16} color="#777" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <NextButton
        onPress={() => navigation.navigate('NextScreen')}
        disabled={bio.trim().length < 10} // Require at least 10 characters
      />
    </SafeAreaView>
  );
};

export default BioScreen;

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
  textAreaWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
    position: 'relative',
  },
  textArea: {
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    maxHeight: 120,
  },
  charCount: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    fontSize: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    color: '#333',
  },
  tipsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    color: '#333',
  },
  suggestionsContainer: {
    gap: 10,
  },
  suggestionItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    marginRight: 8,
  },
});
