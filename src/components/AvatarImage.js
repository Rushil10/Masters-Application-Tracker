import React from 'react';
import {Image} from 'react-native';

function AvatarImage({width, url}) {
  return (
    <Image
      source={{uri: url}}
      style={{height: width, width: width, borderRadius: width / 2}}
    />
  );
}

export default AvatarImage;
