import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import { useNavigation, useRoute } from '@react-navigation/native';
import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { GRAY, LIGHT_BLACK, RED, TEXT_COLOR, THEME_COLOR, WHITE } from '../utils/colors';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import Loader from '../components/Loader';

// const {RNTwitterSignIn} = NativeModules;

const LoginAndSignup = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [signInMode, setSignInMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

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
            setLoading(false);
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
        setLoading(true);
        const collection = route.params.screen === 'tutor' ? 'tutors' : 'learners';
        const userDocRef = firestore().collection(collection).doc(data.user.id);
        try {
            const userDoc = await userDocRef.get();

            if (!userDoc.exists) {
                // New user: create a document with default values
                await userDocRef.set({
                    ...data,
                    favCourses: [],
                    cartItems: [],
                    purchasedCourses: [],
                });
            } else {
                // Existing user: update only relevant fields or skip updating
                await userDocRef.update({
                    ...data, // Add any additional fields you want to update
                });
            }

            // Store data locally in AsyncStorage
            await AsyncStorage.setItem('NAME', data.user.name);
            await AsyncStorage.setItem('EMAIL', data.user.email);
            await AsyncStorage.setItem('USERID', data.user.id);
            await AsyncStorage.setItem('USERTYPE', collection);

            setLoading(false);

            // Navigate to the appropriate screen
            if (route.params.screen === 'tutor') {
                navigation.navigate('TutorHome');
            } else {
                navigation.navigate('LearnerHome');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error storing user data:', error);
        }
    };

    const storeUserData = async (data) => {

        const collection = route.params.screen === 'tutor' ? 'tutors' : 'learners';
        const userDocRef = firestore().collection(collection).doc(data.uid);

        // Extract only necessary fields
        const userData = {
            id: data.uid,
            name: data.displayName || '',
            email: data.email || '',
            favCourses: [],
            cartItems: [],
            purchasedCourses: [],
        };

        try {
            const userDoc = await userDocRef.get();

            if (!userDoc.exists) {
                // New user: create a document
                await userDocRef.set(userData);
            } else {
                // Existing user: update only certain fields
                // await userDocRef.update(userData);
            }

            // Store data locally in AsyncStorage
            await AsyncStorage.setItem('NAME', userData.name);
            await AsyncStorage.setItem('EMAIL', userData.email);
            await AsyncStorage.setItem('USERID', userData.id);
            await AsyncStorage.setItem('USERTYPE', collection);

            // Navigate to the appropriate screen
            if (route.params.screen === 'tutor') {
                navigation.navigate('TutorHome');
            } else {
                navigation.navigate('LearnerHome');
            }
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    };

    useEffect(() => {
        GoogleSignin.configure();
    }, []);



    // sign in with email and password starts
    const areEmailPassEmpty = () => {
        // console.log('email: ', email, 'pass: ', pass);
        if (!email.length) {
            setErrMsg('Please enter email');
            return true;
        }
        if (!pass.length) {
            setErrMsg('Please enter password');
            return true;
        }
        setErrMsg('');
        return false;
    };

    const handleEmailPassSignUp = () => {
        setLoading(true);
        if (areEmailPassEmpty()) {
            setLoading(false);
            return;
        }
        auth()
            .createUserWithEmailAndPassword(email, pass)
            .then((userInfo) => {
                setLoading(false);
                console.log('userInfo', userInfo)
                storeUserData(userInfo.user);
                setErrMsg('');
            })
            .catch((error) => {
                handleError(error);
                setLoading(false);
            });
    };

    // const handleEmailPassSignIn = () => {
    //     setLoading(true);
    //     if (areEmailPassEmpty()) {
    //         setLoading(false);
    //         return;
    //     }
    //     auth()
    //         .signInWithEmailAndPassword(email, pass)
    //         .then((userInfo) => {
    //             storeData(userInfo);
    //             setLoading(false);
    //             setErrMsg('');
    //         })
    //         .catch((error) => {
    //             handleError(error);
    //             setLoading(false);
    //         });
    // };

    const handleEmailPassSignIn = async () => {
        setLoading(true);
        try {
            if (areEmailPassEmpty()) {
                setLoading(false);
                return;
            }

            const userInfo = await auth().signInWithEmailAndPassword(email, pass);
            storeUserData(userInfo.user);
            setErrMsg('');
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };


    const handleError = (error) => {
        console.log('error', error.code)
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
        if (error.code === 'auth/invalid-credential') {
            // console.log('No user found! Please sign up');
            setErrMsg('Invalid Credentials');
        }
    };

    return (
        <ScrollView>
            <View style={styles.loginContainer}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={styles.pageTitle}>{signInMode ? 'Sign In' : 'Sign Up'}</Text>
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
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={GRAY}
                            onChangeText={setPass}
                            value={pass}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity onPress={signInMode ? handleEmailPassSignIn : handleEmailPassSignUp}>
                        <View>
                            <Text style={styles.signInBtn}>{signInMode ? 'Sign In' : 'Sign Up'}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.bottomContainer}>
                        <Text style={{ color: LIGHT_BLACK }}>{!signInMode ? 'Already registered? ' : 'Not registered? '}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setErrMsg('');
                                setEmail('');
                                setPass('');
                                setSignInMode(!signInMode);
                            }}
                        >
                            <Text style={styles.signUp}>{!signInMode ? 'Sign In' : 'Sign Up'}</Text>
                        </TouchableOpacity>
                    </View>
                    {signInMode ? (
                        <View style={styles.bottomContainer}>
                            <Text style={{ color: LIGHT_BLACK }}>Forgot Password? </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    // auth().sendPasswordResetEmail(email).then()
                                    // setErrMsg("")
                                    // setPass("")
                                    navigation.navigate('ForgotPassword');
                                }}
                            >
                                <Text style={styles.signUp}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
                <View>
                    <Text style={styles.OrTxt}>Or</Text>
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.googleBtn} onPress={() => {
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
                            source={require('../images/google.png')}
                            style={styles.google}
                        />
                        <Text style={styles.btnText}>Login with Google</Text>
                    </TouchableOpacity>
                    <Loader visible={loading} isTransparent={true} />
                </View>
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

    OrTxt: { fontSize: verticalScale(20), marginVertical: verticalScale(10), color: LIGHT_BLACK },
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

export default LoginAndSignup;
