import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import AddApplicationButton from '../components/AddApplicationButton';
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
    navigation.push('AddResume');
  };

  useEffect(() => {
    if (studentResumes.resumes.length == 0) {
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
