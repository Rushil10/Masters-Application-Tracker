import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AvatarImage from '../components/AvatarImage';
import CoolButton from '../components/CoolButton';
import {applicationLogout} from '../redux/actions/applicationsActions';
import {loiLogout} from '../redux/actions/loiActions';
import {lorLogout} from '../redux/actions/lorActions';
import {resumeLogout} from '../redux/actions/resumeActions';
import {studentLogout} from '../redux/actions/studentActions';
import store from '../redux/store';
import {buttonBgColor} from '../styles/ThemeStyles';

const {height, width} = Dimensions.get('window');

function Profile({navigation}) {
  var student = useSelector(state => state.student);
  var studentApplications = useSelector(state => state.application);
  const [signedIn, setSignedIn] = useState(false);

  const formatToCurrency = amount => {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  useEffect(() => {
    setSignedIn(student.signedIn);
  }, [student.signedIn]);

  const [totalApplications, setTotalApplications] = useState(0);
  const [applicationSpent, setTotalSpent] = useState(0);

  const getData = () => {
    var spent = 0;
    setTotalApplications(studentApplications.applications.length);
    studentApplications.applications.map(application => {
      spent = spent + application.applicationFees;
    });
    setTotalSpent(spent);
  };

  useEffect(() => {
    getData();
  }, [studentApplications.applications]);

  const onLogout = async () => {
    await AsyncStorage.removeItem('token');
    store.dispatch(studentLogout());
    store.dispatch(applicationLogout());
    store.dispatch(resumeLogout());
    store.dispatch(loiLogout());
    store.dispatch(lorLogout());
  };

  return (
    <SafeAreaView style={styles.flex1}>
      {signedIn ? (
        <ScrollView>
          <View style={styles.alignCenter}>
            <View style={{height: 25}}></View>
            <AvatarImage url={student.data.image} width={width * 0.27} />
            <Text style={[styles.name, styles.mediumMarginTop]}>
              {student.data.name}
            </Text>
            <Text style={[styles.email]}>{student.data.email}</Text>
          </View>
          <View style={{marginHorizontal: 20, marginTop: 15}}>
            <Text style={styles.textStyle}>
              Total Applications :{' '}
              <Text style={{color: buttonBgColor}}>{totalApplications}</Text>
            </Text>
            <Text style={styles.textStyle}>
              Total Application Spend :{' '}
              <Text style={{color: buttonBgColor}}>
                {formatToCurrency(applicationSpent)}
              </Text>
            </Text>
          </View>
          <View style={[styles.largeMarginTop]}>
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="My Scores"
              opacity={0.8}
              onPress={() => navigation.push('MyScores')}
            />
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="My Resume"
              opacity={0.8}
              onPress={() => navigation.push('Resumes')}
            />
            {/* <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="Personal Documents"
              opacity={0.8}
              onPress={() => //console.log('Pressed')}
            /> */}
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="LOR"
              opacity={0.8}
              onPress={() => navigation.push('Lors')}
            />
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="Letter Of Intent"
              opacity={0.8}
              onPress={() => navigation.push('Lois')}
            />
            {/* <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="ExtraCurricular Certificates"
              opacity={0.8}
              onPress={() => //console.log('Pressed')}
            /> */}
            <CoolButton
              marginHorizontal={15}
              marginVertical={10}
              fontSize={18}
              borderRadius={11}
              title="LOGOUT"
              opacity={0.8}
              onPress={onLogout}
            />
          </View>
        </ScrollView>
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
  greenColor: {
    color: '#118c4f',
  },
  container2: {
    marginHorizontal: 15,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'OpenSans-Medium',
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
