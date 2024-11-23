import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR, THEME_COLOR, WHITE } from '../utils/colors';
import { StarIcon } from 'react-native-heroicons/solid';

const FavCourseItem = ({ item, onFavClick, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Image source={{ uri: item.banner }} style={styles.banner} />
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>₹ {item.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.favView}
                onPress={() => {
                    onFavClick();
                }}
            >
                <StarIcon fill={THEME_COLOR} color={THEME_COLOR} size={scale(30)} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default FavCourseItem;

const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: scale(100),
        backgroundColor: BG_COLOR,
        marginTop: moderateScale(10),
        borderRadius: moderateScale(8),
        alignSelf: 'center',
        flexDirection: 'row',
    },
    banner: {
        width: scale(80),
        height: scale(80),
        borderRadius: moderateScale(8),
    },
    title: {
        fontSize: moderateScale(16),
        color: TEXT_COLOR,
        fontWeight: '600',
        margin: moderateScale(5),
        width: '90%',
        // alignSelf: 'center',
    },
    price: {
        fontSize: moderateScale(16),
        color: 'green',
        fontWeight: '600',
        marginLeft: moderateScale(10),
    },
    favView: {
        position: 'absolute',
        right: moderateScale(10),
        top: moderateScale(10),
        backgroundColor: WHITE,
        borderWidth: 1,
        borderRadius: scale(15),
        borderColor: WHITE,
    },
});
