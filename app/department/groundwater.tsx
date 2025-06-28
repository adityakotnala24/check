import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { horizontalScale, verticalScale } from '@/utils';
import GroundWaterSourceForm from '@/components/ui/public/department/dashboard/groundwater/GroundWaterSourceForm';

const groundWater = () => {
  return (
    <KeyboardAwareScrollView style={styles.scrollViewContainer}>
      <GroundWaterSourceForm />
    </KeyboardAwareScrollView>
  );
};

export default groundWater;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10)
  }
});