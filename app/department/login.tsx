import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { GlobalStyle } from '@/components/styles';
import { DepartmentLoginForm } from '@/components/ui/public/department';

const DepartmentLogin = () => {
  return (
    <KeyboardAwareScrollView style={GlobalStyle.scrollViewContainer}>
      <DepartmentLoginForm />
    </KeyboardAwareScrollView>
  );
};

export default DepartmentLogin;