import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { THEME_COLOR, WHITE } from '../utils/colors';
import { moderateScale, scale } from 'react-native-size-matters';

const Loader = ({ visible }) => {
    return (
        <Modal transparent visible={visible}>
            <View style={styles.container}>
                <View style={styles.inner}>
                    <ActivityIndicator size={'large'} color={THEME_COLOR} />
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    inner: {
        width: scale(80),
        height: scale(80),
        borderRadius: moderateScale(10),
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
    },

});
