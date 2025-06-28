import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ImageCapture } from '@/components/global/forms';

const ImageUploadSection = ({
  formData,
  setFormData,
  keyName,
  text
}: {
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  keyName: string,
  text: string;
}) => (
  <View>
    <ThemedText>{text}</ThemedText>
    <ImageCapture
      formData={formData}
      setFormData={setFormData}
      keyName={keyName}
    />
  </View>
);

export default ImageUploadSection;
