import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Accepted from './TopTabsScreens/Accepted';
import Applied from './TopTabsScreens/Applied';
import Rejected from './TopTabsScreens/Rejected';
import SortButton from '../components/SortButton';
import {useTheme} from '@react-navigation/native';
import {buttonBgColor} from '../styles/ThemeStyles';
import {sortApplication} from '../redux/actions/applicationsActions';
import {useSelector} from 'react-redux';
import store from '../redux/store';
import {useColorScheme} from 'react-native';

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
  const onPressSort = () => {
    refRBSheet.current.open();
  };
  const refRBSheet = useRef();
  const theme = useColorScheme();
  //console.log(theme);
  var studentApplications = useSelector(state => state.application);

  const onPressCategory = async category => {
    store.dispatch(
      sortApplication(category, [...studentApplications.applications]),
    );
    refRBSheet.current.close();
  };
  return (
    <SafeAreaView style={styles.container}>
      <MyTabs />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          draggableIcon: {
            backgroundColor: theme === 'dark' ? '#fff' : '#000',
          },
          container: {
            backgroundColor: theme === 'dark' ? 'black' : 'white',
          },
        }}>
        <View style={[styles.bottomSheetStyle(theme)]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>SORT BY</Text>
          </View>
          <TouchableOpacity
            onPress={() => onPressCategory('date')}
            style={styles.filterButtonStyle}>
            <Text style={styles.filterText}>Default</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressCategory('fees')}
            style={styles.filterButtonStyle}>
            <Text style={styles.filterText}>Fees</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressCategory('tag')}
            style={styles.filterButtonStyle}>
            <Text style={styles.filterText}>Tag</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressCategory('afees')}
            style={styles.filterButtonStyle}>
            <Text style={styles.filterText}>Application Fees</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      <View style={styles.addButtonStyle}>
        <SortButton onPress={onPressSort} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 21,
    fontFamily: 'OpenSans-Bold',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonStyle: {
    position: 'absolute',
    bottom: 15,
    right: 18,
  },
  bottomSheetStyle: theme => ({
    backgroundColor: theme === 'dark' ? 'black' : 'white',
    flex: 1,
  }),
  filterButtonStyle: {
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  filterText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
  },
});

export default Analytics;
