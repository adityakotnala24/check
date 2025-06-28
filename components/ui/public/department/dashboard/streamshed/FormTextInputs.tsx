import { CustomInputField } from "../../../reportSource";
import { FormInputHolderProps } from "./FormSelectOptions";

export const FormTextInputs = (props: FormInputHolderProps) => {
  return (
    <>
      <CustomInputField
        isNumeric
        formData={props.formData}
        setFormData={props.setFormData}
        keyName="mobileNumber"
        labelText="Mobile number / अपना मोबाइल नंबर लिखें "
      />

      <CustomInputField
        formData={props.formData}
        setFormData={props.setFormData}
        keyName="sourceName"
        labelText="Streamshed name (As per DPR)"
      />
    </>
  );
};