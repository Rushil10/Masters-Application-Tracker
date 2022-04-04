import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {buttonBgColor} from '../styles/ThemeStyles';

function AddApplicationButton({onPress}) {
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
      <TouchableOpacity onPress={onPressButton} style={styles.button}>
        <Text style={styles.buttonFontSize}>+</Text>
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
    backgroundColor: buttonBgColor,
  },
  buttonFontSize: {
    fontSize: 37,
    fontWeight: '400',
  },
});

export default AddApplicationButton;
