import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { horizontalScale, verticalScale } from '@/utils';
import { SpringWaterSourceForm } from '@/components/ui/public/department/dashboard/springs';

const springs = () => {
  return (
    <KeyboardAwareScrollView style={styles.scrollViewContainer}>
      <SpringWaterSourceForm />
    </KeyboardAwareScrollView>
  );
};

export default springs;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10)
  }
});