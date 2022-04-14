import React from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import ExamScore from '../components/ExamScore';
import Header from '../components/Header';
import exams from '../Constants/exams';

function MyScores({navigation}) {
  return (
    <SafeAreaView style={{flex:1}}>
      <Header title="My Scores" />
      <FlatList
        data={exams}
        renderItem={({item, index}) => <ExamScore exam={item} />}
      />
    </SafeAreaView>
  );
}

export default MyScores;
