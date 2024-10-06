/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Rating } from 'react-native-ratings';
import { BG_COLOR, WHITE } from '../../../../utils/colors';
import CustomInput from '../../../../components/CustomInput';
import { moderateScale } from 'react-native-size-matters';
import BgButton from '../../../../components/BgButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../../../components/Loader';
const AddReview = () => {
    const [ratings, setRatings] = useState(0);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();

    const ratingCompleted = rating => {
        // console.log('ratings is', ratings);
        setRatings(rating);
    };

    const postReview = async () => {
        setLoading(true);
        const name = await AsyncStorage.getItem('NAME');
        const userId = await AsyncStorage.getItem('USERID');
        // console.log('name', name)
        // console.log('userId', userId)
        await firestore().collection('reviews').add({
            postedBy: {
                name: name,
                userId: userId,
            },
            review: review,
            rating: ratings,
            courseId: route.params.courseId,
        });
        setLoading(false);
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.ratingView}>
                <Rating
                    showRating
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10 }}
                    minValue={0}
                    ratingCount={5}
                    startingValue={0}
                />

            </View>
            <CustomInput
                value={review}
                onChangeText={txt => setReview(txt)}
                placeholder={'Type Review Here'} keyboardType={undefined} multiline={undefined} />
            <BgButton title={'Post Review'} color={WHITE} onClick={postReview} bg={undefined} />
            <Loader visible={loading} />
        </View>
    );
};

export default AddReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        paddingHorizontal: moderateScale(15),
    },

});
