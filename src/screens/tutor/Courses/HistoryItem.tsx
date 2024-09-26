import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { TEXT_COLOR, WHITE } from '../../../utils/colors';

const HistoryItem = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Course Detail:</Text>
            <Text style={styles.subtitle}>Course Name: React Native</Text>
            <Text style={styles.subtitle}>Price Rs. 4999</Text>
            <Text style={[styles.title, { marginTop: moderateVerticalScale(10) }]}>Purchased By:</Text>
            <Text style={styles.subtitle}>Name: React Native</Text>
            <Text style={styles.subtitle}>Email: naved11@gmail.com</Text>
            <Text style={styles.subtitle}>Date: 26 September 2024</Text>
        </View>
    );
};

export default HistoryItem;

const styles = StyleSheet.create({
    container: {
        // width: '90%',
        // height: verticalScale(150),
        backgroundColor: WHITE,
        // alignSelf: 'center',
        marginTop: moderateScale(20),
        borderRadius: moderateScale(8),
        padding: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: TEXT_COLOR,
    },
    subtitle: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: TEXT_COLOR,
    },
});
