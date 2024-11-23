/* eslint-disable react/no-unstable-nested-components */
import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WHITE } from '../../../utils/colors';
import FavCourseItem from '../../../components/FavCourseItem';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import NoItem from '../../../components/NoItem';
// import Loader from '../../../components/Loader';

const Favourites = () => {
  const [courses, setCourses] = useState([]);
  // const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getCourses = async () => {
    // setLoading(true);
    const userId = await AsyncStorage.getItem('USERID');
    const userData = await firestore().collection('learners').doc(userId).get();
    setCourses(userData.data().favCourses);
    // setLoading(false);
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
              onPress={() => {
                navigation.navigate('CourseDetails', {
                  data: item,
                });
              }}
              item={item}
            />
          );
        }}
      />
      {/* <Loader visible={loading} /> */}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: WHITE,
  },
});
