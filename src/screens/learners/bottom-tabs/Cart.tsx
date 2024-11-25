import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { GRAY, TEXT_COLOR } from '../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import CartItem from '../../../components/CartItem';
import NoItem from '../../../components/NoItem';
import BgButton from '../../../components/BgButton';
import Loader from '../../../components/Loader';

const Cart = () => {
  const isFocused = useIsFocused();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // to get purhased items
  const getPurchasedItems = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const userData = await firestore().collection('learners').doc(userId).get();
    // setCartItemsData(userData.data().cartItems);
    setPurchasedItems(userData.data().purchasedCourses);
  };

  // buy course
  const checkout = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    let course = [];
    course = purchasedItems;
    // course.push({ courseId: courseId, chapters: chapters, ...item });
    course.push(...cartItems);
    await firestore().collection('learners').doc(userId).update({
      purchasedCourses: course,
    });
    navigation.navigate("MyLearnings");
    // deleting all cart Items
    await firestore().collection('learners').doc(userId).update({
      cartItems: [],
    });

    getCartItems();
  };

  const getCartItems = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('USERID');
    const items = await firestore().collection('learners').doc(userId).get();
    // Calculate the total amount by summing the prices of all cart items
    const total = items.data().cartItems?.reduce((acc, data) => {
      return acc + Number(data.price);
    }, 0);

    setTotalAmount(total);
    setCartItems(items.data()?.cartItems);
    setLoading(false);

    // console.log('items.data()?.cartItems', items.data()?.cartItems)
  };

  const removeCartItem = async (item) => {
    const userId = await AsyncStorage.getItem('USERID');
    const cartItem = cartItems.filter(x => x.courseId != item.courseId);

    await firestore().collection('learners').doc(userId).update({
      cartItems: cartItem,
    });

    getCartItems();
  };

  useEffect(() => {
    getCartItems();
    getPurchasedItems();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ?
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total: </Text>
          <Text style={styles.price}>₹ {totalAmount}</Text>
        </View> : null}
      {cartItems.length > 0 ?
        <View style={styles.checkoutBtn}>
          <BgButton title={'Checkout'} color={'white'} onClick={checkout} />
        </View> : null}
      {cartItems.length > 0 ?
        <Text style={styles.itemCount}>{cartItems.length} Course in Cart</Text> : null}

      <FlatList
        data={cartItems}
        ListEmptyComponent={() => <NoItem message={'No Items Present in cart.'} />}
        renderItem={({ item }) => {
          return (
            <CartItem
              onRemoveClick={() => {
                removeCartItem(item);
              }}
              onPress={() => {
                navigation.navigate('CourseDetails', {
                  data: item,
                });
              }}
              item={item}
            />
          );
        }}
      />
      <Loader visible={isFocused && loading} isTransparent={false} />

    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalContainer: {
    paddingHorizontal: moderateScale(15),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  total: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  price: {
    fontSize: moderateScale(20),
    color: 'black',
    fontWeight: 'bold',
  },
  itemCount: {
    marginHorizontal: moderateScale(15),
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: TEXT_COLOR,
    borderBottomWidth: 2,
    borderBottomColor: GRAY,
    paddingBottom: moderateScale(10),
    marginTop: moderateScale(20),
  },
  checkoutBtn: {
    margin: moderateScale(15),
  },
});
