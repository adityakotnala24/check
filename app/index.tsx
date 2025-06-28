import React from 'react';
import { ImageBackground, View, StyleSheet, Image, ScrollView } from 'react-native';

import { moderateScale, verticalScale } from '@/utils';
import { ThemedText } from '@/components/ThemedText';
import { HeaderImage, ImagesContainer, ProjectDetails, Footer } from '@/components/ui/public/index';

const index = () => {
  return (
    <ScrollView>
    <View style={styles.container}>

      <ImageBackground
        source={require('../assets/images/Background.jpg')}
        resizeMode="cover">

        <View>
          <ThemedText style={styles.screenLabelText} type='subtitle'>
            स्प्रिंग एण्ड रिवर रेज्युविनेशन प्राधिकरण (SARRA)
          </ThemedText>
          <Image style={styles.image}
            source={require('../assets/images/splash-icon.png')}
          />
          <HeaderImage />
          <ProjectDetails />
          <ImagesContainer />
        </View>
        <Footer />
      </ImageBackground>

    </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: verticalScale(0),
  },
  screenLabelText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: moderateScale(22),
  },
  image: {
    width: '96%',
    height: 60,
    objectFit: 'contain',
    borderRadius: moderateScale(10)
  }
});