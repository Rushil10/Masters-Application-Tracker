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
import {NavigationContainer, useTheme} from '@react-navigation/native';
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
import DummyScreen from './src/screens/DummyScreen';
import AllLois from './src/screens/AllLois';
import AddLoi from './src/screens/AddLoi';
import Toast from 'react-native-toast-message';
import EditApplication from './src/screens/EditApplication';
import Analytics from './src/screens/Analytics';
import DummyScreen2 from './src/screens/DummyScreen2';
import AllLors from './src/screens/AllLors';
import AddLor from './src/screens/AddLor';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  const theme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 11},
        tabBarShowLabel: false,
        tabBarStyle: {borderTopColor: 'grey', height: 55},
        tabBarInactiveTintColor: theme === 'dark' ? 'white' : 'black',
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
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
          tabBarLabel: 'Analytics',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="analytics" color={color} size={35} />
          ),
        }}
        name="Analytics"
        component={Analytics}
      />
      {/* <Tab.Screen
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={35} />
          ),
        }}
        name="Search"
        component={DummyScreen2}
      /> */}
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
    <>
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
            <Stack.Screen name="Lois" component={AllLois} />
            <Stack.Screen name="AddLoi" component={AddLoi} />
            <Stack.Screen name="Lors" component={AllLors} />
            <Stack.Screen name="AddLor" component={AddLor} />
            <Stack.Screen name="PdfDisplay" component={PDFExample} />
            <Stack.Screen name="AddApplication" component={AddApplication} />
            <Stack.Screen name="EditApplication" component={EditApplication} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
}

export default App;
