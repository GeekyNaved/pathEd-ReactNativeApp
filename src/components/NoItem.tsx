import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { TEXT_COLOR, WHITE } from '../utils/colors';

const NoItem = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.msg}>{message}</Text>
        </View>
    );
};

export default NoItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        backgroundColor: WHITE,
    },
    msg: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        color: TEXT_COLOR,
    },
});
