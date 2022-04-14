import React from 'react';
import {useColorScheme} from 'react-native';
import {Text, View, StyleSheet} from 'react-native';
import {blackText, whiteText} from '../styles/ThemeStyles';

function Header({title}) {
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text
        style={[styles.textStyle, theme === 'dark' ? whiteText : blackText]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  textStyle: {
    fontSize: 21,
    fontFamily: 'OpenSans-Bold',
  },
});

export default Header;
