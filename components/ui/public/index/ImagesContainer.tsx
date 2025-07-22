import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { horizontalScale, moderateScale } from '@/utils';

const ImagesContainer = () => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image}
        source={require('../../../../assets/images/waterfall.jpg')} />
      {/* <Image style={styles.image}
        source={require('../../../../assets/images/satpal.jpeg')} /> */}
    </View>
  );
};

export default ImagesContainer;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 180,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: horizontalScale(15)
  },
  image: {
    flexBasis: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 5,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 10,
    // elevation: 5
  }
});