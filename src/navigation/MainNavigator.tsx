import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import ChooseUserType from '../screens/ChooseUserType';
import Login from '../screens/Login/Login';
import TutorHome from '../screens/tutor/TutorHome';
import LearnerHome from '../screens/learners/LearnerHome';
import AddCourse from '../screens/tutor/Courses/AddCourse';
import CourseView from '../screens/tutor/Courses/CourseView';
import AddChapter from '../screens/tutor/Courses/AddChapter';
import EditCourse from '../components/courses/EditCourse';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen
                    name="ChooseUserType"
                    component={ChooseUserType}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TutorHome"
                    component={TutorHome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LearnerHome"
                    component={LearnerHome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddCourse"
                    component={AddCourse}
                />
                <Stack.Screen
                    name="EditCourse"
                    component={EditCourse}
                />
                <Stack.Screen
                    name="CourseView"
                    component={CourseView}
                />
                <Stack.Screen
                    name="AddChapter"
                    component={AddChapter}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
