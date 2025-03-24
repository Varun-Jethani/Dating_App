import {StyleSheet, View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DrinkScreen = ({navigation}) => {
  const [drinkOption, setDrinkOption] = useState('');
  const [smokeOption, setSmokeOption] = useState('');
  const currentStep = 9;

  const options = ['Yes', 'No', 'Sometimes', 'Prefer not to say'];

  const renderOptions = (type, selectedOption, setOption) => {
    return options.map((option, index) => (
      <Pressable
        key={index}
        style={[
          styles.optionItem,
          selectedOption === option && styles.selectedOption,
        ]}
        onPress={() => setOption(option)}>
        <Text style={styles.optionText}>{option}</Text>
        <MaterialCommunityIcons
          name={
            selectedOption === option ? 'radiobox-marked' : 'radiobox-blank'
          }
          size={24}
          color={selectedOption === option ? '#EC4899' : '#666'}
        />
      </Pressable>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="glass-cocktail"
          title="Lifestyle Preferences"
          subtitle="Let us know about your drinking and smoking habits"
        />
        <View style={styles.inputsContainer}>
          <Text style={styles.sectionTitle}>Do you drink?</Text>
          <View style={styles.optionsContainer}>
            {renderOptions('drink', drinkOption, setDrinkOption)}
          </View>

          <Text style={styles.sectionTitle}>Do you smoke?</Text>
          <View style={styles.optionsContainer}>
            {renderOptions('smoke', smokeOption, setSmokeOption)}
          </View>
        </View>
      </View>
      <NextButton
        disabled={!drinkOption || !smokeOption}
        onPress={() => navigation.navigate('Food')}
      />
    </SafeAreaView>
  );
};

export default DrinkScreen;

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedOption: {
    backgroundColor: '#FCE7F3',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
