import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import AddApplicationButton from '../components/AddApplicationButton';
import NoData from '../components/NoData';

function AllResumes({navigation}) {
  const onPressAdd = () => {
    navigation.push('AddResume');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NoData displayText="Add your resume which will get used for application to different universities" />
      <View style={styles.addButtonStyle}>
        <AddApplicationButton onPress={onPressAdd} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButtonStyle: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});

export default AllResumes;
