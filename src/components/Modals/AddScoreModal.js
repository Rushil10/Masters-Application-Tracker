import React, {useState, useEffect} from 'react';
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
import {useSelector} from 'react-redux';
import {getObject} from '../../Constants/scoreFunctions';
import {addMyScore} from '../../redux/actions/studentActions';
import studentReducer from '../../redux/reducers/studentReducer';
import store from '../../redux/store';
import {buttonBgColor} from '../../styles/ThemeStyles';

const {height, width} = Dimensions.get('window');

function AddScoreModal({exam, isVisible, closeModal}) {
  const [score, setScore] = useState('');
  var student = useSelector(state => state.student);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setScore('');
    setError('');
  }, [exam.name]);

  useEffect(() => {
    setLoading(student.scoreLoading);
    if (!student.scoreLoading && student.scoreError.length > 0) {
      setError(student.scoreError);
    }
  }, [student.scoreLoading]);

  const addScore = async () => {
    if (loading) {
      return;
    }
    if (score.length <= 0) {
      setError('Enter a Valid Score');
      return;
    }
    var sc = parseFloat(score);
    if (sc > exam.max_score) {
      setError('Enter a Valid Score');
      return;
    }
    setError('');
    var obj = getObject(exam.name, sc);
    await store.dispatch(addMyScore(exam.name, sc, obj));
    closeModal();
  };

  const goBack = () => {
    if (loading) {
      return;
    } else {
      closeModal();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={goBack}
      backdropOpacity={0.75}
      onBackButtonPress={goBack}>
      <View style={styles.container}>
        <View style={styles.box(width)}>
          <Text style={styles.addButton}>
            {exam.name} {exam.parameter}
          </Text>
          <TextInput
            onChangeText={val => setScore(val)}
            onSubmitEditing={addScore}
            autoFocus
            style={styles.score}
            keyboardType="numeric"
            value={score}
          />
          {error.length > 0 && <Text style={styles.error}>{error}</Text>}
          {!loading ? (
            <TouchableOpacity onPress={addScore} style={styles.buttonStyle}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <ActivityIndicator size={30} />
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
  error: {
    marginVertical: 5,
    fontSize: 16,
    fontFamily: 'OpenSans-Light',
    color: '#dc0000',
  },
  buttonStyle: {
    alignItems: 'center',
  },
  addButton: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
  },
  add: {
    fontSize: 21,
    color: buttonBgColor,
    fontFamily: 'OpenSans-Regular',
  },
  score: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
  },
  box: width => ({
    width: width * 0.85,
    borderWidth: 1,
    borderColor: buttonBgColor,
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'black',
  }),
});

export default AddScoreModal;
