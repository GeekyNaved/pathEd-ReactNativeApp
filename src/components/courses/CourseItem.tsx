/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR, WHITE } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const CourseItem = ({ item, index, data }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={[styles.container, { marginBottom: data?.length - 1 == index ? moderateScale(100) : moderateVerticalScale(5) }]}
            onPress={() => navigation.navigate('CourseView', { item: item })}>
            <Image source={{ uri: item.banner }} style={styles.banner} />
            <Text style={styles.title}>
                {item.title}
            </Text>
            <Text style={styles.desc}>
                {item.description}
            </Text>
            <Text style={[styles.desc, { color: 'green' }]}>
                {'Rs.' + item.price}
            </Text>

        </TouchableOpacity>
    );
};

export default CourseItem;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        // height: verticalScale(200),
        elevation: 5,
        backgroundColor: WHITE,
        borderRadius: moderateScale(8),
        marginTop: moderateScale(10),
        paddingBottom: moderateScale(10),
        // marginBottom: moderateScale(10),
    },
    banner: {
        width: '100%',
        height: verticalScale(120),
        borderRadius: moderateScale(8),
        // height: '60%',
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
