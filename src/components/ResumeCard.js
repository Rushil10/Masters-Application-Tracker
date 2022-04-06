import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {dodgerblue} from '../styles/ThemeStyles';

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
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 9,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: dodgerblue,
    borderRadius: 9,
  },
});

export default ResumeCard;
