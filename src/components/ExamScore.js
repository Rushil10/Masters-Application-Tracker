import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {buttonBgColor, dodgerblue, dodgetblue} from '../styles/ThemeStyles';
import AddScoreModal from './Modals/AddScoreModal';

function ExamScore({exam}) {
  var student = useSelector(state => state.student);
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <AddScoreModal isVisible={visible} exam={exam} closeModal={closeModal} />
      <View style={styles.rowFlex}>
        <Text style={styles.textStyle}>{exam.name}</Text>
        <View style={styles.flex1}></View>
        {student.data[`${exam.field}`] > 0 ? (
          <TouchableOpacity onPress={openModal}>
            <Text style={styles.score}>{student.data[`${exam.field}`]}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openModal}>
            <Text style={styles.addButton}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
  },
  addButton: {
    color: buttonBgColor,
    fontSize: 18,
    fontFamily: 'OpenSans-Light',
  },
  score: {
    color: dodgerblue,
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  flex1: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
  },
});

export default ExamScore;
