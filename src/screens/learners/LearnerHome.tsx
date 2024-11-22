
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TEXT_COLOR, THEME_COLOR } from '../../utils/colors';
import {
  BookOpenIcon,
  ShoppingCartIcon,
  StarIcon,
  MagnifyingGlassIcon,
  UserIcon,
  BookmarkIcon,
} from 'react-native-heroicons/outline';
import Home from './bottom-tabs/Home';
// import Search from './bottom-tabs/Search';
import Cart from './bottom-tabs/Cart';
import Profile from './bottom-tabs/Profile';
import Favourites from './bottom-tabs/Favourites';
import WatchVideo from './Courses/WatchVideo';
import MyLearnings from './Courses/MyLearnings';


const Tab = createBottomTabNavigator();
const LearnerHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: THEME_COLOR,
        tabBarInactiveTintColor: TEXT_COLOR,
        // headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? (
              <BookOpenIcon color={THEME_COLOR} size={25} fill={THEME_COLOR} />
            ) : (
              <BookOpenIcon color={TEXT_COLOR} size={25} />
            );
          } else if (route.name === 'MyLearnings') {
            iconName = focused ? (
              <BookmarkIcon color={THEME_COLOR} size={25} fill={THEME_COLOR} />
            ) : (
              <BookmarkIcon color={TEXT_COLOR} size={25} />
            );
          } else if (route.name === 'Search') {
            iconName = focused ? (
              <MagnifyingGlassIcon color={THEME_COLOR} size={25} fill={THEME_COLOR} />
            ) : (
              <MagnifyingGlassIcon color={TEXT_COLOR} size={25} />
            );
          } else if (route.name === 'Favourites') {
            iconName = focused ? (
              <StarIcon color={THEME_COLOR} size={25} fill={THEME_COLOR} />
            ) : (
              <StarIcon color={TEXT_COLOR} size={25} />
            );
          } else if (route.name === 'Cart') {
            iconName = focused ? (
              <ShoppingCartIcon color={THEME_COLOR} size={25} fill={THEME_COLOR} />
            ) : (
              <ShoppingCartIcon color={TEXT_COLOR} size={25} />
            );
          } else if (route.name === 'Profile') {
            iconName = focused ? (
              <UserIcon color={THEME_COLOR} size={25} fill={THEME_COLOR} />
            ) : (
              <UserIcon color={TEXT_COLOR} size={25} />
            );
          }
          // You can return any component that you like here!
          return iconName;
        },
        // tabBarLabel: ({ focused }) => {
        //   let label;

        //   if (route.name === 'Home') {
        //     label = (
        //       <Text
        //         style={{
        //           color: focused ? THEME_COLOR : TEXT_COLOR,
        //           fontSize: 12, // Adjust the font size for focused/unfocused
        //         }}
        //       >
        //         Home
        //       </Text>
        //     );
        //   } else if (route.name === 'Search') {
        //     label = (
        //       <Text
        //         style={{
        //           color: focused ? THEME_COLOR : TEXT_COLOR,
        //           fontSize: 12,
        //         }}
        //       >
        //         Search
        //       </Text>
        //     );
        //   } else if (route.name === 'Favourites') {
        //     label = (
        //       <Text
        //         style={{
        //           color: focused ? THEME_COLOR : TEXT_COLOR,
        //           fontSize: 12,
        //         }}
        //       >
        //         Favourites
        //       </Text>
        //     );
        //   }
        //   return label;
        // },
      })}

    // })}

    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Search" component={Search} /> */}
      <Tab.Screen name="MyLearnings" component={MyLearnings} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default LearnerHome;
