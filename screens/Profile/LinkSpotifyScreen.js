import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {authorize} from 'react-native-app-auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
// import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} from '@env';

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

const SpotifyTopMusicScreen = ({navigation}) => {
  const [accessToken, setAccessToken] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const loginWithSpotify = async () => {
    try {
      const authResult = await authorize(spotifyAuthConfig);
      setAccessToken(authResult.accessToken);
      fetchTopData(authResult.accessToken);
    } catch (error) {
      console.error('Spotify login error:', error);
    }
  };

  const fetchTopData = async token => {
    setLoading(true);
    try {
      // Fetch Top Songs
      const tracksResponse = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks?limit=5',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setTopTracks(tracksResponse.data.items);

      // Fetch Top Artists
      const artistsResponse = await axios.get(
        'https://api.spotify.com/v1/me/top/artists?limit=5',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setTopArtists(artistsResponse.data.items);
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMusicItem = (item, type) => (
    <View style={styles.musicItem}>
      <Image
        source={{
          uri: type === 'track' ? item.album.images[0].url : item.images[0].url,
        }}
        style={styles.musicImage}
      />
      <View style={styles.musicItemDetails}>
        <Text style={styles.musicItemTitle} numberOfLines={1}>
          {type === 'track' ? item.name : item.name}
        </Text>
        <Text style={styles.musicItemSubtitle} numberOfLines={1}>
          {type === 'track' ? item.artists[0].name : 'Artist'}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#1DB954', '#191414']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ProgressBar step={5} />

        <View style={styles.contentContainer}>
          <Header
            iconName="spotify"
            title="My Top Music"
            subtitle="Discover your musical taste"
            textStyle={styles.headerText}
          />

          {!accessToken ? (
            <TouchableOpacity
              style={styles.spotifyButton}
              onPress={loginWithSpotify}>
              <Icon name="spotify" size={30} color="white" />
              <Text style={styles.spotifyButtonText}>Login with Spotify</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.musicContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <>
                  <View style={styles.musicSection}>
                    <Text style={styles.sectionTitle}>🎵 Top 5 Songs</Text>
                    <FlatList
                      data={topTracks}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => renderMusicItem(item, 'track')}
                      scrollEnabled={false}
                    />
                  </View>

                  <View style={styles.musicSection}>
                    <Text style={styles.sectionTitle}>🎤 Top 5 Artists</Text>
                    <FlatList
                      data={topArtists}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => renderMusicItem(item, 'artist')}
                      scrollEnabled={false}
                    />
                  </View>
                </>
              )}
            </View>
          )}
        </View>

        <NextButton
          onPress={() => navigation.navigate('NextScreen')}
          style={styles.nextButton}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  headerText: {
    color: 'white',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  spotifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  musicContainer: {
    marginTop: 20,
  },
  musicSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  musicImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  musicItemDetails: {
    flex: 1,
  },
  musicItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  musicItemSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});

export default SpotifyTopMusicScreen;
