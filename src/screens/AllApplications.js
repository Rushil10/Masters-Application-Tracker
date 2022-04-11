import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import AddApplicationButton from '../components/AddApplicationButton';
import ApplicationCard from '../components/ApplicationCard';
import LoadingComponent from '../components/LoadingComponent';
import {getApplicationsOfUser} from '../redux/actions/applicationsActions';
import store from '../redux/store';

function AllApplications({navigation}) {
  var studentApplications = useSelector(state => state.application);
  const [applications, setApplications] = useState(
    studentApplications.applications,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentApplications.loaded) {
      store.dispatch(getApplicationsOfUser());
    }
  }, []);

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
      {loading ? (
        <LoadingComponent displayText={'Loading All Your Applications'} />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={applications}
            renderItem={({item, index}) => (
              <ApplicationCard application={item} />
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
