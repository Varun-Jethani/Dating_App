import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

const MemeScreen = ({navigation}) => {
  const [memeImage, setMemeImage] = useState(null);
  const currentStep = 17;

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets[0].uri;
        setMemeImage(imageUri);
      }
    });
  };

  const removeImage = () => {
    setMemeImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="emoticon-cool-outline"
          title="Your Favorite Meme"
          subtitle="Show us your sense of humor"
        />

        <View style={styles.uploadContainer}>
          {memeImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{uri: memeImage}} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={removeImage}>
                <Icon name="close-circle" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
              <Icon name="image-plus" size={40} color="#999" />
              <Text style={styles.uploadText}>Upload your favorite meme</Text>
              <Text style={styles.uploadSubtext}>
                Tap to choose from your gallery
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {!memeImage && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Why share a meme?</Text>
            <View style={styles.tipItem}>
              <Icon name="emoticon-happy-outline" size={20} color="#555" />
              <Text style={styles.tipText}>Reveals your sense of humor</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="chat-outline" size={20} color="#555" />
              <Text style={styles.tipText}>Great conversation starter</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="account-group-outline" size={20} color="#555" />
              <Text style={styles.tipText}>Shows your personality</Text>
            </View>
          </View>
        )}
      </View>

      <NextButton
        onPress={() => navigation.navigate('BioScreen')}
        disabled={!memeImage}
      />
    </SafeAreaView>
  );
};

export default MemeScreen;

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
  uploadContainer: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },
  imagePreviewContainer: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#F0F0F0',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 4,
  },
  tipsContainer: {
    marginTop: 30,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
});
