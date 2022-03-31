import React from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import ExamScore from '../components/ExamScore';
import exams from '../Constants/exams';

function MyScores({navigation}) {
  return (
    <SafeAreaView>
      <FlatList
        data={exams}
        renderItem={({item, index}) => <ExamScore exam={item} />}
      />
    </SafeAreaView>
  );
}

export default MyScores;
