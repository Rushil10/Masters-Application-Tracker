import React, {useState, useEffect} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import AvatarImage from '../components/AvatarImage';
import CoolButton from '../components/CoolButton';

const {height, width} = Dimensions.get('window');

function Profile({navigation}) {
  var student = useSelector(state => state.student);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (student.signedIn) {
      setSignedIn(true);
    }
  }, [student.signedIn]);

  return (
    <SafeAreaView style={styles.flex1}>
      {signedIn ? (
        <View style={[styles.flex1, styles.container]}>
          <View style={styles.alignCenter}>
            <AvatarImage url={student.data.image} width={width * 0.27} />
            <Text style={[styles.name, styles.mediumMarginTop]}>
              {student.data.name}
            </Text>
            <Text style={[styles.email]}>{student.data.email}</Text>
          </View>
          <View style={[styles.largeMarginTop]}>
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="My Scores"
              opacity={0.8}
              onPress={() => console.log('Pressed')}
            />
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="My Resume"
              opacity={0.8}
              onPress={() => console.log('Pressed')}
            />
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="Personal Documents"
              opacity={0.8}
              onPress={() => console.log('Pressed')}
            />
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="LOR"
              opacity={0.8}
              onPress={() => console.log('Pressed')}
            />
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="Letter Of Intent"
              opacity={0.8}
              onPress={() => console.log('Pressed')}
            />
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="ExtraCurricular Certificates"
              opacity={0.8}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </View>
      ) : (
        <View style={[styles.flex1, styles.container2]}>
          <Text style={styles.loginText}>
            Easily Manage your applications, resume, exam scores and other docs
            in one app{' '}
          </Text>
          <CoolButton
            marginHorizontal={15}
            marginVertical={18}
            fontSize={18}
            borderRadius={11}
            title="LOGIN"
            opacity={0.8}
            onPress={() => navigation.push('Login')}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 19,
    fontFamily: 'OpenSans-Light',
  },
  container: {
    //alignItems: 'center',
    paddingTop: 35,
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  mediumMarginTop: {
    marginTop: 11,
  },
  largeMarginTop: {
    marginTop: 17,
  },
  name: {
    fontSize: 25,
    fontFamily: 'OpenSans-Medium',
  },
  email: {
    fontSize: 16,
    fontFamily: 'OpenSans-Light',
  },
});

export default Profile;
