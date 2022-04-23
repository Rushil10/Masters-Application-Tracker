import React, {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {Alert} from 'react-native';
import {View, Text, Button} from 'react-native';

function DummyScreen() {
  const [count, setCount] = useState(0);
  const arr = [5, 14];

  const onIncrease = async () => {
    setCount(count + 1);
    await AsyncStorage.setItem('count', count.toString());
  };
  const onDecrease = async () => {
    setCount(count - 1);
    await AsyncStorage.setItem('count', count.toString());
  };

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    var c = await AsyncStorage.getItem('count');
    setCount(Number(c));
  };

  useEffect(() => {
    if (count == 5) {
      Alert.alert('Alert Title', 'Count Reached 5', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }, [count]);
  return (
    <View>
      <Text>{count}</Text>
      <Button title="Increase" onPress={onIncrease} />
      <Button title="Decrease" onPress={onDecrease} />
    </View>
  );
}

export default DummyScreen;
