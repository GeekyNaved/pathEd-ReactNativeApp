import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import CourseCard1 from '../../../components/CourseCard1';
import { TEXT_COLOR } from '../../../utils/colors';
import CourseCard2 from '../../../components/CourseCard2';

const Home = () => {
    const [trendingCourses, setTrendingCourses] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getCourses();
    }, [isFocused]);

    const getCourses = async () => {
        const data = await firestore().collection('courses').get();
        let temp = [];
        data.docs.forEach(item => {
            temp.push({ courseId: item.id, ...item.data() });
        });
        setTrendingCourses(temp);
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
                        <CourseCard1 item={item} />
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
