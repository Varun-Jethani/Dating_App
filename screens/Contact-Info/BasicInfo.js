import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const BasicInfo = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 55,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          Let's turn maybe into forever.
        </Text>
      </View>
      <View>
        <LottieView
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          source={require('../../assets/love.json')}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>
      <Pressable
        onPress={() => navigation.navigate('Name')}
        style={{
          backgroundColor: '#900C3F',
          padding: 15,
          marginTop: 'auto',
          marginBottom: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
          }}>
          Enter Basic Info
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({});
