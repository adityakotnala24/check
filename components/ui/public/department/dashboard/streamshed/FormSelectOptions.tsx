import { useEffect, useState } from "react";
import { URLs } from "@/utils";
import { CustomSelectPicker } from "../../../reportSource";
import { fetchSelectOptions } from "../../departmentFormUtils";
import { StreamShedSourceFormType } from "./StreamShedSourceForm";

export interface FormInputHolderProps {
  formData: StreamShedSourceFormType;
  setFormData: React.Dispatch<React.SetStateAction<StreamShedSourceFormType>>;
}

interface GenericDropdownProps {
  formData: StreamShedSourceFormType;
  setFormData: React.Dispatch<React.SetStateAction<StreamShedSourceFormType>>;
  keyName: keyof StreamShedSourceFormType;
  label: string;
  endpoint: string;
  dependencyKey?: keyof StreamShedSourceFormType;
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
    label="Nature of Damage / Nika Kyo"
    endpoint="get-incident-type.php" />
);

export const BlockDropdown = (props: FormInputHolderProps) => (
  <GenericDropdown
    {...props}
    keyName="block"
    label="Damage Caused By / Niiw Hibi Bolo"
    endpoint="get-incident-type.php" />
);

// export const BlockDropdown = (props: FormInputHolderProps) => (
//   <GenericDropdown
//     {...props}
//     keyName="block"
//     label="Damage Caused By / Niiw Hibi Bolo"
//     endpoint="get-animal.php" />
// );




