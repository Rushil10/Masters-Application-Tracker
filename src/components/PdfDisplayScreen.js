import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, View, BackHandler} from 'react-native';
import Pdf from 'react-native-pdf';

export default function PDFExample({navigation, route}) {
  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: route.params.link, cache: true}}
        onLoadComplete={(numberOfPages, filePath) => {
          ////console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          ////console.log(`Current page: ${page}`);
        }}
        onError={error => {
          ////console.log(error);
        }}
        onPressLink={uri => {
          ////console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
