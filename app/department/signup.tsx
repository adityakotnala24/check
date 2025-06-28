import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { GlobalStyle } from '@/components/styles';
import { DeptInputsContainer } from '@/components/ui/public/department';

const departmentSignup = () => {
  return (
    <KeyboardAwareScrollView style={GlobalStyle.scrollViewContainer}>
      <DeptInputsContainer />
    </KeyboardAwareScrollView>
  );
};

export default departmentSignup;