import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProgressBar from '../../components/ProgressBar';
import NextButton from '../../components/NextButton';
import Header from '../../components/Header';

const DatingIntentions = ({navigation, route}) => {
  const currentStep = 3;
  // Get the next screen from route params or default to a fallback
  const nextScreen = route.params?.nextScreen || 'Preferences';

  const [selectedIntention, setSelectedIntention] = useState(null);

  // Dating intentions options array
  const intentionOptions = [
    'Long Term Relationship',
    'Short Term Relationship',
    'Long Term but open to short',
    'Short Term but open to long',
    'Prefer not to say',
  ];

  const handleContinue = () => {
    if (!selectedIntention) return;

    // Navigate to next screen with the selected intention
    navigation.navigate(nextScreen, {
      datingIntention: selectedIntention,
      // Include any other data you need to pass
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="heart-outline"
          title="What are you looking for?"
          subtitle="Select your dating intention."
        />

        <View style={styles.formContainer}>
          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}>
            {intentionOptions.map((intention, index) => (
              <Pressable
                key={index}
                style={styles.optionItem}
                onPress={() => setSelectedIntention(intention)}>
                <Text style={styles.optionText}>{intention}</Text>
                <FontAwesome
                  name={
                    selectedIntention === intention
                      ? 'dot-circle-o'
                      : 'circle-o'
                  }
                  size={24}
                  color={selectedIntention === intention ? '#EC4899' : 'black'}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
      <NextButton onPress={handleContinue} />
    </SafeAreaView>
  );
};

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
  formContainer: {
    marginTop: 10,
    flex: 1,
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

export default DatingIntentions;
