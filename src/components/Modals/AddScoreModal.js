import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {addMyScore} from '../../redux/actions/studentActions';
import studentReducer from '../../redux/reducers/studentReducer';
import store from '../../redux/store';
import {buttonBgColor} from '../../styles/ThemeStyles';

const {height, width} = Dimensions.get('window');

function AddScoreModal({exam, isVisible, closeModal}) {
  const [score, setScore] = useState('');
  var student = useSelector(state => state.student);
  const [error, setError] = useState('');

  useEffect(() => {
    setScore('');
    setError('');
  }, [exam.name]);

  const addScore = () => {
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
    store.dispatch(addMyScore(exam.name, sc));
    closeModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={0.75}
      onBackButtonPress={closeModal}>
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
          <TouchableOpacity onPress={addScore} style={styles.buttonStyle}>
            <Text style={styles.add}>Add</Text>
          </TouchableOpacity>
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
