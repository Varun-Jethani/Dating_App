import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HeightScreen = ({navigation}) => {
  const currentStep = 5;
  const [selectedUnit, setSelectedUnit] = useState('cm'); // 'cm' or 'ft'
  const [height, setHeight] = useState({
    cm: 170,
    ft: 5,
    inch: 7,
  });

  const incrementHeight = unit => {
    if (unit === 'cm') {
      setHeight({...height, cm: Math.min(height.cm + 1, 220)});
    } else if (unit === 'ft') {
      setHeight({...height, ft: Math.min(height.ft + 1, 7)});
    } else if (unit === 'inch') {
      if (height.inch === 11) {
        if (height.ft < 7) {
          setHeight({...height, ft: height.ft + 1, inch: 0});
        }
      } else {
        setHeight({...height, inch: height.inch + 1});
      }
    }
  };

  const decrementHeight = unit => {
    if (unit === 'cm') {
      setHeight({...height, cm: Math.max(height.cm - 1, 120)});
    } else if (unit === 'ft') {
      setHeight({...height, ft: Math.max(height.ft - 1, 4)});
    } else if (unit === 'inch') {
      if (height.inch === 0) {
        if (height.ft > 4) {
          setHeight({...height, ft: height.ft - 1, inch: 11});
        }
      } else {
        setHeight({...height, inch: height.inch - 1});
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={currentStep} />
      <View style={styles.contentContainer}>
        <Header
          iconName="human-male-height"
          title="What's your height"
          subtitle="Do height really matter?"
        />

        {/* Unit Toggle */}
        <View style={styles.unitToggleContainer}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              selectedUnit === 'cm' && styles.selectedUnitButton,
            ]}
            onPress={() => setSelectedUnit('cm')}>
            <Text
              style={[
                styles.unitButtonText,
                selectedUnit === 'cm' && styles.selectedUnitButtonText,
              ]}>
              cm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              selectedUnit === 'ft' && styles.selectedUnitButton,
            ]}
            onPress={() => setSelectedUnit('ft')}>
            <Text
              style={[
                styles.unitButtonText,
                selectedUnit === 'ft' && styles.selectedUnitButtonText,
              ]}>
              ft
            </Text>
          </TouchableOpacity>
        </View>

        {/* Height Selector */}
        <View style={styles.heightSelectorContainer}>
          {selectedUnit === 'cm' ? (
            /* CM Selector */
            <View style={styles.cmSelector}>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={() => incrementHeight('cm')}>
                <MaterialCommunityIcons
                  name="chevron-up"
                  size={30}
                  color="#999"
                />
              </TouchableOpacity>

              <View style={styles.valueContainer}>
                <Text style={styles.heightValue}>{height.cm}</Text>
                <Text style={styles.heightUnit}>cm</Text>
              </View>

              <TouchableOpacity
                style={styles.arrowButton}
                onPress={() => decrementHeight('cm')}>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={30}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          ) : (
            /* Feet & Inches Selector */
            <View style={styles.ftInSelector}>
              {/* Feet */}
              <View style={styles.singleUnitSelector}>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => incrementHeight('ft')}>
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={30}
                    color="#999"
                  />
                </TouchableOpacity>

                <View style={styles.valueContainer}>
                  <Text style={styles.heightValue}>{height.ft}</Text>
                  <Text style={styles.heightUnit}>ft</Text>
                </View>

                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => decrementHeight('ft')}>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={30}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

              {/* Inches */}
              <View style={styles.singleUnitSelector}>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => incrementHeight('inch')}>
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={30}
                    color="#999"
                  />
                </TouchableOpacity>

                <View style={styles.valueContainer}>
                  <Text style={styles.heightValue}>{height.inch}</Text>
                  <Text style={styles.heightUnit}>in</Text>
                </View>

                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => decrementHeight('inch')}>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={30}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Height Visual Indicator */}
        <View style={styles.heightVisualContainer}>
          <View style={styles.heightVisual}>
            <View
              style={[
                styles.heightIndicator,
                {
                  height:
                    selectedUnit === 'cm'
                      ? `${Math.min(
                          ((height.cm - 120) / (220 - 120)) * 100,
                          100,
                        )}%`
                      : `${Math.min(
                          ((height.ft * 12 + height.inch - 48) / (84 - 48)) *
                            100,
                          100,
                        )}%`,
                },
              ]}
            />
          </View>
          <MaterialCommunityIcons
            name="human-male-height"
            size={120}
            color="#DDD"
          />
        </View>
      </View>
      <NextButton onPress={() => navigation.navigate('Religion')} />
    </SafeAreaView>
  );
};

export default HeightScreen;

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
  unitToggleContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 4,
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  selectedUnitButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  unitButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  selectedUnitButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  heightSelectorContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  cmSelector: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ftInSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  singleUnitSelector: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 10,
  },
  valueContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  heightValue: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#333',
  },
  heightUnit: {
    fontSize: 18,
    color: '#999',
    marginTop: 5,
  },
  heightVisualContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 30,
    flex: 1,
  },
  heightVisual: {
    width: 20,
    height: 180,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginRight: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heightIndicator: {
    width: '100%',
    backgroundColor: '#3498DB',
    borderRadius: 10,
  },
});
