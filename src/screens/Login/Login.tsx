import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BG_COLOR, TEXT_COLOR, WHITE } from '../../utils/colors';
import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const ChooseUserType = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // console.log('userInfo', userInfo);
            storeData(userInfo.data);
            //   if (isSuccessResponse(response)) {
            //     setState({ userInfo: response.data });
            //   } else {
            //     // sign in was cancelled by user
            //   }
        } catch (error) {
            console.log('error:LOGIN', error);
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        // operation (eg. sign in) already in progress
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // Android only, play services not available or outdated
                        break;
                    default:
                    // some other error happened
                }
            } else {
                // an error that's not related to google sign in occurred
            }
        }
    };

    const storeData = async data => {
        const collection = route.params.screen == 'tutor' ? 'tutors' : 'learners';
        // console.log('collection', collection)
        // return;
        await firestore().collection(collection).doc(data.user.id).set({ ...data, favCourses: [] });
        await AsyncStorage.setItem('NAME', data.user.name);
        await AsyncStorage.setItem('EMAIL', data.user.email);
        await AsyncStorage.setItem('USERID', data.user.id);
        await AsyncStorage.setItem('USERTYPE', collection);
        if (route.params.screen == 'tutor') {
            navigation.navigate('TutorHome');
        }
        else {
            navigation.navigate('LearnerHome');
        }
    };

    useEffect(() => {
        GoogleSignin.configure();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../images/login.png')} style={styles.banner} />
            <Text style={styles.heading}>Welcome User, </Text>

            <TouchableOpacity
                style={styles.loginBtn} onPress={() => {
                    if (route.params.screen == 'tutor') {
                        signIn();
                    }
                    else {
                        // navigation.navigate('LearnerHome');
                        signIn();
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
