import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { moderateScale, verticalScale } from '@/utils';

const HeaderImage = () => {
  return (
    <View style={styles.headerImageContainer}>
      <Image style={styles.image}
        source={require('../../../../assets/images/pakke-tiger-reserve1.jpg')}
      />
    </View>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  headerImageContainer: {
    width: '100%',
    overflow: 'hidden',
    height: verticalScale(200),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(50)
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: moderateScale(10)
  }
});