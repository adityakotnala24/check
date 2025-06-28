import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, View } from 'react-native';

import { GlobalStyle } from '@/components/styles';
import { CustomInputField } from '../reportSource';
import { ActivityIndicator, Button } from 'react-native-paper';
import { hanldeDepartmentLogin, LoginResponse } from './departmentFormUtils';
import { SignIn, useSession } from '@/providers/auth/SessionProvider';

interface FormData {
  mobileNumber: string;
  password: string;
}

const createFormData = (): FormData => ({
  mobileNumber: '',
  password: '',
});

const DepartmentLoginForm = () => {
  const router = useRouter();
  const { signIn } = useSession();
  const [formData, setFormData] = useState<FormData>(createFormData());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isValidForm = () => {
    const isFormValid = formData.mobileNumber && formData.password;
    const isMobileNumberValid = formData.mobileNumber.length === 10;

    return isFormValid && isMobileNumberValid;
  };

  const handleSignIn = (loginResponse: LoginResponse) => {
    const signInInfo: SignIn = {
      token: loginResponse.data?.token || "",
      userName: loginResponse.data?.user.userName || "",
      mobileNumber: loginResponse.data?.user.mobileNumber || "",
      department: loginResponse.data?.user.department || "",
      departmentName: loginResponse.data?.user.departmentName || "",
      district: loginResponse.data?.user.district || "",
    };

    signIn(signInInfo);
    router.push('/department/dashboard');
  };

  const handleSubmit = async () => {
    if (!isValidForm()) {
      alert('Please fill all the fields correctly');
      return;
    }

    setIsSubmitting(true);
    const loginResponse = await hanldeDepartmentLogin(formData.mobileNumber, formData.password);
    setIsSubmitting(false);

    if (loginResponse.status === 'error') {
      Alert.alert('Oops!', loginResponse.message);
      return;
    }

    handleSignIn(loginResponse);
  };

  return (
    <View style={GlobalStyle.formContainer}>
      <CustomInputField
        isNumeric
        formData={formData}
        setFormData={setFormData}
        keyName="mobileNumber"
        labelText="Mobile number / अपना मोबाइल नंबर लिखें "
      />

      <CustomInputField
        isSecureTextEntry={true}
        formData={formData}
        setFormData={setFormData}
        keyName="password"
        labelText="Password / अपना पासवर्ड नंबर लिखें "
      />

      <View>
        {isSubmitting ?
          <ActivityIndicator />
          :
          <Button mode="contained" onPress={handleSubmit}>
            Login / लॉगिन करें 
          </Button>
        }
      </View>

      <View>
        <Button mode="contained" onPress={() => router.push('/department/signup')}>
          Signup / विभागीय रजिस्ट्रेशन करें
        </Button>
      </View>
    </View>
  );
};

export default DepartmentLoginForm;