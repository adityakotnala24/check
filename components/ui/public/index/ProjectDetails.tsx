import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { horizontalScale, moderateScale, verticalScale } from '@/utils';

const ProjectDetails = () => {
  return (
    <View style={styles.detailsContainer}>
      <ThemedText style={styles.screenLabelText} type='subtitle'>
        - Nyime Aid -
      </ThemedText>
      <ThemedText style={styles.screenLabelText} type='title'>
      Loye pilo ikia pima
      </ThemedText>
      
    </View>
  );
};

export default ProjectDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: horizontalScale(0),
  },
  screenLabelText: {
    textAlign: 'center',
    // color: '#006d77',
    color: '#000000',
    fontSize: moderateScale(22),
  },
  subLabelText: {
    textAlign: 'center',
    color: '#0c569e',
  }
});