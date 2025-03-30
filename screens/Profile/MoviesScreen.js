import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {authorize} from 'react-native-app-auth';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

// Spotify Auth Configuration
const spotifyAuthConfig = {
  clientId: 'bfc7cbdf072a4a4189dea77d4386df21',
  clientSecret: '1b2987b45647481b8fc68d211de2d39b',
  redirectUrl: 'com.datingapp://auth',
  scopes: ['user-top-read'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

const MovieRecommendationScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(Array(3).fill(null));
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  // Spotify related states
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyLinked, setSpotifyLinked] = useState(false);

  // Function to search movies
  const searchMovies = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDVjMThkOTU1Mzc1M2IzMjc4MTcwN2I3NDFiMDE3MyIsIm5iZiI6MTY4OTE2NTM4MS4yOTYsInN1YiI6IjY0YWU5ZTQ1ZTI0YjkzNWIyZTVhM2IxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aKZaN3XzEi0wn8WGBEqagplF4i94eewIjJtVy_E2n4`,
          },
        },
      );

      if (response.data && response.data.results) {
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      Alert.alert('Error', 'Unable to fetch movies. Check API key & internet.');
    }
  };

  // Add movie to selected movies
  const addMovieToSlot = movie => {
    const emptySlotIndex = selectedMovies.findIndex(m => m === null);

    if (emptySlotIndex !== -1) {
      const newSelectedMovies = [...selectedMovies];
      newSelectedMovies[emptySlotIndex] = movie;
      setSelectedMovies(newSelectedMovies);

      setIsSearchModalVisible(false);
      setSearchQuery('');
      setSearchResults([]);
    } else {
      Alert.alert('Limit Reached', 'You can only add 3 movies.');
    }
  };

  // Remove movie from selected movies
  const removeMovie = index => {
    const newSelectedMovies = [...selectedMovies];
    newSelectedMovies[index] = null;
    setSelectedMovies(newSelectedMovies);
  };

  // Render movie slot
  const renderMovieSlot = (movie, index) => {
    return (
      <TouchableOpacity
        style={styles.movieSlot}
        onPress={() =>
          movie ? removeMovie(index) : setIsSearchModalVisible(true)
        }>
        {movie ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.moviePoster}
          />
        ) : (
          <View style={styles.emptySlot}>
            <Icon name="plus" size={40} color="#999" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Function to handle Spotify login
  const loginWithSpotify = async () => {
    try {
      const authResult = await authorize(spotifyAuthConfig);
      setAccessToken(authResult.accessToken);
      setSpotifyLinked(true);
      Alert.alert('Success', 'Spotify account linked successfully!');
    } catch (error) {
      console.error('Spotify login error:', error);
      Alert.alert('Error', 'Failed to link Spotify account. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <ProgressBar step={14} />
      <View style={styles.contentContainer}>
        <Header
          iconName="movie-open"
          title="My Top 3 Movies"
          subtitle="Select your favorite movies"
        />

        {/* Movie Slots */}
        <View style={styles.movieSlotsContainer}>
          {selectedMovies.map((movie, index) => renderMovieSlot(movie, index))}
        </View>

        {/* Spotify Link Section */}
        <View style={styles.spotifySection}>
          <Text style={styles.spotifySectionTitle}>
            Connect your music taste
          </Text>
          <TouchableOpacity
            style={[
              styles.spotifyButton,
              spotifyLinked && styles.spotifyButtonConnected,
            ]}
            onPress={loginWithSpotify}
            disabled={spotifyLinked}>
            <Icon
              name="spotify"
              size={24}
              color="white"
              style={styles.spotifyIcon}
            />
            <Text style={styles.spotifyButtonText}>
              {spotifyLinked ? 'Spotify Connected' : 'Connect Spotify'}
            </Text>
          </TouchableOpacity>
          {spotifyLinked && (
            <Text style={styles.spotifyConnectedText}>
              Your Spotify account has been successfully linked!
            </Text>
          )}
        </View>
      </View>

      <NextButton onPress={() => navigation.navigate('Music')} />

      {/* Search Modal */}
      <Modal
        visible={isSearchModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSearchModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Search Bar */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Search movies"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={searchMovies}
              />
              <TouchableOpacity onPress={searchMovies}>
                <Icon
                  name="magnify"
                  size={24}
                  color="#333"
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Search Results */}
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => addMovieToSlot(item)}
                  style={styles.resultItem}>
                  <Text style={styles.resultItemText}>{item.title}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptySearchText}>Search for a movie</Text>
              }
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  movieSlotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  movieSlot: {
    width: '30%',
    aspectRatio: 2 / 3,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptySlot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moviePoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Spotify Section Styles
  spotifySection: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
  },
  spotifySectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 30,
  },
  spotifyButtonConnected: {
    backgroundColor: '#333',
  },
  spotifyIcon: {
    marginRight: 10,
  },
  spotifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spotifyConnectedText: {
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: '70%',
  },
  inputWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputIcon: {
    marginLeft: 10,
  },
  resultItem: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultItemText: {
    fontSize: 16,
    color: '#333',
  },
  emptySearchText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
  },
});

export default MovieRecommendationScreen;
