import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import AddApplicationButton from '../components/AddApplicationButton';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import NoData from '../components/NoData';
import ResumeCard from '../components/ResumeCard';
import {getResumeOfUser} from '../redux/actions/resumeActions';
import store from '../redux/store';

function AllResumes({navigation}) {
  var studentResumes = useSelector(state => state.resume);
  const [resumes, setResumes] = useState(studentResumes.resumes);
  const [loading, setLoading] = useState(false);

  const onPressAdd = () => {
    if (resumes.length >= 1) {
      Alert.alert(
        'Only 1 Permitted',
        'Soon you will be able to add more resumes, Stay Updated for latest features , Thank you',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
      return;
    }
    navigation.push('AddResume');
  };

  useEffect(() => {
    if (!studentResumes.loaded) {
      store.dispatch(getResumeOfUser());
    }
  }, []);

  useEffect(() => {
    setResumes(studentResumes.resumes);
  }, [studentResumes.resumes]);

  useEffect(() => {
    setLoading(studentResumes.loading);
  }, [studentResumes.loading]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="My Resumes" />
      {loading ? (
        <LoadingComponent displayText={'Loading Resumes'} />
      ) : resumes.length == 0 ? (
        <View style={styles.flex1}>
          <NoData displayText="Add your resume which will get used for application to different universities" />
          <View style={styles.addButtonStyle}>
            <AddApplicationButton onPress={onPressAdd} />
          </View>
        </View>
      ) : (
        <View style={styles.flex1}>
          <FlatList
            data={resumes}
            renderItem={({item, index}) => <ResumeCard item={item} />}
          />
          <View style={styles.addButtonStyle}>
            <AddApplicationButton onPress={onPressAdd} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButtonStyle: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  flex1: {
    flex: 1,
  },
});

export default AllResumes;
