import { FormInputHolderProps } from './FormSelectOptions';
import ImageUploadSection from '../../../reportSource/ImageUploadSection';
import React from 'react';

const FormImageUploadInput = ({ formData, setFormData }: FormInputHolderProps) => {
  const uploadSections = [
    {
      keyName: "sourceImage1",
      text: "Upload first image / Siri hiri photo"
    },
    {
      keyName: "sourceImage2",
      text: "Upload second image  / Dibe jisi boku"
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
