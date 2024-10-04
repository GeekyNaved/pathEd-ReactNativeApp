import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { PlusIcon } from 'react-native-heroicons/outline';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { TEXT_COLOR, WHITE, GRAY } from '../../utils/colors';
import BgButton from '../BgButton';
import CustomInput from '../CustomInput';
import Loader from '../Loader';

const EditCourse = ({ navigation }) => {
    const route = useRoute();
    const [title, setTitle] = useState(route.params.data.title);
    const [desc, setDesc] = useState(route.params.data.description);
    const [price, setPrice] = useState(route.params.data.price);
    const [isActive, setIsactive] = useState(route.params.data.isActive);
    const [bannerImage, setBannerImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const addBanner = async () => {
        const res = await launchImageLibrary({ mediaType: 'photo' });
        // console.log('res', res)
        if (!res.didCancel) {
            setBannerImage(res);
        }
    };
    const updateCourse = async () => {
        setLoading(true);
        const name = await AsyncStorage.getItem('NAME');
        const email = await AsyncStorage.getItem('EMAIL');
        const userId = await AsyncStorage.getItem('USERID');
        let url = '';
        if (bannerImage != null) {

            const reference = storage().ref(bannerImage.assets[0].fileName);
            const pathToFile = bannerImage.assets[0].uri;
            // uploads file
            await reference.putFile(pathToFile);

            url = await storage().ref(bannerImage.assets[0].fileName).getDownloadURL();
        }

        await firestore()
            .collection('courses')
            .doc(route.params.data.courseId)
            .update({
                title: title,
                description: desc,
                price: price,
                isActive: isActive,
                banner: bannerImage == null ? route.params.data.banner : url,
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
                    ) :
                        bannerImage === null ? (
                            <Image source={{ uri: route.params.data.banner }} style={styles.bannerImage} />
                        ) :
                            (

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
                    title={'Update Course'}
                    color={WHITE}
                    onClick={() => updateCourse()}
                />
            </View>
            <Loader visible={loading} />
        </ScrollView >
    );
};

export default EditCourse;

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
