import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { GRAY, TEXT_COLOR, WHITE } from '../../../utils/colors';
import { PlusIcon } from 'react-native-heroicons/outline';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import CustomInput from '../../../components/CustomInput';
import BgButton from '../../../components/BgButton';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import { useRoute } from '@react-navigation/native';

const AddChapter = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [isActive, setIsactive] = useState(false);
    const [bannerImage, setBannerImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [videoData, setVideoData] = useState(null);

    const route = useRoute();
    // console.log('route.params.data.courseId', route.params.data.courseId)

    const addBanner = async () => {
        const res = await launchImageLibrary({ mediaType: 'phone' });
        // console.log('res', res)
        if (!res.didCancel) {
            setBannerImage(res);
        }
    };
    const recordChapter = async () => {
        const res = await launchImageLibrary({ mediaType: 'video' });
        // console.log('res', res)
        if (!res.didCancel) {
            setVideoData(res);
        }
    };
    const uploadChapter = async () => {
        setLoading(true);
        const name = await AsyncStorage.getItem('NAME');
        const email = await AsyncStorage.getItem('EMAIL');
        const userId = await AsyncStorage.getItem('USERID');

        const reference = storage().ref(bannerImage.assets[0].fileName);
        const pathToFile = bannerImage.assets[0].uri;
        // uploads image file
        await reference.putFile(pathToFile);
        const url = await storage().ref(bannerImage.assets[0].fileName).getDownloadURL();

        // for video
        const referenceV = storage().ref(videoData.assets[0].fileName);
        const pathToFileV = videoData.assets[0].uri;
        // uploads video file
        await referenceV.putFile(pathToFileV);

        const videoUrl = await storage().ref(videoData.assets[0].fileName).getDownloadURL();

        await firestore().collection('chapters').add({
            title: title,
            description: desc,
            isLocked: isActive,
            banner: url,
            video: videoUrl,
            userName: name,
            userEmail: email,
            userId: userId,
            courseId: route.params.data.courseId,
        });
        setLoading(false);
        console.log('chapter uploaded successfully');
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
                            <Text style={styles.addTxt}>Add Chapter Banner</Text>
                        </View>)
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBanner} onPress={() => recordChapter()}>
                {
                    videoData != null ? (
                        <Image source={{ uri: videoData.assets[0].uri }} style={styles.bannerImage} />
                    ) : (
                        <View style={styles.bannerInner}>
                            <View>
                                <PlusIcon color={TEXT_COLOR} size={moderateScale(25)} />
                            </View>
                            <Text style={styles.addTxt}>Add Chapter Video</Text>
                        </View>)
                }
            </TouchableOpacity>
            <CustomInput
                placeholder="Enter Chapter Title"
                keyboardType={undefined}
                onChangeText={(txt: string) => {
                    setTitle(txt);
                }}
                value={title} multiline={undefined} />
            <CustomInput
                placeholder="Enter Chapter Description"
                keyboardType={undefined}
                multiline={true}
                onChangeText={(txt: string) => {
                    setDesc(txt);
                }}
                value={desc}
            />
            <View style={styles.activeView}>
                <Text style={styles.addTxt}>Chapter is Locked:</Text>
                <Switch value={isActive} onValueChange={(value) => {
                    setIsactive(value);
                }} />
            </View>
            <View style={styles.gap}>
                <BgButton
                    title={'Upload Chapter'}
                    color={WHITE}
                    onClick={() => uploadChapter()}
                />
            </View>
            <Loader visible={loading} />
        </ScrollView >
    );
};

export default AddChapter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(15),
    },
    bannerInner: {
        // flexDirection: 'row',
        gap: moderateScale(10),
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
