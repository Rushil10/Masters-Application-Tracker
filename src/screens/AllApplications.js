import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import AddApplicationButton from '../components/AddApplicationButton';
import BannerAdd from '../components/Ads/BannerAd';
import ApplicationCard from '../components/ApplicationCard';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import {getApplicationsOfUser} from '../redux/actions/applicationsActions';
import store from '../redux/store';

const {height, width} = Dimensions.get('window');

function AllApplications({navigation}) {
  var studentApplications = useSelector(state => state.application);
  var student = useSelector(state => state.student);
  const [applications, setApplications] = useState(
    studentApplications.applications,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentApplications.loaded && student.signedIn) {
      store.dispatch(getApplicationsOfUser());
    }
  }, [student.signedIn]);

  useEffect(() => {
    setApplications(studentApplications.applications);
  }, [studentApplications.applications]);

  useEffect(() => {
    setLoading(studentApplications.loading);
  }, [studentApplications.loading]);

  const onPressAdd = () => {
    navigation.push('AddApplication');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'Applications'} />
      {loading ? (
        <LoadingComponent displayText={'Loading All Your Applications'} />
      ) : (
        <View style={{flex: 1}}>
          {applications.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={applications}
              renderItem={({item, index}) => (
                <ApplicationCard showTag={true} application={item} />
              )}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../images/apply.png')}
                style={styles.imgStyle}
              />
              <Text style={styles.textStyle}>
                Add your first University Application
              </Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.addButtonStyle}>
        <AddApplicationButton onPress={onPressAdd} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButtonStyle: {
    position: 'absolute',
    bottom: 15,
    right: 18,
  },
  imgStyle: {
    height: width * 0.45,
    width: width * 0.45,
  },
  textStyle: {
    fontSize: 25,
    fontFamily: 'OpenSans-Bold',
    marginTop:15,
    textAlign: 'center'
  },
});

export default AllApplications;
