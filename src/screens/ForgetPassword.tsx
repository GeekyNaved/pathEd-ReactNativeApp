import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import { useNavigation, useRoute } from '@react-navigation/native';
import { GRAY, LIGHT_BLACK, RED, TEXT_COLOR, THEME_COLOR, WHITE } from '../utils/colors';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import Loader from '../components/Loader';

// const {RNTwitterSignIn} = NativeModules;

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    // sign in with email and password starts
    const areEmailPassEmpty = () => {
        // console.log('email: ', email, 'pass: ', pass);
        if (!email.length) {
            setErrMsg('Please enter email');
            return true;
        }
        setErrMsg('');
        return false;
    };
    const handleForgotPassword = () => {
        setLoading(true);
        if (areEmailPassEmpty()) {
            setLoading(false)
            return;
        }
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert('Check your mail', `Reset password link sent to ${email}`, [
                    { text: 'Got it', onPress: () => { } },
                ]);
                // setShowLoader(false)
                setLoading(false)
            })
            .catch((error) => {
                handleError(error);
                // setShowLoader(false)
                setLoading(false)
            });
    };

    const handleError = (error) => {
        console.log('error', error)
        if (error.code === 'auth/email-already-in-use') {
            // console.log('That email address is already in use!');
            setErrMsg('Email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            // console.log('That email address is invalid!');
            setErrMsg('Email address is invalid!');
        }
        if (error.code === 'auth/wrong-password') {
            // console.log('Wrong password!');
            setErrMsg('Wrong password!');
        }
        if (error.code === 'auth/too-many-requests') {
            // console.log('Too many requests!');
            setErrMsg('Too many requests! Please try later');
        }
        if (error.code === 'auth/user-not-found') {
            // console.log('No user found! Please sign up');
            setErrMsg('No user found! Please sign up');
        }
    };

    return (
        <ScrollView>
            <View style={styles.loginContainer}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={styles.pageTitle}>Forgot password</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputView}>
                        {errMsg.length ? <Text style={styles.errMsg}>{errMsg}</Text> : null}
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={GRAY}
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            keyboardType={'email-address'}
                        />
                    </View>

                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Text style={styles.signUp}>Go back to Login</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleForgotPassword}>
                        <View>
                            <Text style={styles.signInBtn}>Submit</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <Loader visible={loading} isTransparent={true} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: moderateScale(50),
    },
    pageTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: 'black',
    },
    inputContainer: { width: '100%' },
    inputView: {
        marginVertical: verticalScale(15),
    },
    input: {
        color: LIGHT_BLACK,
        borderColor: LIGHT_BLACK,
        borderWidth: scale(1),
        borderRadius: scale(15),
        paddingHorizontal: moderateScale(15),
    },

    OrTxt: { fontSize: verticalScale(20), marginVertical: verticalScale(10) },
    signInBtn: {
        paddingHorizontal: moderateScale(15),
        paddingVertical: verticalScale(10),
        marginVertical: verticalScale(15),
        borderColor: THEME_COLOR,
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: THEME_COLOR,
        color: WHITE,
        borderRadius: scale(10),
    },
    errMsg: {
        color: RED,
        fontSize: verticalScale(15),
        paddingVertical: verticalScale(5),
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUp: {
        color: THEME_COLOR,
        textDecorationLine: 'underline',
    },
    googleBtn: {
        height: verticalScale(50),
        backgroundColor: WHITE,
        elevation: 5,
        marginTop: moderateScale(20),
        borderRadius: moderateScale(5),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    google: {
        width: scale(24),
        height: scale(24),
    },
    btnText: {
        color: TEXT_COLOR,
        fontSize: moderateScale(15),
        marginLeft: moderateScale(20),
    },
});

export default ForgetPassword;
