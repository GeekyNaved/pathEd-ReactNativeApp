import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { GRAY, TEXT_COLOR, WHITE } from '../../../utils/colors';
import { PlusIcon } from 'react-native-heroicons/outline';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import CustomInput from '../../../components/CustomInput';
import BgButton from '../../../components/BgButton';
import { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';

const AddCourse = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [isActive, setIsactive] = useState(false);
    const [bannerImage, setBannerImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const addBanner = async () => {
        const res = await launchCamera({ mediaType: 'photo' });
        // console.log('res', res)
        if (!res.didCancel) {
            setBannerImage(res);
        }
    };
    const uploadCourse = async () => {
        setLoading(true);
        const name = await AsyncStorage.getItem("NAME");
        const email = await AsyncStorage.getItem("EMAIL");
        const userId = await AsyncStorage.getItem("USERID");

        const reference = storage().ref(bannerImage.assets[0].fileName);
        const pathToFile = bannerImage.assets[0].uri;
        // uploads file
        await reference.putFile(pathToFile);

        const url = await storage().ref(bannerImage.assets[0].fileName).getDownloadURL();

        await firestore().collection("courses").add({
            title: title,
            description: desc,
            price: price,
            isActive: isActive,
            banner: url,
            userName: name,
            userEmail: email,
            userId: userId,
        });
        setLoading(false);
        navigation.goBack();

    };
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.addBanner} onPress={() => addBanner()}>
                {
                    bannerImage != null ? (
                        <Image source={{ uri: bannerImage.assets[0].uri }} style={styles.bannerImage} />
                    ) : (

                        <View style={styles.bannerInner}>
                            <View>
                                <PlusIcon color={TEXT_COLOR} size={moderateScale(25)} />
                            </View>
                            <Text style={styles.addTxt}>Add New Course</Text>
                        </View>)
                }
            </TouchableOpacity>
            <CustomInput
                placeholder="Enter Course Title"
                keyboardType={undefined}
                onChangeText={(txt: string) => {
                    setTitle(txt);
                }}
                value={title} multiline={undefined} />
            <CustomInput
                placeholder="Enter Course Description"
                keyboardType={undefined}
                multiline={true}
                onChangeText={(txt: string) => {
                    setDesc(txt);
                }}
                value={desc}
            />
            <CustomInput
                placeholder="Enter Course Price"
                keyboardType="numeric"
                onChangeText={(txt: number) => {
                    setPrice(txt);
                }}
                value={price}
                multiline={undefined} />
            <View style={styles.activeView}>
                <Text style={styles.addTxt}>Course is Active:</Text>
                <Switch value={isActive} onValueChange={(value) => {
                    setIsactive(value);
                }} />
            </View>
            <View style={styles.gap}>
                <BgButton
                    title={'Upload Course'}
                    color={WHITE}
                    onClick={() => uploadCourse()}
                />
            </View>
            <Loader visible={loading} />
        </ScrollView >
    );
};

export default AddCourse;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(15),
    },
    bannerInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(8),
    },
    addBanner: {
        marginTop: moderateVerticalScale(20),
        height: verticalScale(150),
        borderWidth: 1,
        borderColor: GRAY,
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTxt: {
        color: TEXT_COLOR,
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    activeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: moderateVerticalScale(20),
        marginBottom: moderateVerticalScale(10),
    },
    gap: {
        marginTop: moderateVerticalScale(50),
        marginBottom: moderateVerticalScale(20),
    },
});
