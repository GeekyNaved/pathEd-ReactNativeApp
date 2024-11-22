import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import VideoPlayer from '../../../components/CustomVideoPlayer'
import CustomVideoPlayer from '../../../components/CustomVideoPlayer';
import { useIsFocused, useRoute } from '@react-navigation/native';
import ChapterItem from '../../tutor/Courses/ChapterItem';
import { moderateScale } from 'react-native-size-matters';
import { TEXT_COLOR, GRAY } from '../../../utils/colors';
import firestore from '@react-native-firebase/firestore';


const WatchVideo = () => {
    const [chapters, setChapters] = useState([]);
    const [playChapter, setPlayChapter] = useState('');
    const isFocused = useIsFocused();
    const route = useRoute();
    // Automatically set the first chapter to play when screen loads
    useEffect(() => {
        if (isFocused && route.params.data?.chapters?.length > 0) {
            setPlayChapter(route.params.data.chapters[0].video);
        }
    }, [isFocused, route.params.data?.chapters]);

    return (
        <ScrollView style={styles.container}>
            <CustomVideoPlayer url={playChapter} />
            <View>
                <View style={styles.seperator} />
                <Text style={styles.title}>Chapters</Text>
                {
                    <FlatList
                        data={route.params.data?.chapters}
                        renderItem={({ item, index }) => {
                            return <ChapterItem item={item} index={index} onClick={(chapter) => setPlayChapter(chapter.video)} />;
                        }}
                    />}
            </View>
        </ScrollView>
    );
};

export default WatchVideo;

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
