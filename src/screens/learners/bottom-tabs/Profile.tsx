import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { TEXT_COLOR } from '../../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { UserIcon } from 'react-native-heroicons/outline';
import BorderButton from '../../../components/BorderButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Loader from '../../../components/Loader';

const Profile = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, [isFocused]);
    const getData = async () => {
        setLoading(true);
        const userId = await AsyncStorage.getItem('USERID');
        // console.log('userId', userId);
        const userType = await AsyncStorage.getItem('USERTYPE');
        // console.log('userType', userType);
        const user = await firestore().collection(userType).doc(userId).get();
        // console.log("user.data()", user.data());
        if (user.data != null) {
            setUserData(user.data());
        }
        setLoading(false);
    };

    const onLogout = async () => {
        try {
            await GoogleSignin.signOut();
            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{ name: 'ChooseUserType' }], // Reset stack to Login screen
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <UserIcon color={TEXT_COLOR} size={moderateScale(100)} />
            </View>
            {
                userData != null && (
                    <Text style={styles.name}>{userData.user.name}</Text>
                )
            }
            {
                userData != null && (
                    <Text style={styles.name}>{userData.user.email}</Text>
                )
            }
            <View style={styles.btnContainer}>
                <BorderButton
                    title={'Logout'}
                    onClick={onLogout}
                />
            </View>
            <Loader visible={isFocused && loading} isTransparent={false} />

        </View>
    );
};
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        alignSelf: 'center',
    },
    name: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: TEXT_COLOR,
        alignSelf: 'center',
        marginTop: moderateScale(10),
    },
    btnContainer: {
        paddingHorizontal: moderateScale(20),
    },
});
