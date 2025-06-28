import { moderateScale } from '@/utils';
import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface CustomInputProps {
  formData: any,
  setFormData: Dispatch<SetStateAction<any>>;
  keyName: string;
  labelText: string;
  isNumeric?: boolean;
  isSecureTextEntry?: boolean;
}

const CustomInput = ({
  isNumeric, formData,
  setFormData, keyName,
  labelText, isSecureTextEntry = false
}: CustomInputProps) => {
  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      keyboardType={isNumeric ? 'numeric' : 'default'}
      style={styles.input}
      label={labelText}
      value={formData[keyName] && formData[keyName]}
      onChangeText={text => setFormData({ ...formData, [keyName]: text })}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    fontSize: moderateScale(14)
  }
});