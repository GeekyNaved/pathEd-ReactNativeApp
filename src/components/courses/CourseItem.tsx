import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR, WHITE } from '../../utils/colors';

const CourseItem = ({ item, index, data }) => {
    return (
        <View style={[styles.container, { marginBottom: data?.length - 1 == index ? moderateScale(100) : moderateVerticalScale(5) }]}>
            <Image source={require('../../images/course_item.png')} style={styles.banner} />
            <Text style={styles.title}>
                React native components
            </Text>
            <Text style={styles.desc}>
                Two types of components are available in react native.
            </Text>

        </View>
    );
};

export default CourseItem;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        height: verticalScale(200),
        elevation: 5,
        backgroundColor: WHITE,
        borderRadius: moderateScale(8),
        marginTop: moderateScale(10),
        // marginBottom: moderateScale(10),
    },
    banner: {
        width: '100%',
        height: '60%',
    },
    title: {
        color: TEXT_COLOR,
        fontSize: moderateScale(18),
        fontWeight: '700',
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(10),
    },
    desc: {
        color: TEXT_COLOR,
        fontSize: moderateScale(14),
        fontWeight: '500',
        marginHorizontal: moderateScale(10),
        opacity: 0.8,
    },
});
