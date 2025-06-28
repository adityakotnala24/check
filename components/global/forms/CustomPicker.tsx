import React, { useState } from 'react';
import { Dropdown } from 'react-native-paper-dropdown';

interface Option {
  label: string;
  value: string;
}

interface SelectOptionProps {
  label: string;
  options: Option[];
  formData?: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  keyName: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  options,
  setFormData,
  keyName: optionKey,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setFormData((prevData: any) => ({
      ...prevData,
      [optionKey]: value,
    }));
  };

  return (
    <Dropdown
      label={label}
      mode='outlined'
      placeholder={`Select ${label}`}
      options={options}
      value={selectedOption}
      onSelect={handleSelect as any}
    />
  );
};

export default SelectOption;