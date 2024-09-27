import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TEXT_COLOR, THEME_COLOR } from '../utils/colors';
import { SPLASH_TAGLINE } from '../utils/strings';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      check();
    }, 2000);
  }, []);

  const check = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    if (userId != null) {
      navigation.navigate('TutorHome');
    } else {
      navigation.navigate('Choose UserType');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={THEME_COLOR} />
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.tagline}>{SPLASH_TAGLINE}</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
  },
  logo: {
    width: '50%',
    height: '20%',
  },
  tagline: {
    color: TEXT_COLOR,
    fontWeight: '600',
    fontSize: 16,
  }
});
