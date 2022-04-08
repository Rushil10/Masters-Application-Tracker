import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Sae, Kohana, Hoshi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CustomPicker from '../components/CustomPicker';
import {buttonBgColor, dodgerblue} from '../styles/ThemeStyles';

const {height, width} = Dimensions.get('window');

function AddApplication({navigation}) {
  const [universityName, setUniversityName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [degree, setDegree] = useState('');
  const [courseFees, setCourseFees] = useState('');
  const [applicationFees, setApplicationFees] = useState('');
  const [status, setStatus] = useState('');
  const [scholarshipPercent, setScholarshipPercent] = useState('0');
  const [tag, setTag] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const tags = ['Safety', 'Reach', 'Target'];
  const visibilities = ['Public', 'Private'];
  const onDegreeChange = degree => {
    setDegree(degree);
  };
  const onStatusChange = status => {
    setStatus(status);
  };
  const onTagChange = tag => {
    setTag(tag);
  };

  const onVisibilityChange = visibility => {
    setVisibility(visibility);
  };
  const [tips, setTips] = useState('');
  const degrees = ['MS', 'MBA', 'MTech', 'ME'];
  const statuses = ['Applied', 'Rejected', 'Accepted'];

  var mode = useColorScheme();

  var color = mode === 'dark' ? 'white' : 'black';

  return (
    <SafeAreaView>
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
            inputStyle={{color: buttonBgColor, fontFamily: 'OpenSans-Regular'}}
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
            inputStyle={{color: buttonBgColor, fontFamily: 'OpenSans-Regular'}}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
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
