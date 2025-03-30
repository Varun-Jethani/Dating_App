import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

// Prompt Selection Screen
const PromptScreen = ({navigation}) => {
  const prompts = [
    {
      id: 1,
      icon: 'account-box',
      title: 'About me',
      description: 'Share your values, interests, and what makes you unique',
    },
    {
      id: 2,
      icon: 'heart-outline',
      title: 'My Ideal Partner',
      description:
        'Describe the qualities you value most in a potential partner',
    },
    {
      id: 3,
      icon: 'star-outline',
      title: 'What makes me happy',
      description: 'Share what truly excites and motivates you in life',
    },
  ];

  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const handlePromptSelection = prompt => {
    setSelectedPrompt(prompt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={13} />
      <View style={styles.contentContainer}>
        <Header
          iconName="text-box-multiple"
          title="Choose a Prompt"
          subtitle="Select a topic to share more about yourself"
        />

        <Text style={styles.instructionText}>
          Pick a prompt that helps you express your unique personality
        </Text>

        <ScrollView style={styles.promptsContainer}>
          {prompts.map(prompt => (
            <TouchableOpacity
              key={prompt.id}
              style={[
                styles.promptItem,
                selectedPrompt?.id === prompt.id && styles.selectedPrompt,
              ]}
              onPress={() => handlePromptSelection(prompt)}>
              <View style={styles.promptHeader}>
                <Icon
                  name={prompt.icon}
                  size={24}
                  color={
                    selectedPrompt?.id === prompt.id ? '#FFFFFF' : '#4A7DFF'
                  }
                />
                <Text
                  style={[
                    styles.promptTitle,
                    selectedPrompt?.id === prompt.id &&
                      styles.selectedPromptTitle,
                  ]}>
                  {prompt.title}
                </Text>
              </View>
              <Text
                style={[
                  styles.promptDescription,
                  selectedPrompt?.id === prompt.id &&
                    styles.selectedPromptDescription,
                ]}>
                {prompt.description}
              </Text>
              {selectedPrompt?.id === prompt.id && (
                <Icon
                  name="check-circle"
                  size={24}
                  color="#FFFFFF"
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <NextButton
        onPress={() => {
          if (selectedPrompt) {
            navigation.navigate('ShowPrompt', {selectedPrompt});
          } else {
            Alert.alert('Please select a prompt');
          }
        }}
        disabled={!selectedPrompt}
      />
    </SafeAreaView>
  );
};

// Show Prompts Screen
const ShowPromptsScreen = ({route, navigation}) => {
  const {selectedPrompt} = route.params;
  const [answer, setAnswer] = useState('');

  const promptQuestions = {
    1: [
      'What does your ideal partner look like to you?',
      'What are the top 3 qualities you seek in a relationship?',
      "How do you envision supporting your partner's dreams?",
    ],
    2: [
      'What hobby or activity makes you lose track of time?',
      'Describe a project or goal that truly excites you',
      'What dreams are you currently pursuing?',
    ],
    3: [
      'Share a challenge that made you stronger',
      'Tell about a moment that changed your perspective',
      'Describe a significant personal growth experience',
    ],
  };

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={5} />
      <View style={styles.contentContainer}>
        <Header
          iconName="comment-text-outline"
          title={selectedPrompt.title}
          subtitle="Choose a question to answer"
        />

        <Text style={styles.promptTitle}>{selectedPrompt.description}</Text>

        <ScrollView style={styles.questionsContainer}>
          {promptQuestions[selectedPrompt.id].map((question, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.questionItem,
                selectedQuestion === index && styles.selectedQuestion,
              ]}
              onPress={() => setSelectedQuestion(index)}>
              <Text
                style={[
                  styles.questionText,
                  selectedQuestion === index && styles.selectedQuestionText,
                ]}>
                {question}
              </Text>
              {selectedQuestion === index && (
                <Icon name="check-circle" size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <NextButton
        onPress={() => {
          if (selectedQuestion !== null) {
            navigation.navigate('AnswerPrompt', {
              prompt: selectedPrompt,
              question: promptQuestions[selectedPrompt.id][selectedQuestion],
            });
          } else {
            Alert.alert('Please select a question');
          }
        }}
        disabled={selectedQuestion === null}
      />
    </SafeAreaView>
  );
};

export {PromptScreen, ShowPromptsScreen};

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
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  promptsContainer: {
    flex: 1,
  },
  promptItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    position: 'relative',
  },
  selectedPrompt: {
    backgroundColor: '#4A7DFF',
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  selectedPromptTitle: {
    color: '#FFFFFF',
  },
  promptDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedPromptDescription: {
    color: '#FFFFFF',
  },
  checkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  questionsContainer: {
    flex: 1,
    marginTop: 20,
  },
  questionItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedQuestion: {
    backgroundColor: '#4A7DFF',
  },
  questionText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  selectedQuestionText: {
    color: '#FFFFFF',
  },
});
