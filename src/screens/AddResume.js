import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import CoolButton from '../components/CoolButton';
import {buttonBgColor, dodgerblue} from '../styles/ThemeStyles';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import url from '../server/api';
import storage from '@react-native-firebase/storage';
import getPath from '@flyerhq/react-native-android-uri-path';
import {useSelector} from 'react-redux';

function AddResume({navigation}) {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storeingFile, setStoringFile] = useState(false);
  const [storingInDb, setStoringInDb] = useState(false);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const makeid = length => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + '_resume';
  };

  const pickResume = async () => {
    var res = await DocumentPicker.pickSingle({type: 'application/pdf'});
    console.log(res.size / 1000000);
    if (res.size / 1000000 > 2) {
      return;
    }
    console.log(res.size / 1000000);
    setFileData(res);
    console.log(res);
  };

  const addToMongoDb = async (name, link) => {
    console.log(name, link);
    setStoringInDb(true);
    var token = await AsyncStorage.getItem('token');
    var body = {
      name: name,
      link: link,
    };
    console.log(body);
    var res = await axios.post(`${url}/resume/add`, body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    setStoringInDb(false);
  };

  const uploadToFireBase = async () => {
    if (!fileData) {
      return;
    }
    if (name.length <= 4 || name.length >= 15) {
      return;
    }
    setStoringFile(true);
    var id = makeid(5);
    const reference = await storage().ref(id);
    const path = getPath(fileData.uri);
    const task = await reference.putFile(path);
    console.log(path);
    const url = await storage().ref(id).getDownloadURL();
    console.log(url);
    setStoringFile(false);
    return url;
  };

  const saveResume = async () => {
    var url = await uploadToFireBase();
    await addToMongoDb(name, url);
  };

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={styles.container}>
        <TextInput
          value={name}
          onChangeText={val => setName(val)}
          style={styles.score}
          placeholder="Resume Nickname"
        />
        <CoolButton
          marginVertical={10}
          fontSize={19}
          borderRadius={11}
          title="Pick Resume"
          opacity={0.8}
          onPress={pickResume}
        />
        <View style={styles.flex1}></View>
        {!storingInDb && !storeingFile && fileData && (
          <CoolButton
            marginVertical={10}
            fontSize={19}
            borderRadius={11}
            title="Save Resume"
            opacity={0.8}
            onPress={saveResume}
          />
        )}
        {storingInDb && (
          <View>
            <ActivityIndicator size={30} />
            <Text style={styles.helpText}>Storing In Database</Text>
          </View>
        )}
        {storeingFile && (
          <View>
            <ActivityIndicator size={30} />
            <Text style={styles.helpText}>Uploading File</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  score: {
    fontSize: 19,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
    borderColor: dodgerblue,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 9,
    paddingVertical: 15,
  },
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  helpText: {
    textAlign: 'center',
    fontFamily: 'OpneSans-Light',
    fontSize: 20,
  },
});

export default AddResume;
