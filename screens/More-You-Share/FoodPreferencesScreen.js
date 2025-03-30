import {StyleSheet, View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FoodScreen = ({navigation}) => {
  const [foodPreference, setFoodPreference] = useState('');
  const currentStep = 10;

  const foodOptions = [
    {
      value: 'Vegetarian',
      icon: 'leaf',
      description: 'Plant-based foods only',
    },
    {
      value: 'Non-Vegetarian',
      icon: 'food-steak',
      description: 'Both plant and meat-based foods',
    },
    {
      value: 'Vegan',
      icon: 'sprout',
      description: 'No animal products at all',
    },
    {
      value: 'Jain',
      icon: 'fruit-cherries',
      description: 'No root vegetables',
    },
    {
      value: 'Prefer not to say',
      icon: 'help-circle-outline',
      description: 'Skip this question',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="food"
          title="Food Preference"
          subtitle="Let us know about your dietary preferences"
        />
        <View style={styles.inputsContainer}>
          {foodOptions.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.optionCard,
                foodPreference === option.value && styles.selectedOption,
              ]}
              onPress={() => setFoodPreference(option.value)}>
              <View style={styles.optionContent}>
                <MaterialCommunityIcons
                  name={option.icon}
                  size={24}
                  color={foodPreference === option.value ? '#EC4899' : '#666'}
                  style={styles.optionIcon}
                />
                <View>
                  <Text style={styles.optionTitle}>{option.value}</Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={
                  foodPreference === option.value
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                size={24}
                color={foodPreference === option.value ? '#EC4899' : '#666'}
              />
            </Pressable>
          ))}
        </View>
      </View>
      <NextButton
        disabled={!foodPreference}
        onPress={() => navigation.navigate('Language')}
      />
    </SafeAreaView>
  );
};

export default FoodScreen;

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
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5F5F5',
  },
  selectedOption: {
    backgroundColor: '#FCE7F3',
    borderColor: '#EC4899',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 14,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
