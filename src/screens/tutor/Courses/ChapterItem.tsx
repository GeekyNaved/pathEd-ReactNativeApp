/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR } from '../../../utils/colors';

const ChapterItem = ({ item }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            disabled={item.isLocked ? true : false}
        >
            <Image
                source={{ uri: item.banner }}
                style={[styles.img, { opacity: item.isLocked ? 0.4 : 1 }]}
            />
            <View style={styles.txtContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                {
                    item.isLocked ?
                        <Text style={styles.lock}>Chapter is locked</Text>
                        : null
                }
            </View>
        </TouchableOpacity>
    );
};

export default ChapterItem;

const styles = StyleSheet.create({
    container: {
        // width: '90%',
        flexDirection: 'row',
        // alignSelf: 'center',
        // height: verticalScale(80),
        // justifyContent: 'space-between',
        backgroundColor: BG_COLOR,
        marginTop: moderateScale(10),
        padding: moderateScale(10),
        borderRadius: moderateScale(8),
    },
    img: {
        width: scale(80),
        height: scale(80),
    },
    txtContainer: {
        marginLeft: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(18),
        color: TEXT_COLOR,
        fontWeight: '600',
    },
    desc: {
        color: '#6e6e6e',
        width: '90%',
    },
    lock: {
        color: TEXT_COLOR,
        fontWeight: '500',
    }
});
