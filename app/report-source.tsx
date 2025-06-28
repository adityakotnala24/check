import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { horizontalScale, verticalScale } from '@/utils';
import { InputsContainer } from '@/components/ui/public/reportSource';

const reportSource = () => {
  return (
    <KeyboardAwareScrollView style={styles.scrollViewContainer}>
      <InputsContainer />
    </KeyboardAwareScrollView>
  );
};

export default reportSource;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10)
  }
});