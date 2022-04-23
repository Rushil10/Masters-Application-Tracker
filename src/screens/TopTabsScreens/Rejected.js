import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ApplicationCard from '../../components/ApplicationCard';
import LoadingComponent from '../../components/LoadingComponent';

function Rejected({navigation}) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  var studentApplications = useSelector(state => state.application);

  const getApplications = () => {
    //console.log('Updating Rejected Applications');
    setLoading(true);
    var application = studentApplications.applications.filter(application => {
      return application.status === 'Rejected';
    });
    //console.log(application);
    setLoading(false);
    setApplications(application);
  };

  useEffect(() => {
    getApplications();
  }, [studentApplications.applications]);

  useEffect(() => {
    setLoading(studentApplications.sortLoading);
  }, [studentApplications.sortLoading]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <LoadingComponent displayText={'Loading Rejected Applications'} />
      ) : (
        <View style={{flex: 1}}>
          {applications.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={applications}
              renderItem={({item, index}) => (
                <ApplicationCard
                  showTag={true}
                  showFees={true}
                  application={item}
                />
              )}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.textStyle}>No Rejected Applications</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
    fontFamily: 'OpenSans-Regular',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default Rejected;
