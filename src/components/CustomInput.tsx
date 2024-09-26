import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { moderateVerticalScale, moderateScale, verticalScale } from 'react-native-size-matters';
import { GRAY, TEXT_COLOR, THEME_COLOR } from '../utils/colors';

const CustomInput = ({ keyboardType, onChangeText, placeholder, value, multiline }) => {
    const [isFocused, setIsfocused] = useState(false);
    return (
        <View style={[styles.container, { borderColor: isFocused ? THEME_COLOR : GRAY }, multiline ? { height: verticalScale(100) } : { height: verticalScale(50) }]}>
            <TextInput
                onBlur={() => setIsfocused(false)}
                onFocus={() => setIsfocused(true)}
                onSubmitEditing={() => setIsfocused(false)}
                style={styles.inputTxt}
                value={value}
                multiline={multiline}
                placeholder={placeholder ? placeholder : ''}
                keyboardType={keyboardType ? keyboardType : 'default'}
                onChangeText={onChangeText}
            />
        </View >
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(15),
        borderRadius: moderateVerticalScale(8),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
    },
    inputTxt: {
        color: TEXT_COLOR,
    },
});
