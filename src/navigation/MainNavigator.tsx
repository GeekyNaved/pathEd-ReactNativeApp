import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import ChooseUserType from '../screens/ChooseUserType';
import Login from '../screens/Login/Login';
import TutorHome from '../screens/tutor/TutorHome';
import LearnerHome from '../screens/learners/LearnerHome';

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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
