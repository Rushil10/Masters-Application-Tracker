import React, {useEffect} from 'react';
import {
  AsyncStorage,
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
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {MyDarkTheme} from './src/styles/ThemeStyles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchStudents from './src/screens/SearchStudents';
import Profile from './src/screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/LoginScreen';
import store from './src/redux/store';
import {getUserInfo, notYetLoggedIn} from './src/redux/actions/studentActions';
import {useSelector} from 'react-redux';
import {Provider} from 'react-redux';
import MyScores from './src/screens/MyScores';
import AllResumes from './src/screens/AllResumes';
import AddResume from './src/screens/AddResume';
import PDFExample from './src/components/PdfDisplayScreen';
import AddApplication from './src/screens/AddApplication';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 11},
        tabBarShowLabel: false,
        tabBarStyle: {borderTopColor: 'grey', height: 55},
        tabBarInactiveTintColor: 'white',
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Applications',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-school-outline" color={color} size={34} />
          ),
        }}
        name="Applications"
        component={AllApplications}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={35} />
          ),
        }}
        name="Search"
        component={SearchStudents}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon2 name="profile" color={color} size={27} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

function App() {
  const scheme = useColorScheme();

  const checkLogin = async () => {
    var token = await AsyncStorage.getItem('token');
    if (token) {
      store.dispatch(getUserInfo(token));
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    } else {
      SplashScreen.hide();
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={scheme === 'dark' ? MyDarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="AllTabs" component={MyTabs} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MyScores" component={MyScores} />
          <Stack.Screen name="Resumes" component={AllResumes} />
          <Stack.Screen name="AddResume" component={AddResume} />
          <Stack.Screen name="PdfDisplay" component={PDFExample} />
          <Stack.Screen name="AddApplication" component={AddApplication} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
