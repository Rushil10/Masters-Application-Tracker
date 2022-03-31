import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {buttonBgColor, coolButtonBgColor} from '../styles/ThemeStyles';

function CoolButton({
  title,
  onPress,
  borderRadius,
  marginHorizontal,
  marginVertical,
  fontSize,
  opacity = 1,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container(borderRadius, marginHorizontal, marginVertical,opacity)}>
      <Text style={styles.textStyle(fontSize)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (borderRadius, marginHorizontal, marginVertical,opacity,bgColor=buttonBgColor) => ({
    borderRadius: borderRadius,
    marginHorizontal,
    marginVertical,
    paddingHorizontal: 15,
    paddingVertical: 11,
    justifyContent: 'center',
    //borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: coolButtonBgColor(opacity),
    borderWidth: 1,
  }),
  textStyle: fontSize => ({
    fontSize,
    fontFamily: 'OpenSans-SemiBold',
  }),
});

export default CoolButton;
