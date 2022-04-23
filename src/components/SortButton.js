import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {buttonBgColor} from '../styles/ThemeStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function SortButton({onPress}) {
  const navigation = useNavigation();

  const student = useSelector(state => state.student);

  const onPressButton = () => {
    if (student.signedIn) {
      if (onPress) {
        onPress();
      }
    } else {
      navigation.push('Login');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onPressButton}>
        <MaterialIcons name="sort" size={37} style={styles.buttonFontSize} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: buttonBgColor,
  },
  buttonFontSize: {
    backgroundColor: buttonBgColor,
    height: 56,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 56,
    borderRadius: 28,
  },
});

export default SortButton;
