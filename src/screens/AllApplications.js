import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import AddApplicationButton from '../components/AddApplicationButton';
import BannerAdd from '../components/Ads/BannerAd';
import ApplicationCard from '../components/ApplicationCard';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import {getApplicationsOfUser} from '../redux/actions/applicationsActions';
import store from '../redux/store';

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
      <BannerAdd />
      {loading ? (
        <LoadingComponent displayText={'Loading All Your Applications'} />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={applications}
            renderItem={({item, index}) => (
              <ApplicationCard showTag={true} application={item} />
            )}
          />
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
});

export default AllApplications;
