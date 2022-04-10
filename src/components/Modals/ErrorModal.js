import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {buttonBgColor} from '../../styles/ThemeStyles';

const {height, width} = Dimensions.get('window');

function ErrorModal({errorText, closeModal, isVisible, opacity}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={opacity ? opacity : 0.75}
      onBackButtonPress={closeModal}>
      <View style={styles.container}>
        <View style={styles.box(width)}>
          <Text style={styles.error}>{errorText}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  box: width => ({
    width: width * 0.85,
    borderWidth: 1,
    borderColor: buttonBgColor,
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'black',
    alignItems: 'center',
  }),
  error: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
  },
});

export default ErrorModal;
