import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ApplicationCard from '../../components/ApplicationCard';
import LoadingComponent from '../../components/LoadingComponent';

function Applied({navigation}) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  var studentApplications = useSelector(state => state.application);

  const getApplications = () => {
    console.log('Updating Applied Applications');
    setLoading(true);
    var application = studentApplications.applications.filter(application => {
      return application.status === 'Applied';
    });
    console.log(application);
    setLoading(false);
    setApplications(application);
  };

  useEffect(() => {
    getApplications();
  }, [studentApplications.applications]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <LoadingComponent displayText={'Loading Applied Applications'} />
      ) : (
        <View style={{flex: 1}}>
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
        </View>
      )}
    </SafeAreaView>
  );
}

export default Applied;
