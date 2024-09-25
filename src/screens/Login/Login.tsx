import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BG_COLOR, TEXT_COLOR, WHITE } from '../../utils/colors';

const ChooseUserType = () => {
    const route = useRoute();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require('../../images/login.png')} style={styles.banner} />
            <Text style={styles.heading}>Welcome User, </Text>

            <TouchableOpacity
                style={styles.loginBtn} onPress={() => {
                    if (route.params.screen == 'tutor') {
                        navigation.navigate('TutorHome');
                    }
                    else {
                        navigation.navigate('LearnerHome')
                    }
                }}
            >
                <Image
                    source={require('../../images/google.png')}
                    style={styles.google}
                />
                <Text style={styles.btnText}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChooseUserType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    banner: {
        width: '100%',
        height: verticalScale(200),
    },
    heading: {
        fontSize: moderateScale(18),
        color: TEXT_COLOR,
        alignSelf: 'center',
        fontWeight: '500',
        marginTop: moderateScale(30),
        marginLeft: moderateScale(30),
    },
    loginBtn: {
        width: '90%',
        height: verticalScale(50),
        backgroundColor: WHITE,
        elevation: 5,
        marginTop: moderateScale(20),
        alignSelf: 'center',
        borderRadius: moderateScale(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
    },
    google: {
        width: scale(24),
        height: scale(24),
    },
    btnText: {
        color: TEXT_COLOR,
        fontSize: moderateScale(18),
        marginLeft: moderateScale(20),
    },
});
