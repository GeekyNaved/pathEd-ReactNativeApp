import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BG_COLOR, TEXT_COLOR, THEME_COLOR, WHITE } from '../utils/colors';
import { LEARNER_TITLE, SELECT_USER, TUTOR_TITLE } from '../utils/strings';
import BgButton from '../components/BgButton';
import BorderButton from '../components/BorderButton';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const ChooseUserType = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require('../images/user_type.png')} style={styles.banner} />
            <View style={styles.inner}>
                <Text style={styles.heading}>{SELECT_USER}</Text>
                <BgButton title={TUTOR_TITLE} color={WHITE}
                    onClick={() => navigation.navigate(
                        'Login', {
                        screen: 'tutor',
                    })
                    }
                />
                <BorderButton title={LEARNER_TITLE} color={THEME_COLOR}
                    onClick={() => navigation.navigate(
                        'Login', {
                        screen: 'learner',
                    }
                    )}
                />
            </View>
        </View>
    );
};

export default ChooseUserType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    banner: {
        width: '100%',
        height: '28%',
    },
    inner: {
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: moderateScale(18),
        color: TEXT_COLOR,
        alignSelf: 'center',
        fontWeight: '700',
        marginTop: moderateVerticalScale(30),
    },
});
