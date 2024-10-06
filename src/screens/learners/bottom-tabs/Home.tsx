import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import CourseCard1 from '../../../components/CourseCard1';
import { TEXT_COLOR } from '../../../utils/colors';
import CourseCard2 from '../../../components/CourseCard2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [favCourses, setFavCourses] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getCourses();
        getFavs();
    }, [isFocused]);

    const getCourses = async () => {
        const data = await firestore().collection('courses').get();
        let temp = [];
        data.docs.forEach(item => {
            temp.push({ courseId: item.id, ...item.data() });
        });
        setTrendingCourses(temp);
    };

    const getFavs = async () => {
        const userId = await AsyncStorage.getItem('USERID');
        const userData = await firestore().collection('learners').doc(userId).get();
        setFavCourses(userData.data()?.favCourses);
    };

    const checkFav = (courseId) => {
        let tempCourse = favCourses;
        let isFav = false;
        tempCourse.map(item => {
            if (item.courseId == courseId) {
                isFav = true;
            }
        });
        // console.log('isFav', isFav)
        return isFav;
    };

    const updateFavCourse = async (status, item) => {
        const userId = await AsyncStorage.getItem('USERID');
        let favs = [];
        console.log('status', status)
        if (status) {
            favs = favCourses.filter(x => x.courseId != item.courseId);
        } else {
            favs = favCourses;
            favs.push(item);
        }
        await firestore().collection('learners').doc(userId).update({
            favCourses: favs,
        });
        getFavs();
        getCourses();
        // setFavCourses(userData.data()?.favCourses);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Trending Courses</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={trendingCourses}
                renderItem={({ item, index }) => {
                    return (
                        <CourseCard1
                            item={item}
                            isFav={checkFav(item.courseId)}
                            onFavClick={() => {
                                updateFavCourse(checkFav(item.courseId), item);
                            }}
                        />
                    );
                }}
            />
            <Text style={styles.heading}>Latest Courses</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                // horizontal
                data={trendingCourses}
                renderItem={({ item, index }) => {
                    return (
                        <CourseCard2 item={item} />
                    );
                }}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        color: TEXT_COLOR,
        fontWeight: '600',
        fontSize: moderateScale(18),
        marginLeft: moderateScale(20),
        marginTop: moderateScale(10),
        borderRadius: moderateScale(8),
    },
});
