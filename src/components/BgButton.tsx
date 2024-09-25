import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR, THEME_COLOR } from '../utils/colors';

interface BgButtonProps {
    bg: string;
    title: string;
    onClick: () => void;
    color: string;
}

const BgButton = ({ bg, title, onClick, color }) => {
    return (
        <TouchableOpacity onPress={onClick} style={[styles.btn, { backgroundColor: bg ? bg : THEME_COLOR }]}>
            <Text style={[styles.title, { color: color ? color : TEXT_COLOR }]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default BgButton;

const styles = StyleSheet.create({
    btn: {
        width: '90%',
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
});
