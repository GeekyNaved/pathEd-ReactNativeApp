import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR, THEME_COLOR, WHITE } from '../../../utils/colors';
import { PlusIcon } from 'react-native-heroicons/solid';
import CourseItem from '../../../components/courses/CourseItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

const Courses = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCourses();
  }, [isFocused]);

  const getCourses = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const data = await firestore().collection('courses').get();
    let temp = [];
    data.docs.forEach(item => {
      temp.push({ courseId: item.id, ...item.data() });
    });
    setCourses(temp);
  };
  return (
    <View style={styles.container}>
      <FlatList data={courses} renderItem={({ item, index }) => {
        return <CourseItem item={item} index={index} data={courses} />;
      }} />
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddCourse')}>
        <View>
          <PlusIcon color={WHITE} size={moderateScale(25)} />
        </View>
        <Text style={styles.addTxt}>Add New Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Courses;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  addBtn: {
    height: verticalScale(50),
    flexDirection: 'row',
    gap: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(20),
    backgroundColor: THEME_COLOR,
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(15),
  },
  addTxt: {
    color: WHITE,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});
