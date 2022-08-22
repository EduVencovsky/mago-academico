import React from 'react';
import {View} from 'react-native';
import {Button, Headline} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import {ThemeContextProvider, useTheme} from './src/context/ThemeContext';

const TestScreen = () => {
  const {toggleThemeType, themeType, isDarkTheme, theme} = useTheme();

  return (
    <View>
      <Button mode="contained" onPress={toggleThemeType}>
        Toggle Theme
      </Button>
      <Headline>{themeType}</Headline>
      <Headline>isDarkTheme: {`${isDarkTheme}`}</Headline>
      <Headline>Primary: {theme.colors.primary}</Headline>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </ThemeContextProvider>
  );
};

export default App;
