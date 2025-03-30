import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

const InterestsScreen = ({navigation}) => {
  const currentStep = 15;
  const MAX_SELECTIONS = 5;

  // Interest list with icons and descriptions
  const interestsList = [
    {
      id: '1',
      name: 'Movies',
      icon: 'movie-open',
      description: 'Film, cinema & entertainment',
      category: 'Entertainment',
    },
    {
      id: '2',
      name: 'Music',
      icon: 'music',
      description: 'All genres & live shows',
      category: 'Entertainment',
    },
    {
      id: '3',
      name: 'Reading',
      icon: 'book-open-page-variant',
      description: 'Books, poetry & literature',
      category: 'Arts',
    },
    {
      id: '4',
      name: 'Travel',
      icon: 'airplane',
      description: 'Exploring new places',
      category: 'Adventure',
    },
    {
      id: '5',
      name: 'Cooking',
      icon: 'chef-hat',
      description: 'Creating culinary delights',
      category: 'Lifestyle',
    },
    {
      id: '6',
      name: 'Fitness',
      icon: 'weight-lifter',
      description: 'Staying active & healthy',
      category: 'Lifestyle',
    },
    {
      id: '7',
      name: 'Photography',
      icon: 'camera',
      description: 'Capturing perfect moments',
      category: 'Arts',
    },
    {
      id: '8',
      name: 'Art',
      icon: 'palette',
      description: 'Creative expression',
      category: 'Arts',
    },
    {
      id: '9',
      name: 'Gaming',
      icon: 'gamepad-variant',
      description: 'Digital adventures',
      category: 'Entertainment',
    },
    {
      id: '10',
      name: 'Nature',
      icon: 'forest',
      description: 'Outdoors & wildlife',
      category: 'Adventure',
    },
    {
      id: '11',
      name: 'Dancing',
      icon: 'human-handsup',
      description: 'Moving to the rhythm',
      category: 'Lifestyle',
    },
    {
      id: '12',
      name: 'Sports',
      icon: 'basketball',
      description: 'Athletic competitions',
      category: 'Lifestyle',
    },
    {
      id: '13',
      name: 'Tech',
      icon: 'laptop',
      description: 'Innovation & gadgets',
      category: 'Knowledge',
    },
    {
      id: '14',
      name: 'Fashion',
      icon: 'hanger',
      description: 'Style & trends',
      category: 'Lifestyle',
    },
    {
      id: '15',
      name: 'Pets',
      icon: 'paw',
      description: 'Animal companions',
      category: 'Lifestyle',
    },
  ];

  // State management
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showMaxSelectedToast, setShowMaxSelectedToast] = useState(false);
  const toastAnimation = useState(new Animated.Value(0))[0];

  // Toast notification for max selections
  useEffect(() => {
    if (showMaxSelectedToast) {
      // Animate toast in
      Animated.sequence([
        Animated.timing(toastAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(toastAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowMaxSelectedToast(false);
      });
    }
  }, [showMaxSelectedToast]);

  // Toggle interest selection
  const toggleInterest = id => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      if (selectedInterests.length < MAX_SELECTIONS) {
        setSelectedInterests([...selectedInterests, id]);
      } else {
        // Show toast notification
        setShowMaxSelectedToast(true);
      }
    }
  };

  // Group interests by category
  const interestsByCategory = useMemo(() => {
    const grouped = {};
    interestsList.forEach(interest => {
      if (!grouped[interest.category]) {
        grouped[interest.category] = [];
      }
      grouped[interest.category].push(interest);
    });
    return grouped;
  }, [interestsList]);

  // Render an interest item
  const renderInterestItem = interest => {
    const isSelected = selectedInterests.includes(interest.id);

    return (
      <TouchableOpacity
        key={interest.id}
        activeOpacity={0.7}
        onPress={() => toggleInterest(interest.id)}
        style={[
          styles.interestItem,
          isSelected && styles.selectedInterestItem,
        ]}>
        <View style={styles.interestContent}>
          <View
            style={[
              styles.iconContainer,
              isSelected ? styles.selectedIconContainer : null,
            ]}>
            <Icon
              name={interest.icon}
              size={22}
              color={isSelected ? 'white' : '#E94057'}
            />
          </View>
          <View style={styles.interestTextContainer}>
            <Text style={styles.interestName}>{interest.name}</Text>
            <Text style={styles.interestDescription}>
              {interest.description}
            </Text>
          </View>
          {isSelected && <Icon name="check-circle" size={22} color="#E94057" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ProgressBar step={currentStep} />

      <View style={styles.contentContainer}>
        <Header
          iconName="heart-multiple"
          title="Express Yourself"
          subtitle={`Choose ${MAX_SELECTIONS} passions that define you (${selectedInterests.length}/${MAX_SELECTIONS})`}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {Object.entries(interestsByCategory).map(([category, interests]) => (
            <View key={category}>
              <Text style={styles.categoryHeader}>{category}</Text>
              <View style={styles.inputsContainer}>
                {interests.map(interest => renderInterestItem(interest))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <NextButton
        disabled={selectedInterests.length === 0}
        onPress={() => navigation.navigate('Description', {selectedInterests})}
      />

      {/* Max selection toast notification */}
      {showMaxSelectedToast && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: toastAnimation,
              transform: [
                {
                  translateY: toastAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}>
          <Icon name="information" size={20} color="white" />
          <Text style={styles.toastText}>
            Maximum {MAX_SELECTIONS} interests allowed
          </Text>
        </Animated.View>
      )}
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
  scrollView: {
    marginTop: 10,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  inputsContainer: {
    gap: 15,
  },
  interestItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  selectedInterestItem: {
    backgroundColor: '#FFF0F3',
    borderWidth: 1,
    borderColor: '#E94057',
  },
  interestContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(233, 64, 87, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  selectedIconContainer: {
    backgroundColor: '#E94057',
  },
  interestTextContainer: {
    flex: 1,
  },
  interestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  interestDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  toastContainer: {
    position: 'absolute',
    bottom: 90,
    left: 40,
    right: 40,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 25,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default InterestsScreen;
