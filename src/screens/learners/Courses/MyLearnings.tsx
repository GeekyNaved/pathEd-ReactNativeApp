/* eslint-disable react/no-unstable-nested-components */
import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import VideoPlayer from '../../../components/CustomVideoPlayer'
import CustomVideoPlayer from '../../../components/CustomVideoPlayer';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ChapterItem from '../../tutor/Courses/ChapterItem';
import { moderateScale } from 'react-native-size-matters';
import { TEXT_COLOR, GRAY } from '../../../utils/colors';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../../../components/CartItem';
import NoItem from '../../../components/NoItem';


const MyLearnings = () => {
    const isFocused = useIsFocused();
    const [purchasedItems, setPurchasedItems] = useState([]);
    const navigation = useNavigation();

    const getCourses = async () => {
        const userId = await AsyncStorage.getItem('USERID');
        const items = await firestore().collection('learners').doc(userId).get();
        setPurchasedItems(items.data()?.purchasedCourses);
    };

    // const deleteCourse = async (item) => {
    //     const userId = await AsyncStorage.getItem('USERID');
    //     const cartItem = purchasedItems.filter(x => x.courseId != item.courseId);

    //     await firestore().collection('learners').doc(userId).update({
    //         purchasedCourses: cartItem,
    //     });

    //     getCourses();
    // };

    useEffect(() => {
        getCourses();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            {/* <CustomVideoPlayer /> */}
            {/* <View style={styles.seperator} /> */}
            <FlatList
                data={purchasedItems}
                ListEmptyComponent={() => <NoItem message={'No Items Present in watch list'} />}
                renderItem={({ item }) => {
                    return (
                        <CartItem
                            onPress={() => {
                                navigation.navigate('WatchVideo', {
                                    data: item,
                                });
                            }}
                            item={item}
                        />
                    );
                }}
            />
        </View>
    );
};

export default MyLearnings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white'
    },
    title: {
        width: '90%',
        fontSize: moderateScale(18),
        color: TEXT_COLOR,
        alignSelf: 'center',
        marginTop: moderateScale(10),
        fontWeight: '600',
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: GRAY,
        marginTop: moderateScale(20),
        opacity: 4,
    },
});
