import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const AddChapter = () => {
    const route = useRoute();

    return (
        <View>
            <Text>AddChapter: {route.params.data.title}</Text>
        </View>
    );
};

export default AddChapter;

const styles = StyleSheet.create({

});
