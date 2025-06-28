import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { horizontalScale, verticalScale } from '@/utils';
import StreamShedSourceForm from '@/components/ui/public/department/dashboard/streamshed/StreamShedSourceForm';

const streamShed = () => {
  return (
    <KeyboardAwareScrollView style={styles.scrollViewContainer}>
      <StreamShedSourceForm />
    </KeyboardAwareScrollView>
  );
};

export default streamShed;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10)
  }
});