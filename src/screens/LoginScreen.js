import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '662446869004-80bj7sf3uopv11dol0g32g9rnua64ajr.apps.googleusercontent.com',
});

const {height, width} = Dimensions.get('window');

function LoginScreen({navigation}) {
  const [userInfo, setUserInfo] = useState({});

  const signin = async () => {
    await GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={[styles.container, styles.flex1]}>
        <Image
          source={require('../images/university.png')}
          style={styles.imgStyle}
        />
        <View style={styles.textView}>
          <Text style={styles.textStyle}>University  Applications  Tracker</Text>
        </View>
        <GoogleSigninButton
          style={styles.siginButtonStyle}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signin}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  siginButtonStyle: {
    height: 65,
    width: width * 0.75,
  },
  imgStyle: {
    height: width * 0.75,
    width: width * 0.75,
  },
  textStyle: {
    fontSize: 27,
    fontFamily: 'OpenSans-BoldItalic',
    textAlign: 'center',
  },
  textView: {
    margin: 15,
  },
});

export default LoginScreen;
