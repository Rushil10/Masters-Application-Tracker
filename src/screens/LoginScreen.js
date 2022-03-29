import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {SafeAreaView, Text, View} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '662446869004-80bj7sf3uopv11dol0g32g9rnua64ajr.apps.googleusercontent.com',
});

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
    <SafeAreaView>
      <View>
        <GoogleSigninButton
          style={{width: 255, height: 75}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signin}
        />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
