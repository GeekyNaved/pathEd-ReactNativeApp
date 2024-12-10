import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR, GRAY, TEXT_COLOR, YELLOW } from '../../../utils/colors';
import ChapterItem from '../../tutor/Courses/ChapterItem';
import BorderButton from '../../../components/BorderButton';
import BgButton from '../../../components/BgButton';
import { UserIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';

const CourseDetails = () => {
    const route = useRoute();
    const isFocused = useIsFocused();
    const [courseData, setCourseData] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [cartItemsData, setCartItemsData] = useState([]);
    const [purchasedItemsData, setPurchasedItemsData] = useState([]);
    const [isItemPresent, setIsItemPresent] = useState(false);
    const [isItemPurchased, setIsItemPurchased] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    useEffect(() => {
        getCourseDetails();
        getChapters();
        getReviews();
        checkCartItems();
        checkPurchasedItems();
    }, [isFocused]);

    const getCourseDetails = async () => {
        setLoading(true);
        const res = await firestore().collection('courses').doc(route.params.data.courseId).get();
        setCourseData(res.data());
        // console.log('res.data()===>>>>>>>>>>>>>>>', res.data());
        setLoading(false);
    };

    const getChapters = async () => {
        const res = await firestore().collection('chapters').get();
        let temp = [];
        res.docs.forEach(item => {
            if (item.data().courseId == route.params.data.courseId) {
                temp.push({ chapterId: item.id, ...item.data() });
            }
        });
        setChapters(temp);
    };

    // to check items is present in cart or not
    const checkCartItems = async () => {
        const userId = await AsyncStorage.getItem('USERID');
        const userData = await firestore().collection('learners').doc(userId).get();
        setCartItemsData(userData.data().cartItems);
        let tempCartItems = userData.data().cartItems;
        let isPresent = false;
        if (tempCartItems.length == 0) {
            setIsItemPresent(false);
        } else {
            tempCartItems.map(item => {
                // console.log('item.courseId', item.courseId);
                // console.log('route.params.data.courseId', route.params.data.courseId);
                if (item.courseId == route.params.data.courseId) {
                    isPresent = true;
                    setIsItemPresent(isPresent);
                }
                else {
                    setIsItemPresent(isPresent);
                }
            });
        }
    };

    // to check items is present in cart or not
    const checkPurchasedItems = async () => {
        const userId = await AsyncStorage.getItem('USERID');
        const userData = await firestore().collection('learners').doc(userId).get();
        // setCartItemsData(userData.data().cartItems);
        setPurchasedItemsData(userData.data().purchasedCourses);
        let tempCartItems = userData.data().purchasedCourses;
        let isPresent = false;
        if (tempCartItems.length == 0) {
            setIsItemPurchased(false);
        } else {
            tempCartItems.map(item => {
                console.log('item.courseId', item.courseId);
                console.log('route.params.data.courseId', route.params.data.courseId);
                if (item.courseId == route.params.data.courseId) {
                    isPresent = true;
                    setIsItemPurchased(isPresent);
                }
                else {
                    setIsItemPurchased(isPresent);
                }
            });
        }
    };

    // add / remove course from cart
    const updateCartItem = async (item, courseId) => {
        setLoading(true);
        console.log('item==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', item);
        const userId = await AsyncStorage.getItem('USERID');
        let cartItems = [];
        // console.log('isItemPresent', isItemPresent)
        // remove item
        if (isItemPresent) {
            cartItems = cartItemsData.filter(x => x.courseId != courseId);
        }
        // add item
        else {
            cartItems = cartItemsData;
            // appending courseId & chapters with cart item array and pushing it
            cartItems.push({ courseId: courseId, chapters: chapters, ...item });
        }
        await firestore().collection('learners').doc(userId).update({
            cartItems: cartItems,
        });
        setLoading(false);
        checkCartItems();
        // getCourseDetails();
        // setFavCourses(userData.data()?.favCourses);
    };

    const getReviews = async () => {
        const res = await firestore().collection('reviews').get();
        let temp = [];
        res.docs.forEach(item => {
            if (item.data().courseId == route.params.data.courseId) {
                temp.push({ reviewId: item.id, ...item.data() });
            }
        });
        setReviews(temp);
    };

    const buyCourse = async (item, courseId) => {
        setLoading(true);
        try {
            const userId = await AsyncStorage.getItem('USERID');

            // Fetch the latest data from Firestore to avoid overwriting issues
            const userDoc = await firestore().collection('learners').doc(userId).get();
            let purchasedCourses = userDoc.data()?.purchasedCourses || [];

            // Push the new course into the existing array
            purchasedCourses.push({ courseId: courseId, chapters: chapters, ...item });

            // Update Firestore with the new array
            await firestore().collection('learners').doc(userId).update({
                purchasedCourses,
            });

            console.log('Course successfully purchased!');
            checkPurchasedItems(); // Refresh local data
        } catch (error) {
            console.error('Error buying course:', error);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={styles.container} >
            {
                courseData != null &&
                <Image source={{ uri: courseData.banner }} style={styles.banner} />
            }
            {
                courseData != null &&
                <Text style={styles.title}>{courseData.title}</Text>
            }
            {
                courseData != null &&
                <Text style={styles.desc}>{courseData.description}</Text>
            }
            {
                courseData != null &&
                <Text style={styles.author}>Author: {courseData.userName}</Text>
            }
            <View style={styles.buyBtn}>
                <BgButton title={isItemPurchased ? 'Purchased - Watch Now' : 'Buy Course'} color={'white'}
                    onClick={
                        isItemPurchased ? () => navigation.navigate('MyLearnings') :
                            () => buyCourse(courseData, route.params.data.courseId)}
                />
                {
                    !isItemPurchased &&
                    <BorderButton
                        title={isItemPresent ? 'Remove from Cart' : 'Add to Cart'}
                        color={TEXT_COLOR}
                        onClick={() => updateCartItem(courseData, route.params.data.courseId)}
                    />
                }
            </View>
            <View style={styles.seperator} />
            {chapters?.length > 0 && <Text style={styles.title}>Chapters</Text>}
            {
                courseData != null &&
                <FlatList
                    data={chapters}
                    renderItem={({ item, index }) => {
                        return <ChapterItem item={item} index={index} />;
                    }}
                />}
            <Text style={styles.title}>Reviews</Text>
            {
                reviews != null &&
                <FlatList
                    data={reviews}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.reviewItem}>
                                <View style={styles.userStyle}>
                                    <UserIcon size={scale(25)} color={TEXT_COLOR} />
                                    <View>
                                        <Text style={styles.userName}>{item.postedBy.name}</Text>
                                        <View style={styles.userStyle}>
                                            <Text style={styles.rating}>{item.rating}</Text>
                                            <StarIcon color={YELLOW} size={scale(20)} />
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.review}>{item.review}</Text>
                            </View>
                        );
                    }}
                />}
            <View style={styles.btnMargin}>
                <BorderButton
                    title={'Post Review'}
                    onClick={() => {
                        navigation.navigate('AddReview', {
                            courseId: route.params.data.courseId,
                            title: courseData.title,
                        });
                    }}
                />
            </View>
            <Loader visible={isFocused && loading} isTransparent={false} />

        </ScrollView>
    );
};

export default CourseDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        width: '100%',
        height: verticalScale(200),
    },
    title: {
        width: '90%',
        fontSize: moderateScale(18),
        color: TEXT_COLOR,
        alignSelf: 'center',
        marginTop: moderateScale(10),
        fontWeight: '600',
    },
    desc: {
        fontSize: moderateScale(16),
        color: TEXT_COLOR,
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(10),
    },
    author: {
        fontSize: moderateScale(16),
        color: TEXT_COLOR,
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(10),
        fontStyle: 'italic',
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: GRAY,
        marginTop: moderateScale(20),
        opacity: 4,
    },
    btnMargin: {
        marginHorizontal: moderateScale(15),
        marginBottom: verticalScale(100),
    },
    buyBtn: {
        marginHorizontal: moderateScale(15),
    },
    reviewItem: {
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(10),
    },
    userStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(5),
    },
    userName: {
        // marginLeft: moderateScale(10),
        fontSize: moderateScale(16),
        color: TEXT_COLOR,
    },
    review: {
        fontSize: moderateScale(14),
        color: TEXT_COLOR,
        backgroundColor: BG_COLOR,
        padding: moderateScale(10),
    },
});
