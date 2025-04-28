import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { THEME_COLOR } from './src/utils/colors';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={THEME_COLOR} />
      <MainNavigator />
    </>
  );
};

export default App;
