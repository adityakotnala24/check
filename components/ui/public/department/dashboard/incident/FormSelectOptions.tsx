import { useEffect, useState } from "react";
import { URLs } from "@/utils";
import { CustomSelectPicker } from "../../../reportSource";
import { fetchSelectOptions } from "../../departmentFormUtils";
import { SpringWaterSourceFormType } from "./SpringWaterSourceForm";

export interface FormInputHolderProps {
  formData: SpringWaterSourceFormType;
  setFormData: React.Dispatch<React.SetStateAction<SpringWaterSourceFormType>>;
}

interface GenericDropdownProps {
  formData: SpringWaterSourceFormType;
  setFormData: React.Dispatch<React.SetStateAction<SpringWaterSourceFormType>>;
  keyName: keyof SpringWaterSourceFormType;
  label: string;
  endpoint: string;
  dependencyKey?: keyof SpringWaterSourceFormType;
}

const GenericDropdown = ({
  formData,
  setFormData,
  keyName,
  label,
  endpoint,
  dependencyKey,
}: GenericDropdownProps) => {
  const [optionsList, setOptionsList] = useState<Array<{ label: string; value: string; }>>([]);

  useEffect(() => {
    fetchSelectOptions(`${URLs.baseUrl}${endpoint}`, setOptionsList);
  }, [dependencyKey ? formData[dependencyKey] : undefined]);

  return (
    <CustomSelectPicker
      formData={formData}
      setFormData={setFormData}
      keyName={keyName}
      label={label}
      options={optionsList}
    />
  );
};

export const DistrictDropdown = (props: FormInputHolderProps) => (
  <GenericDropdown
    {...props}
    keyName="district"
    label="जिला / District"
    endpoint="get-districts.php" />
);

export const BlockDropdown = (props: FormInputHolderProps) => (
  <GenericDropdown
    {...props}
    keyName="block"
    label="ब्लॉक / Block"
    endpoint={`get-blocks.php?district_code=${props.formData.district}`}
    dependencyKey="district" />
);

