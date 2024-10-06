/* eslint-disable react/no-unstable-nested-components */
import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WHITE } from '../../../utils/colors';
import FavCourseItem from '../../../components/FavCourseItem';
import { useIsFocused } from '@react-navigation/native';
import NoItem from '../../../components/NoItem';

const Favourites = () => {
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();

  const getCourses = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const userData = await firestore().collection('learners').doc(userId).get();
    setCourses(userData.data().favCourses);
  };

  const updateFavCourse = async (item) => {
    const userId = await AsyncStorage.getItem('USERID');
    const favs = courses.filter(x => x.courseId != item.courseId);

    await firestore().collection('learners').doc(userId).update({
      favCourses: favs,
    });

    getCourses();
  };

  useEffect(() => {
    getCourses();
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        ListEmptyComponent={() => <NoItem message={'No Favourite courses'} />}
        renderItem={({ item }) => {
          return (
            <FavCourseItem
              onFavClick={() => {
                updateFavCourse(item);
              }}
              item={item}
            />
          );
        }}
      />
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
