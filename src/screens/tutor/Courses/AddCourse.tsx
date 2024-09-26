import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { GRAY, TEXT_COLOR, WHITE } from '../../../utils/colors';
import { PlusIcon } from 'react-native-heroicons/outline';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import CustomInput from '../../../components/CustomInput';
import BgButton from '../../../components/BgButton';

const AddCourse = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [isActive, setIsactive] = useState(false);
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.addBanner}>
                <View>
                    <PlusIcon color={TEXT_COLOR} size={moderateScale(25)} />
                </View>
                <Text style={styles.addTxt}>Add New Course</Text>
            </TouchableOpacity>
            <CustomInput
                placeholder="Enter Course Title"
                keyboardType={undefined}
                onChangeText={(txt: string) => {
                    setTitle(txt);
                }}
                value={title} multiline={undefined} />
            <CustomInput
                placeholder="Enter Course Description"
                keyboardType={undefined}
                multiline={true}
                onChangeText={(txt: string) => {
                    setDesc(txt);
                }}
                value={desc}
            />
            <CustomInput
                placeholder="Enter Course Price"
                keyboardType="numeric"
                onChangeText={(txt: number) => {
                    setPrice(txt);
                }}
                value={price}
                multiline={undefined} />
            <View style={styles.activeView}>
                <Text style={styles.addTxt}>Course is Active:</Text>
                <Switch value={isActive} onValueChange={(value) => {
                    setIsactive(value);
                }} />
            </View>
            <View style={styles.gap}>
                <BgButton
                    title={'Upload Course'}
                    color={WHITE}
                />
            </View>
        </ScrollView>
    );
};

export default AddCourse;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(15),
    },
    addBanner: {
        marginTop: moderateVerticalScale(20),
        height: verticalScale(150),
        borderWidth: 1,
        borderColor: GRAY,
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTxt: {
        color: TEXT_COLOR,
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    activeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: moderateVerticalScale(20),
        marginBottom: moderateVerticalScale(10),
    },
    gap: { marginTop: moderateVerticalScale(50),
        marginBottom: moderateVerticalScale(20),
    },
});
