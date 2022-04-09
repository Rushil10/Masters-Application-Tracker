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

function FormPicker({item, onPressCard}) {
  const navigation = useNavigation();
  const onPressLink = () => {
    navigation.push('PdfDisplay', {
      link: item.link,
    });
  };

  const onPress = () => {
    onPressCard(item);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{item.name}</Text>
      <View style={{flex: 1}}></View>
      <TouchableOpacity onPress={onPressLink}>
        <Text style={styles.link}>View</Text>
      </TouchableOpacity>
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
    marginHorizontal: 5,
    marginVertical: 15,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: buttonBgColor,
    alignItems: 'center',
    borderRadius: 9,
  },
});

export default FormPicker;
