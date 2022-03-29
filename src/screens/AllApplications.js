import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import AddApplicationButton from '../components/AddApplicationButton';

function AllApplications({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>All Applications</Text>
      </View>
      <View style={styles.addButtonStyle}>
        <AddApplicationButton />
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
