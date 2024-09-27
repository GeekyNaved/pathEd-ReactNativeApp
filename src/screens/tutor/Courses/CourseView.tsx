import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR } from '../../../utils/colors';
import BorderButton from '../../../components/BorderButton';

const CourseView = () => {
    const route = useRoute();
    const navigation = useNavigation();
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
                        })
                    }}
                />
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
