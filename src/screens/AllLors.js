import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import AddApplicationButton from '../components/AddApplicationButton';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import NoData from '../components/NoData';
import ResumeCard from '../components/ResumeCard';
import {getLorOfUser} from '../redux/actions/lorActions';
import store from '../redux/store';

function AllLors({navigation}) {
  var studentLors = useSelector(state => state.lor);
  const [lors, setLors] = useState(studentLors.lors);
  const [loading, setLoading] = useState(false);

  const onPressAdd = () => {
    if (lors.length >= 2) {
      Alert.alert(
        'Only 2 Permitted',
        'Soon you will be able to add more Letters Of Recommendation, Stay Updated for latest features , Thank you',
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
    navigation.push('AddLor');
  };

  useEffect(() => {
    if (!studentLors.loaded) {
      store.dispatch(getLorOfUser());
    }
  }, []);

  useEffect(() => {
    setLors(studentLors.lors);
  }, [studentLors.lors]);

  useEffect(() => {
    setLoading(studentLors.loading);
  }, [studentLors.loading]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Letter Of Recommendations" />
      {loading ? (
        <LoadingComponent displayText={'Loading Letter Of Recommendations'} />
      ) : lors.length == 0 ? (
        <View style={styles.flex1}>
          <NoData displayText="Add your different Letter Of Recommendations" />
          <View style={styles.addButtonStyle}>
            <AddApplicationButton onPress={onPressAdd} />
          </View>
        </View>
      ) : (
        <View style={styles.flex1}>
          <FlatList
            data={lors}
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

export default AllLors;
