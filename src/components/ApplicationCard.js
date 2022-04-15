import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import {applicationCardEmoji, tagColor} from '../Constants/scoreFunctions';
import {
  blackText,
  buttonBgColor,
  dodgerblue,
  whiteText,
} from '../styles/ThemeStyles';

function ApplicationCard({application, showFees = false, showTag = false}) {
  var theme = useColorScheme();
  const formatToCurrency = amount => {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const navigation = useNavigation();

  const onPress = () => {
    navigation.push('EditApplication', {application});
  };

  const scholarshipFees = percent => {
    var amount = ((100 - percent) * application.degreeFees) / 100;
    return formatToCurrency(amount);
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text
          style={[styles.mainText, theme === 'dark' ? whiteText : blackText]}>
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
            {application.status} {applicationCardEmoji(application.status)}
          </Text>
        </Text>
        {showTag && (
          <View>
            <View style={styles.marginBetween}></View>
            <Text
              style={[
                styles.secondaryText,
                theme === 'dark' ? whiteText : blackText,
              ]}>
              Tag :{' '}
              <Text style={styles.tagColor(application.tag)}>
                {application.tag}
              </Text>
            </Text>
          </View>
        )}
        {showFees && (
          <View>
            <View style={styles.marginBetween}></View>
            <Text
              style={[
                styles.secondaryText,
                theme === 'dark' ? whiteText : blackText,
              ]}>
              Fees :{' '}
              <Text style={styles.greenColor}>
                {formatToCurrency(application.degreeFees)}
              </Text>
            </Text>
            {application.scholarshipPercentage > 0 && (
              <Text>
                Scholarship Adjusted Fees :{' '}
                {scholarshipFees(application.scholarshipPercentage)}
              </Text>
            )}
          </View>
        )}
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
    </TouchableWithoutFeedback>
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
  greenColor: {
    color: '#118c4f',
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
  tagColor: tag => ({
    color: tagColor(tag),
  }),
  statusColor: status => ({
    color:
      status === 'Accepted'
        ? 'green'
        : status === 'Applied'
        ? dodgerblue
        : '#ff4c4c',
  }),
  infotext: {
    fontSize: 14,
    fontFamily: 'OpenSans-Light',
  },
});

export default ApplicationCard;
