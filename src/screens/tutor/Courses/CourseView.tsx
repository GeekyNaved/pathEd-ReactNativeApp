import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR } from '../../../utils/colors';
import BorderButton from '../../../components/BorderButton';
import firestore from '@react-native-firebase/firestore';
import ChapterItem from './ChapterItem';

const CourseView = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [chapters, setChapters] = useState([]);
    useEffect(() => {
        getChapters();
    }, [isFocused]);

    const getChapters = async () => {
        const res = await firestore().collection('chapters').get();
        let temp = [];
        res.docs.forEach(item => {
            if (item.data().courseId == route.params.item.courseId) {
                temp.push({ chapterId: item.id, ...item.data() });
            }
        });
        setChapters(temp);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: route.params.item.banner }} style={styles.banner} />
            <Text style={styles.title}>{route.params.item.title}</Text>
            <Text style={styles.desc}>{route.params.item.description}</Text>
            <View style={styles.btnContainer}>
                <BorderButton
                    title={'Add Chapters'}
                    onClick={() => {
                        navigation.navigate('AddChapter', {
                            data: route.params.item,
                        });
                    }}
                />
                <FlatList data={chapters} renderItem={({ item, index }) => {
                    return (
                        <ChapterItem item={item} />
                    );
                }} />
            </View>
        </View>
    );
};

export default CourseView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        width: '100%',
        height: verticalScale(180),
    },
    title: {
        fontSize: moderateScale(18),
        color: TEXT_COLOR,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: moderateVerticalScale(10),
    },
    desc: {
        fontSize: moderateScale(16),
        color: TEXT_COLOR,
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: moderateVerticalScale(10),
    },
    btnContainer: {
        paddingHorizontal: moderateScale(15),
    },
});
