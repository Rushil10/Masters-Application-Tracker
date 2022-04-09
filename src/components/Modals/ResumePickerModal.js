import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
  FlatList,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {getLoiOfUser} from '../../redux/actions/loiActions';
import { getResumeOfUser } from '../../redux/actions/resumeActions';
import store from '../../redux/store';
import {buttonBgColor} from '../../styles/ThemeStyles';
import AddApplicationButton from '../AddApplicationButton';
import FormPicker from '../FormPicker';
import LoadingComponent from '../LoadingComponent';
import NoData from '../NoData';

const {height, width} = Dimensions.get('window');

function ResumePickerModal({closeModal, isVisible, onPick}) {
  const navigation = useNavigation();
  var studentResumes = useSelector(state => state.resume);
  const [resumes, setResumes] = useState(studentResumes.resumes);
  const [loading, setLoading] = useState(false);

  const onPressAdd = () => {
    navigation.push('AddResume');
  };

  useEffect(() => {
    if (!studentResumes.loaded) {
      store.dispatch(getResumeOfUser());
    }
  }, [isVisible]);

  useEffect(() => {
    setResumes(studentResumes.resumes);
  }, [studentResumes.resumes]);

  useEffect(() => {
    setLoading(studentResumes.loading);
  }, [studentResumes.loading]);
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={0.75}
      onBackButtonPress={closeModal}>
      <View style={styles.container}>
        <View style={styles.box(width, height)}>
          {loading ? (
            <LoadingComponent displayText={'Loading Resumes'} />
          ) : resumes.length == 0 ? (
            <View style={styles.flex1}>
              <NoData displayText="Add your resume which will get used for application to different universities" />
              <View style={styles.addButtonStyle}>
                <AddApplicationButton onPress={onPressAdd} />
              </View>
            </View>
          ) : (
            <View style={styles.flex1}>
              <FlatList
                data={resumes}
                renderItem={({item, index}) => (
                  <FormPicker onPressCard={onPick} item={item} />
                )}
              />
              <View style={styles.addButtonStyle}>
                <AddApplicationButton onPress={onPressAdd} />
              </View>
            </View>
          )}
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
  box: (width, height) => ({
    width: width * 0.85,
    borderWidth: 1,
    borderColor: buttonBgColor,
    borderRadius: 9,
    height: height / 2,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'black',
  }),
  error: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
  },
  addButtonStyle: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  flex1: {
    flex: 1,
  },
});

export default ResumePickerModal;
