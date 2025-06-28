import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { URLs } from '@/utils';
import { GlobalStyle } from '@/components/styles';
import { CustomInputField, CustomSelectPicker } from '../reportSource';
import { createFormData, fetchSelectOptions, signUpDepartmentUser } from './departmentFormUtils';

export interface DeptSingnUpFormType {
  district: string;
  department: string;
  userName: string;
  mobileNumber: string;
  password: string;
}

interface FormInputProps {
  formData: DeptSingnUpFormType;
  setFormData: React.Dispatch<React.SetStateAction<DeptSingnUpFormType>>;
}

const DeptInputsContainer = () => {
  const router = useRouter();
  const [uploding, setUploading] = useState(false);
  const [formData, setFormData] = useState<DeptSingnUpFormType>(createFormData());

  const showErrorAlert = (message: string) => {
    Alert.alert('Error', message);
  };

  const isValidForm = () => {
    const requiredFields = ['district', 'department', 'userName', 'mobileNumber', 'password'];
    const isFormValid = requiredFields.every(field => formData[field as keyof DeptSingnUpFormType]);

    return isFormValid && formData?.mobileNumber?.length === 10;
  };

  const handleSubmit = async () => {
    if (!isValidForm()) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    setUploading(true);
    const signUpResponse = await signUpDepartmentUser({ ...formData });
    console.log('Sign Up Response:', signUpResponse);
    setUploading(false);

    if (signUpResponse.status === "success") {
      router.push('/department/login');
      return;
    }

    showErrorAlert(signUpResponse.message);
  };

  return (
    <View style={GlobalStyle.formContainer}>

      <SelectOptionInputs formData={formData} setFormData={setFormData} />
      <TextInputFields formData={formData} setFormData={setFormData} />

      <View>
        {uploding ?
          <ActivityIndicator />
          :
          <Button mode="contained" onPress={handleSubmit}>
            Register / रजिस्टर करें
          </Button>
        }
      </View>
    </View>
  );
};

const SelectOptionInputs = ({ formData, setFormData }: FormInputProps) => {
  const [deptList, setDeptList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  useEffect(() => {
    fetchSelectOptions(`${URLs.baseUrl}getDept.php`, setDeptList);
    fetchSelectOptions(`${URLs.baseUrl}get-districts.php`, setDistrictList);
  }, []);

  return (
    <>
      <CustomSelectPicker
        formData={formData}
        setFormData={setFormData}
        keyName="department"
        label="विभाग / Department"
        options={deptList}
      />

      <CustomSelectPicker
        formData={formData}
        setFormData={setFormData}
        keyName="district"
        label="जिला / District"
        options={districtList}
      />
    </>
  );
};

const TextInputFields = ({ formData, setFormData }: FormInputProps) => {
  return (
    <>
      <CustomInputField
        formData={formData}
        setFormData={setFormData}
        keyName="userName"
        labelText="Enter your name / अपना नाम लिखें"
      />

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
        labelText="Password / अपना पासवर्ड लिखें "
      />
    </>
  );
};

export default DeptInputsContainer;