import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {
  blackText,
  buttonBgColor,
  dodgerblue,
  whiteText,
} from '../styles/ThemeStyles';

function ApplicationCard({application}) {
  var theme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.mainText, theme === 'dark' ? whiteText : blackText]}>
        {application.universityName}
      </Text>
      <View style={styles.marginBetween}></View>
      <Text
        style={[
          styles.secondaryText,
          theme === 'dark' ? whiteText : blackText,
        ]}>
        {application.degreeName} in {application.courseName}
      </Text>
      <View style={styles.marginBetween}></View>
      <Text
        style={[
          styles.secondaryText,
          theme === 'dark' ? whiteText : blackText,
        ]}>
        Status :{' '}
        <Text style={styles.statusColor(application.status)}>
          {application.status}
        </Text>
      </Text>
      <View style={styles.marginBetween}></View>
      <Text
        style={[
          styles.infotext,
          theme === 'dark' ? whiteText : blackText,
          styles.marginBetween,
        ]}>
        Applied On {moment(application.appliedAt).format('Do MMMM YYYY')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: buttonBgColor,
    borderRadius: 9,
  },
  mainText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
  secondaryText: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
  },
  marginBetween: {
    marginTop: 5,
  },
  statusColor: status => ({
    color:
      status === 'Accepted'
        ? 'green'
        : status === 'Applied'
        ? dodgerblue
        : 'red',
  }),
  infotext: {
    fontSize: 14,
    fontFamily: 'OpenSans-Light',
  },
});

export default ApplicationCard;
