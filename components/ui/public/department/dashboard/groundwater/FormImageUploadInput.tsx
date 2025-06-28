import { FormInputHolderProps } from './FormSelectOptions';
import ImageUploadSection from '../../../reportSource/ImageUploadSection';
import React from 'react';

const FormImageUploadInput = ({ formData, setFormData }: FormInputHolderProps) => {
  const uploadSections = [
    {
      keyName: "sourceImage1",
      text: "Upload first image of the activity / कार्य की पहली तस्वीर अपलोड करें"
    },
    {
      keyName: "sourceImage2",
      text: "Upload second image of the activity / कार्य की दूसरी तस्वीर अपलोड करें"
    }
  ];

  return (
    <>
      {uploadSections.map(({ keyName, text }) => (
        <ImageUploadSection
          key={keyName}
          formData={formData}
          setFormData={setFormData}
          keyName={keyName}
          text={text}
        />
      ))}
    </>
  );
};

export default FormImageUploadInput;
