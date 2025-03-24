import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({iconName, title, subtitle}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={'#2C3E50'}
          style={styles.icon}
        />
        <View style={styles.dot} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 0,
    backgroundColor: '#FFFFFF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    // Icon styling without a container
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3498DB',
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 12,
  },
  underline: {
    height: 2,
    width: '100%',
    backgroundColor: '#3498DB',
    marginTop: 4,
  },
});

export default Header;
