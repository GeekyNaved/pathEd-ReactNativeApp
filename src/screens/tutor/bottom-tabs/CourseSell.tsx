import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR, WHITE } from '../../../utils/colors';
import HistoryItem from '../Courses/HistoryItem';

const CourseSell = () => {
  return (
    <View style={styles.container}>
      <View style={styles.gridView}>
        <View style={styles.gridCard}>
          <Text style={styles.heading}>{'Rs. 50000'}</Text>
          <Text style={styles.title}>{'Total Sell'}</Text>
        </View>
        <View style={styles.gridCard}>
          <Text style={styles.heading}>{'10'}</Text>
          <Text style={styles.title}>{'Courses'}</Text>
        </View>
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.heading}>{'History'}</Text>
        <FlatList showsVerticalScrollIndicator={false} data={[1, 1, 1, 1, 1, 1, 1]} renderItem={({ item, index }) => {
          return <HistoryItem item={item} index={index} data={[1, 1, 1, 1, 1, 1, 1]} />;
        }} />
      </View>
    </View>
  );
};

export default CourseSell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridView: {
    width: '90%',
    height: verticalScale(100),
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(20),
  },
  gridCard: {
    width: '45%',
    height: '100%',
    elevation: 5,
    backgroundColor: WHITE,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: TEXT_COLOR,
    marginTop: moderateScale(10),
  },
  historyContainer: {
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(10),
  },
});
