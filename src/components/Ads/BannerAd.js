import React, {useRef} from 'react';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-admob/admob';
import {View} from 'react-native';

export default function BannerAdd() {
  const bannerRef = useRef(null);
  return (
    <View>
      <BannerAd
        onAdFailedToLoad={error => console.error(error)}
        size={BannerAdSize.BANNER}
        unitId={'ca-app-pub-7992896789862342/8751726987'}
      />
    </View>
  );
}
