import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

const PhotoScreen = ({navigation}) => {
  const [photos, setPhotos] = useState([]);
  const currentStep = 12;
  const MAX_PHOTOS = 6;

  const handleAddPhoto = () => {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert('Limit Reached', 'You can upload a maximum of 6 photos');
      return;
    }

    Alert.alert('Add Photo', 'Choose a method to add photo', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: openCamera,
      },
      {
        text: 'Gallery',
        onPress: openGallery,
      },
    ]);
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const newPhoto = response.assets[0];
        setPhotos([...photos, newPhoto]);
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: MAX_PHOTOS - photos.length,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const newPhotos = [...photos];
        response.assets.forEach(asset => {
          if (newPhotos.length < MAX_PHOTOS) {
            newPhotos.push(asset);
          }
        });
        setPhotos(newPhotos);
      }
    });
  };

  const removePhoto = index => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove this photo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: () => {
          const newPhotos = [...photos];
          newPhotos.splice(index, 1);
          setPhotos(newPhotos);
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="image-multiple"
          title="Add Your Photos"
          subtitle="Upload up to 6 of your best photos"
        />

        <ScrollView style={styles.photosContainer}>
          <Text style={styles.helperText}>
            {photos.length === 0
              ? 'Add at least one photo to continue'
              : `${photos.length} of ${MAX_PHOTOS} photos added`}
          </Text>

          <View style={styles.photoGrid}>
            {Array(MAX_PHOTOS)
              .fill(null)
              .map((_, index) => {
                const photo = photos[index];
                return (
                  <View key={index} style={styles.photoWrapper}>
                    {photo ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onLongPress={() => removePhoto(index)}
                        style={styles.photoItem}>
                        <Image
                          source={{uri: photo.uri}}
                          style={styles.photoImage}
                        />
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removePhoto(index)}>
                          <Icon name="close-circle" size={20} color="#FF3B30" />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.addPhotoButton}
                        onPress={handleAddPhoto}>
                        <Icon name="plus" size={30} color="#4A7DFF" />
                        {index === 0 && photos.length === 0 && (
                          <Text style={styles.addPhotoText}>Add Photo</Text>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
          </View>

          <Text style={styles.tipText}>
            Tip: Long press on a photo to remove it
          </Text>
        </ScrollView>
      </View>

      <NextButton
        onPress={() => navigation.navigate('Bio')}
        disabled={photos.length === 0}
      />
    </SafeAreaView>
  );
};

export default PhotoScreen;

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
  photosContainer: {
    flex: 1,
    marginTop: 20,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoWrapper: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  photoItem: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
  },
  addPhotoButton: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A7DFF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
  },
  addPhotoText: {
    color: '#4A7DFF',
    fontSize: 12,
    marginTop: 5,
  },
  tipText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
