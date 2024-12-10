/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR, LIGHT_GRAY, TEXT_COLOR, THEME_COLOR, WHITE } from '../../../utils/colors';
import { PlusIcon } from 'react-native-heroicons/solid';
import CourseItem from '../../../components/courses/CourseItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { PencilIcon, TrashIcon, XCircleIcon } from 'react-native-heroicons/outline';
import Loader from '../../../components/Loader';
import NoItem from '../../../components/NoItem';

const Courses = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCourses();
  }, [isFocused]);

  // const getCourses = async () => {
  //   const userId = await AsyncStorage.getItem('USERID');
  //   const data = await firestore().collection('courses').get();
  //   let temp = [];
  //   data.docs.forEach(item => {
  //     temp.push({ courseId: item.id, ...item.data() });
  //   });
  //   setCourses(temp);
  // };

  const getCourses = async () => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const data = await firestore()
        .collection('courses')
        .where('userId', '==', userId)
        .get();

      const temp = data.docs.map(item => ({
        courseId: item.id,
        ...item.data(),
      }));

      setCourses(temp);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };


  const deleteCourse = async () => {
    setLoading(true);
    setShowDeleteModal(false);
    await firestore().collection('courses').doc(selectedItem.courseId).delete();
    setLoading(false);
    getCourses();
  };

  return (
    <View style={styles.container}>
      <FlatList data={courses} ListEmptyComponent={() => <NoItem message={'No Courses Present.'} />} renderItem={({ item, index }) => {
        return (
          <CourseItem item={item}
            index={index}
            data={courses}
            onClickOption={() => {
              setSelectedItem(item);
              setShowOptionModal(true);
            }}
          />
        )
      }} />
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddCourse')}>
        <View>
          <PlusIcon color={WHITE} size={moderateScale(25)} />
        </View>
        <Text style={styles.addTxt}>Add New Course</Text>
      </TouchableOpacity>

      <Modal
        style={{ margin: 0 }}
        isVisible={showOptionModal}
        backdropOpacity={0.3}
        onBackButtonPress={() => setShowOptionModal(false)}
        onBackdropPress={() => setShowOptionModal(false)}>
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Select Option
            </Text>
            <TouchableOpacity onPress={() => {
              setShowOptionModal(false);
              setSelectedItem(null);
            }}>
              <XCircleIcon size={moderateScale(25)} color={TEXT_COLOR} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => {
              setShowOptionModal(false);
              setShowDeleteModal(true);
            }}>
            <TrashIcon size={moderateScale(25)} color={TEXT_COLOR} />
            <Text style={styles.optionTitle}>
              Delete Course
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => {
              setShowOptionModal(false);
              navigation.navigate('EditCourse', { data: selectedItem });
            }}>
            <PencilIcon size={moderateScale(25)} color={TEXT_COLOR} />
            <Text style={styles.optionTitle}>
              Edit Course
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={showDeleteModal}
        backdropOpacity={0.3}
        onBackButtonPress={() => setShowDeleteModal(false)}
      >

        <View style={styles.confirmModal}>
          <Text style={[styles.headerTitle, { marginTop: moderateScale(20), width: '90%', alignSelf: 'center' }]}>
            Do you want to delete this course ?
          </Text>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setShowDeleteModal(false);
              }}
            >
              <Text style={styles.cancelTxt}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelBtn, { backgroundColor: THEME_COLOR }]}
              onPress={() => {
                deleteCourse();
              }}
            >
              <Text style={styles.cancelTxt}>
                Yes, Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Loader visible={loading} />
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
  bottomSheet: {
    width: '100%',
    paddingBottom: moderateScale(10),
    backgroundColor: BG_COLOR,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: moderateScale(15),
  },
  headerTitle: {
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
    fontWeight: '600',
  },
  optionItem: {
    width: '90%',
    height: verticalScale(40),
    marginTop: moderateScale(10),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionTitle: {
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
    fontWeight: '600',
    marginLeft: moderateScale(10),
  },
  confirmModal: {
    width: '100%',
    paddingBottom: moderateScale(15),
    backgroundColor: BG_COLOR,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
  },
  bottomView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(30),
  },
  cancelBtn: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: LIGHT_GRAY,
  },
  cancelTxt: {
    color: BG_COLOR,
  },
});
