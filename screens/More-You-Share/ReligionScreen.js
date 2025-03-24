import {StyleSheet, View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

const ReligionScreen = ({navigation}) => {
  const [religion, setReligion] = React.useState('');

  const Religions = [
    'Hindu',
    'Muslim',
    'Christian',
    'Sikh',
    'Buddhist',
    'Jain',
    'Other',
    'Prefer not to say',
  ];
  const currentStep = 6;
  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="account-group"
          title="Whats your religion"
          subtitle=""
        />
        <View style={styles.inputsContainer}>
          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}>
            {Religions.map((religionOption, index) => (
              <Pressable
                key={index}
                style={styles.optionItem}
                onPress={() => setReligion(religionOption)}>
                <Text style={styles.optionText}>{religionOption}</Text>
                <FontAwesome
                  name={
                    religion === religionOption ? 'dot-circle-o' : 'circle-o'
                  }
                  size={24}
                  color={religion === religionOption ? '#EC4899' : 'black'}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
      <NextButton onPress={() => navigation.navigate('HomeTown')} />
    </SafeAreaView>
  );
};

export default ReligionScreen;

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
  optionsContainer: {
    flexGrow: 0,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
  },
});
