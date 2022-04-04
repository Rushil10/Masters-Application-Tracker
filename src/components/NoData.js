import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function NoData({displayText, displayImage}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15
  },
});

export default NoData;
