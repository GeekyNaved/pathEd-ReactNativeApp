import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR, THEME_COLOR } from '../utils/colors';

const CartItem = ({ item, onRemoveClick }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.banner }} style={styles.banner} />
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => onRemoveClick()}>
                    <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.price}>₹ {item.price}</Text>
        </View>
    );
};

export default CartItem;

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
    },
    price: {
        fontSize: moderateScale(16),
        color: 'green',
        fontWeight: '600',
        position: 'absolute',
        right: moderateScale(10),
        top: moderateScale(10),
    },
    remove: {
        fontSize: moderateScale(14),
        color: THEME_COLOR,
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginLeft: moderateScale(5),
        width: '90%',
    },
});
