import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

function LoadingComponent({displayText, displayImage}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={30} />
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
    marginHorizontal: 15,
  },
});

export default LoadingComponent;
