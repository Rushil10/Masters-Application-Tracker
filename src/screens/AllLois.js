import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import AddApplicationButton from '../components/AddApplicationButton';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import NoData from '../components/NoData';
import ResumeCard from '../components/ResumeCard';
import {getLoiOfUser} from '../redux/actions/loiActions';
import {getResumeOfUser} from '../redux/actions/resumeActions';
import store from '../redux/store';

function AllLois({navigation}) {
  var studentLois = useSelector(state => state.loi);
  const [lois, setLois] = useState(studentLois.lois);
  const [loading, setLoading] = useState(false);

  const onPressAdd = () => {
    if (lois.length >= 2) {
      Alert.alert(
        'Only 2 Permitted',
        'Soon you will be able to add more Letters Of Intent, Stay Updated for latest features , Thank you',
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
    navigation.push('AddLoi');
  };

  useEffect(() => {
    if (!studentLois.loaded) {
      store.dispatch(getLoiOfUser());
    }
  }, []);

  useEffect(() => {
    setLois(studentLois.lois);
  }, [studentLois.lois]);

  useEffect(() => {
    setLoading(studentLois.loading);
  }, [studentLois.loading]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Letter Of Intents" />
      {loading ? (
        <LoadingComponent displayText={'Loading Letter Of Intents'} />
      ) : lois.length == 0 ? (
        <View style={styles.flex1}>
          <NoData displayText="Add your different Letter Of Intents" />
          <View style={styles.addButtonStyle}>
            <AddApplicationButton onPress={onPressAdd} />
          </View>
        </View>
      ) : (
        <View style={styles.flex1}>
          <FlatList
            data={lois}
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

export default AllLois;
