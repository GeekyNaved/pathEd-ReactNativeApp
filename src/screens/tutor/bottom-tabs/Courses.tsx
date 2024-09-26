import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR, THEME_COLOR, WHITE } from '../../../utils/colors';
import { PlusIcon } from 'react-native-heroicons/solid';
import CourseItem from '../../../components/courses/CourseItem';

const Courses = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList data={[1, 1, 1, 1, 1, 1, 1]} renderItem={({ item, index }) => {
        return <CourseItem item={item} index={index} data={[1, 1, 1, 1, 1, 1, 1]} />;
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
