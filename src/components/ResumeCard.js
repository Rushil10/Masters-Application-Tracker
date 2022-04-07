import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {buttonBgColor, dodgerblue} from '../styles/ThemeStyles';

function ResumeCard({item}) {
  const navigation = useNavigation();

  const onPressCard = () => {
    navigation.push('PdfDisplay', {
      link: item.link,
    });
  };

  return (
    <TouchableOpacity onPress={onPressCard} style={styles.container}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    fontFamily: 'OpenSans-Italic',
  },
  link: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    color: dodgerblue,
  },
  flexRow: {
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 9,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: buttonBgColor,
    borderRadius: 9,
  },
});

export default ResumeCard;
