import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {buttonBgColor} from '../styles/ThemeStyles';

function AddApplicationButton() {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.push('Login')}
        style={styles.button}>
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
