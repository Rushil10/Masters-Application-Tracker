import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllApplications from './src/screens/AllApplications';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { MyDarkTheme } from './src/styles/ThemeStyles';

const Stack = createNativeStackNavigator();

function App() {

  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme==='dark' ? MyDarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Applications" component={AllApplications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
