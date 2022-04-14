import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Accepted from './TopTabsScreens/Accepted';
import Applied from './TopTabsScreens/Applied';
import Rejected from './TopTabsScreens/Rejected';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accepted" component={Accepted} />
      <Tab.Screen name="Applied" component={Applied} />
      <Tab.Screen name="Rejected" component={Rejected} />
    </Tab.Navigator>
  );
}

function Analytics({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <MyTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Analytics;
