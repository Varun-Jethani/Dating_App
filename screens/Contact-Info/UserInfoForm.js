import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserInfoForm = ({imageSource, title, subtitle, onNext, inputs}) => {
  const navigation = useNavigation();
  const handleNext = () => {
    if (inputs.some(input => input.value === '')) {
      alert('Please fill all fields');
      return;
    }

    navigation.navigate(onNext);
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <View style={styles.inputsContainer}>
              {inputs.map((input, index) => (
                <View key={index} style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder={input.placeholder}
                    placeholderTextColor="#999"
                    value={input.value}
                    onChangeText={input.onChangeText}
                    keyboardType={input.keyboardType || 'default'}
                    autoCapitalize={input.autoCapitalize || 'sentences'}
                    maxLength={input.maxLength}
                  />
                  <MaterialIcons
                    name={input.iconName}
                    size={20}
                    color="#999"
                    style={styles.inputIcon}
                  />
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => handleNext()}>
            <MaterialIcons name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserInfoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 22,
    color: '#999',
    marginBottom: 30,
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
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
