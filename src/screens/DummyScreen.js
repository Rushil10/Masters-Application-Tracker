import React, {useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';

function DummyScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [thisMonth, setThisMonth] = useState('');

  const flatListRef = useRef();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getData = () => {
    setLoading(true);
    const d = new Date();
    var arr = [];
    for (var i = 0; i < 12; i++) {
      var td = new Date();
      var item = {
        date: td.setMonth(d.getMonth() + i),
      };
      arr.push(item);
    }
    setData(arr);
    var monthName = monthNames[d.getMonth()];
    var year = d.getFullYear();
    setThisMonth(monthName + ' ' + year);
    setLoading(false);
  };

  const onEndReached = di => {
    //console.log(di, 'End ');
    var lastDate = new Date(data[data.length - 1].date);
    var arr = [];
    for (var i = 1; i <= 12; i++) {
      var td = new Date(lastDate);
      var item = {
        date: td.setMonth(lastDate.getMonth() + i),
      };
      arr.push(item);
    }
    setData([...data, ...arr]);
  };

  const handleScroll = event => {
    //console.log(event);
    var scrolled = event.nativeEvent.contentOffset.y;
    var index = parseInt(scrolled / 95);
    var d = new Date(data[index].date);
    var monthName = monthNames[d.getMonth()];
    var year = d.getFullYear();
    setThisMonth(monthName + ' ' + year);
    //console.log(scrolled, 'Index', index);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      {!loading && (
        <View style={{flex: 1}}>
          <View
            style={{
              height: 55,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              paddingLeft: 30,
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 19}}>{thisMonth}</Text>
          </View>
          <FlatList
            style={{flex: 1}}
            onScroll={handleScroll}
            ref={flatListRef}
            data={data}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.75}
            renderItem={({item, index}) => (
              <View
                style={{
                  height: 95,
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  marginHorizontal: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}>
                <Text style={{fontSize: 19}}>
                  {monthNames[new Date(item.date).getMonth()]}{' '}
                  {new Date(item.date).getFullYear()}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default DummyScreen;
