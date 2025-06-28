import React from 'react';
import { CustomPicker } from '@/components/global/forms';

const CustomSelectPicker = ({
  formData,
  setFormData,
  keyName,
  label,
  options
}: {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  keyName: string,
  label: string,
  options: { label: string, value: string; }[];
}) => (
  <CustomPicker
    formData={formData}
    setFormData={setFormData}
    keyName={keyName}
    label={label}
    options={options}
  />
);

export default CustomSelectPicker;
