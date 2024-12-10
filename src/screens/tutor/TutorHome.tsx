/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CourseSell from './bottom-tabs/CourseSell';
import Courses from './bottom-tabs/Courses';
import TutorProfile from './bottom-tabs/TutorProfile';
import { TEXT_COLOR, THEME_COLOR } from '../../utils/colors';
import {
  BookOpenIcon,
  AcademicCapIcon,
  UserCircleIcon
} from 'react-native-heroicons/outline';
import { Text } from 'react-native';


const Tab = createBottomTabNavigator();
const TutorHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: THEME_COLOR,
        tabBarInactiveTintColor: TEXT_COLOR,
        // headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Courses') {
            iconName = focused ? (
              <BookOpenIcon color={THEME_COLOR} size={25} />
            ) : (
              <BookOpenIcon color={TEXT_COLOR} size={25} />
            );
          } else if (route.name === 'CourseSell') {
            iconName = focused ? (
              <AcademicCapIcon color={THEME_COLOR} size={25} />
            ) : (
              <AcademicCapIcon color={TEXT_COLOR} size={25} />
            );
          } else if (route.name === 'TutorProfile') {
            iconName = focused ? (
              <UserCircleIcon color={THEME_COLOR} size={25} />
            ) : (
              <UserCircleIcon color={TEXT_COLOR} size={25} />
            );
          }
          // You can return any component that you like here!
          return iconName;
        },
        tabBarLabel: ({ focused }) => {
          let label;

          if (route.name === 'Courses') {
            label = (
              <Text
                style={{
                  color: focused ? THEME_COLOR : TEXT_COLOR,
                  fontSize: 12, // Adjust the font size for focused/unfocused
                }}
              >
                Courses
              </Text>
            );
          } else if (route.name === 'CourseSell') {
            label = (
              <Text
                style={{
                  color: focused ? THEME_COLOR : TEXT_COLOR,
                  fontSize: 12,
                }}
              >
                Course Sell
              </Text>
            );
          } else if (route.name === 'TutorProfile') {
            label = (
              <Text
                style={{
                  color: focused ? THEME_COLOR : TEXT_COLOR,
                  fontSize: 12,
                }}
              >
                Profile
              </Text>
            );
          }
          return label;
        },
      })}

    // })}

    >
      <Tab.Screen name="Courses" component={Courses} />
      {/* <Tab.Screen name="CourseSell" component={CourseSell} /> */}
      <Tab.Screen name="TutorProfile" component={TutorProfile} />
    </Tab.Navigator>
  );
};

export default TutorHome;
