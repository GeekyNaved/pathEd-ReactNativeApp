import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { TEXT_COLOR } from '../../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { UserIcon } from 'react-native-heroicons/outline';

const TutorProfile = () => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    console.log(userId);
    const user = await firestore().collection('tutors').doc(userId).get();
    console.log(user.data());
    if (user.data != null) {
      setUserData(user.data());
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
      <UserIcon color={TEXT_COLOR} size={moderateScale(100)} />
      </View>
      {
        userData != null && (
          <Text style={styles.name}>{userData.user.name}</Text>
        )
      }
      {
        userData != null && (
          <Text style={styles.name}>{userData.user.email}</Text>
        )
      }
    </View>
  )
}
export default TutorProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',

  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: TEXT_COLOR,
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
});
