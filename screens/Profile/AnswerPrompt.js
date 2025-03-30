import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

const AnswerPromptScreen = ({route, navigation}) => {
  const {prompt, question} = route.params;
  const [answer, setAnswer] = useState('');
  const MAX_CHARACTERS = 250;

  const handleAnswerChange = text => {
    if (text.length <= MAX_CHARACTERS) {
      setAnswer(text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ProgressBar step={6} />
        <View style={styles.contentContainer}>
          <Header
            iconName="pencil-outline"
            title="Share Your Story"
            subtitle="Express yourself authentically"
          />

          <View style={styles.promptContainer}>
            <Text style={styles.promptTitle}>{prompt.title}</Text>
            <Text style={styles.questionText}>{question}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              multiline
              placeholder="Share your thoughts..."
              placeholderTextColor="#999"
              style={styles.textInput}
              value={answer}
              onChangeText={handleAnswerChange}
              maxLength={MAX_CHARACTERS}
            />
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                {answer.length}/{MAX_CHARACTERS}
              </Text>
            </View>
          </View>

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Writing Tips:</Text>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={16} color="#4A7DFF" />
              <Text style={styles.tipText}>Be honest and genuine</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={16} color="#4A7DFF" />
              <Text style={styles.tipText}>Show, don't just tell</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={16} color="#4A7DFF" />
              <Text style={styles.tipText}>Keep it concise and meaningful</Text>
            </View>
          </View>
        </View>

        <NextButton
          onPress={() => {
            if (answer.trim().length > 0) {
              navigation.navigate('Movie', {promptAnswer: answer});
            } else {
              Alert.alert('Please write your answer');
            }
          }}
          disabled={answer.trim().length === 0}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AnswerPromptScreen;

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
  promptContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A7DFF',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 15,
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    minHeight: 150,
    padding: 15,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  counterContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  counterText: {
    color: '#999',
    fontSize: 12,
  },
  tipsContainer: {
    backgroundColor: '#F8F9FF',
    borderRadius: 12,
    padding: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A7DFF',
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});
