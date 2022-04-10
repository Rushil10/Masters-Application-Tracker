import React, {useState} from 'react';
import {
  AsyncStorage,
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Sae, Kohana, Hoshi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CoolButton from '../components/CoolButton';
import CustomPicker from '../components/CustomPicker';
import LoiPickerModal from '../components/Modals/LoiPickerModal';
import ResumePickerModal from '../components/Modals/ResumePickerModal';
import {buttonBgColor, dodgerblue} from '../styles/ThemeStyles';
import ErrorModal from '../components/Modals/ErrorModal';
import axios from 'axios';
import url from '../server/api';
import LoadingComponent from '../components/LoadingComponent';
import {showToast} from '../components/ToastFunctions';

const {height, width} = Dimensions.get('window');

function AddApplication({navigation}) {
  const [universityName, setUniversityName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [degree, setDegree] = useState('MS');
  const [courseFees, setCourseFees] = useState('');
  const [applicationFees, setApplicationFees] = useState('');
  const [status, setStatus] = useState('Applied');
  const [scholarshipPercent, setScholarshipPercent] = useState('0');
  const [tag, setTag] = useState('Safety');
  const [visibility, setVisibility] = useState('Public');
  const [loiModal, setLoiModal] = useState(false);
  const [loi, setLoi] = useState(null);
  const [resumeModal, setResumeModal] = useState(false);
  const [resume, setResume] = useState(null);
  const tags = ['Safety', 'Reach', 'Target'];
  const visibilities = ['Public', 'Private'];
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const addApplication = () => {
    if (universityName.length < 4 || courseName.length < 2) {
      setError('Univeristy Name and Course Name must be valid !');
      setShowError(true);
      return;
    }
    if (Number(scholarshipPercent) > 100) {
      setError('SCholarship cannot be greater than 100 % !');
      setShowError(true);
      return;
    }
    var data = {
      universityName,
      courseName,
      degreeName: degree,
      status,
      tag,
      visibility,
    };
    if (courseFees.length > 0) {
      data.degreeFees = parseInt(courseFees);
    }
    if (applicationFees.length > 0) {
      data.applicationFees = parseInt(applicationFees);
    }
    if (scholarshipPercent.length > 0) {
      data.scholarshipPercentage = parseFloat(scholarshipPercent);
    }
    if (resume) {
      data.resumeLink = resume.link;
    }
    if (loi) {
      data.loiLink = loi.link;
    }
    if (tips.length > 0) {
      data.tips = tips;
    }
    setError('');
    addToDb(data);
  };

  const addToDb = async data => {
    setLoading(true);
    var token = await AsyncStorage.getItem('token');
    var res = await axios.post(`${url}/application/add`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.data) {
      setLoading(false);
      showToast('Application Added', 'success');
      navigation.goBack();
    } else {
      setLoading(false);
      setError('Some Error Occured while adding your application.');
      setShowError(true);
      return;
    }
  };
  const closeErrorModal = () => {
    setShowError(false);
  };
  const onDegreeChange = degree => {
    setDegree(degree);
  };
  const onStatusChange = status => {
    setStatus(status);
  };
  const onTagChange = tag => {
    setTag(tag);
  };

  const openLoiModal = () => {
    setLoiModal(true);
  };

  const closeLoiModal = () => {
    setLoiModal(false);
  };

  const openResumeModal = () => {
    setResumeModal(true);
  };

  const closeResumeModal = () => {
    setResumeModal(false);
  };

  const onVisibilityChange = visibility => {
    setVisibility(visibility);
  };
  const [tips, setTips] = useState('');
  const degrees = ['MS', 'MBA', 'MTech', 'ME'];
  const statuses = ['Applied', 'Rejected', 'Accepted'];

  const pickLoi = loi => {
    setLoi(loi);
    closeLoiModal();
  };

  const pickResume = resume => {
    setResume(resume);
    closeResumeModal();
  };

  var mode = useColorScheme();

  var color = mode === 'dark' ? 'white' : 'black';

  return (
    <SafeAreaView style={styles.flex1}>
      <LoiPickerModal
        isVisible={loiModal}
        closeModal={closeLoiModal}
        onPick={pickLoi}
      />
      <ErrorModal
        isVisible={showError}
        opacity={0.9}
        errorText={error}
        closeModal={closeErrorModal}
      />
      <ResumePickerModal
        isVisible={resumeModal}
        closeModal={closeResumeModal}
        onPick={pickResume}
      />
      {loading ? (
        <LoadingComponent displayText={'Adding Your Application !'} />
      ) : (
        <ScrollView style={styles.container}>
          <Sae
            label={'University Name'}
            iconClass={FontAwesomeIcon}
            onChangeText={val => setUniversityName(val)}
            iconName={'pencil'}
            iconColor={buttonBgColor}
            inputPadding={18}
            labelHeight={25}
            labelStyle={[styles.textColor(color)]}
            inputStyle={styles.textInputStyle}
            borderHeight={1}
            multiline={false}
            autoCapitalize={'words'}
            autoCorrect={false}
          />
          <View style={styles.marginSmall}></View>
          <Sae
            label={'Course Name'}
            iconClass={FontAwesomeIcon}
            onChangeText={val => setCourseName(val)}
            iconName={'university'}
            iconColor={buttonBgColor}
            inputPadding={18}
            labelHeight={25}
            labelStyle={[styles.textColor(color)]}
            inputStyle={styles.textInputStyle2}
            borderHeight={1}
            multiline={false}
            autoCapitalize={'words'}
            autoCorrect={false}
          />
          <View
            style={[
              styles.flexDirectionRow,
              styles.marginBig,
              {marginLeft: -15},
            ]}>
            <Kohana
              style={{backgroundColor: 'transparent', width: width * 0.4}}
              label={'Application Fees'}
              onChangeText={val => setApplicationFees(val)}
              keyboardType="number-pad"
              iconClass={FontAwesomeIcon}
              iconName={'dollar'}
              iconColor={buttonBgColor}
              labelStyle={{color: color, fontFamily: 'OpenSans-Regular'}}
              inputStyle={{
                color: buttonBgColor,
                fontFamily: 'OpenSans-Regular',
              }}
              useNativeDriver
            />
            <Kohana
              style={{backgroundColor: 'transparent', width: width * 0.4}}
              label={'Course Fees'}
              onChangeText={val => setCourseFees(val)}
              iconClass={FontAwesomeIcon}
              keyboardType="number-pad"
              iconName={'dollar'}
              iconColor={buttonBgColor}
              labelStyle={{color: color, fontFamily: 'OpenSans-Regular'}}
              inputStyle={{
                color: buttonBgColor,
                fontFamily: 'OpenSans-Regular',
              }}
              useNativeDriver
            />
          </View>
          <View style={[styles.flexDirectionRow, styles.marginSmall]}>
            <CustomPicker
              options={degrees}
              prompt="Select Degree"
              selectedValue={degree}
              width={width * 0.42}
              onValueChange={onDegreeChange}
            />
            <View style={styles.flex1}></View>
            <CustomPicker
              options={statuses}
              prompt="Status"
              selectedValue={status}
              width={width * 0.42}
              onValueChange={onStatusChange}
            />
          </View>
          {status === 'Accepted' && (
            <View style={styles.marginBig}>
              <Hoshi
                label={'Scholarship Percentage'}
                // this is used as active border color
                borderColor={buttonBgColor}
                value={scholarshipPercent}
                onChangeText={val => setScholarshipPercent(val)}
                labelStyle={{color: color, fontFamily: 'OpenSans-Regular'}}
                inputStyle={{
                  color: buttonBgColor,
                  fontFamily: 'OpenSans-Regular',
                }}
                borderHeight={1}
                inputPadding={15}
                backgroundColor={'transparent'}
              />
            </View>
          )}
          <View style={[styles.flexDirectionRow, styles.marginSmall]}>
            <CustomPicker
              options={tags}
              prompt="Select Tag"
              selectedValue={tag}
              width={width * 0.42}
              onValueChange={onTagChange}
            />
            <View style={styles.flex1}></View>
            <CustomPicker
              options={visibilities}
              prompt="Visibility"
              selectedValue={visibility}
              width={width * 0.42}
              onValueChange={onVisibilityChange}
            />
          </View>
          {visibility === 'Public' && (
            <View style={styles.marginSmall}>
              <TextInput
                style={styles.score}
                value={tips}
                onChangeText={val => setTips(val)}
                placeholder="Any Tips / Advice For Viewers"
                numberOfLines={3}
                multiline
              />
            </View>
          )}
          <View style={styles.marginBig}>
            {loi ? (
              <View>
                <TouchableOpacity
                  style={styles.loiStyle}
                  onPress={openLoiModal}>
                  <Text style={styles.textStyle}>LOI Used : {loi.name}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <CoolButton
                marginHorizontal={15}
                marginVertical={10}
                fontSize={18}
                borderRadius={11}
                title="LOI used for this College"
                opacity={0.8}
                onPress={openLoiModal}
              />
            )}
            {resume ? (
              <View>
                <TouchableOpacity
                  style={styles.loiStyle}
                  onPress={openResumeModal}>
                  <Text style={styles.textStyle}>
                    Resume Used : {resume.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <CoolButton
                marginHorizontal={15}
                marginVertical={10}
                fontSize={18}
                borderRadius={11}
                title="Resume used for this College"
                opacity={0.8}
                onPress={openResumeModal}
              />
            )}
          </View>
          <View style={styles.marginBig}>
            <TouchableOpacity
              onPress={addApplication}
              style={styles.buttonStyle}>
              <Text style={[styles.textInputStyle, styles.textColor(color)]}>
                Add Application
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  buttonStyle: {
    paddingVertical: 9,
    alignItems: 'center',
    backgroundColor: buttonBgColor,
    borderRadius: 15,
  },
  courseNameStyle: {
    backgroundColor: 'blue',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  marginSmall: {
    marginTop: 15,
  },
  loiStyle: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderColor: buttonBgColor,
  },
  score: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
    borderColor: buttonBgColor,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 9,
    paddingVertical: 15,
  },
  marginBig: {
    marginTop: 25,
  },
  textStyle: {
    fontSize: 21,
    fontFamily: 'OpenSans-Regular',
  },
  labelStyle: {
    paddingLeft: 25,
  },
  textColor: color => ({
    color: color,
  }),
  labelStyle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  textInputStyle: {
    //backgroundColor:'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },

  textInputStyle2: {
    //backgroundColor:'white',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  container: {
    marginHorizontal: 15,
    paddingVertical: 15,
  },
});

export default AddApplication;
