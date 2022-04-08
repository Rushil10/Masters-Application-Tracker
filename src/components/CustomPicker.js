import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {buttonBgColor} from '../styles/ThemeStyles';

function CustomPicker({
  selectedValue,
  onValueChange,
  height,
  width,
  options,
  prompt,
}) {
  const color = useColorScheme();
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        prompt={prompt}
        mode="dropdown"
        dropdownIconColor={buttonBgColor}
        dropdownIconRippleColor={buttonBgColor}
        style={styles.pickerStyle(width, color)}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}>
        {options.map((item, index) => {
          return (
            <Picker.Item
              style={styles.labelStyle}
              label={item}
              value={item}
              key={index}
            />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: buttonBgColor,
    borderWidth: 1,
  },
  labelStyle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
  },
  pickerStyle: (width, mode) => ({
    width: width,
    color: mode === 'dark' ? 'white' : 'black',
  }),
});

export default CustomPicker;
