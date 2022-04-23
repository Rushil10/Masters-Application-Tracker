import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ApplicationCard from '../../components/ApplicationCard';
import LoadingComponent from '../../components/LoadingComponent';
import SortButton from '../../components/SortButton';

function Applied({navigation}) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  var studentApplications = useSelector(state => state.application);

  const getApplications = () => {
    //console.log('Updating Applied Applications');
    setLoading(true);
    var application = studentApplications.applications.filter(application => {
      return application.status === 'Applied';
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
        <LoadingComponent displayText={'Loading Applied Applications'} />
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
              <Text style={styles.textStyle}>No Pending Applications</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButtonStyle: {
    position: 'absolute',
    bottom: 15,
    right: 18,
  },
  textStyle: {
    fontSize: 25,
    fontFamily: 'OpenSans-Regular',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default Applied;
