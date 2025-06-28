import React from 'react';
import { CustomInput } from '@/components/global/forms';

const CustomInputField = ({
  formData,
  setFormData,
  keyName,
  labelText,
  isNumeric = false,
  isSecureTextEntry = false,
}: {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  keyName: string,
  labelText: string,
  isNumeric?: boolean,
  isSecureTextEntry?: boolean;
}) => (
  <CustomInput
    isSecureTextEntry={isSecureTextEntry}
    isNumeric={isNumeric}
    formData={formData}
    setFormData={setFormData}
    keyName={keyName}
    labelText={labelText}
  />
);

export default CustomInputField;
