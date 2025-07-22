import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { horizontalScale, verticalScale } from '@/utils';
import { FormTextInputs } from './FormTextInputs';
import { LocationMarker } from './LocationMarker';
import {
  BlockDropdown,
  DistrictDropdown
} from './FormSelectOptions';
import FormImageUploadInput from './FormImageUploadInput';
import { isOnline } from '@/utils/network';
import { saveImageToLocalCache } from '@/utils/fileUtils';
import { saveFormOffline } from '@/components/database/database';
import { uploadFormToServer } from '@/utils/uploadFormData';
import { useSession } from '@/providers/auth/SessionProvider';
import { ThemedText } from '@/components/ThemedText';
import { CustomInputField } from "../../../reportSource";

export interface StreamShedSourceFormType {
  lati: string;
  longi: string;
  incidentDate: string;
  incidentTime: string;
  affectedPersonName: string;
  affectedPersonAddress: string;
  beneficieryName: string;
  witnessName: string;
  mobileNumber: string;
  beneficieryAddress: string;
  witnessAddress: string;
  block: string;
  district: string;
  sourceImage1: string,
  sourceImage2: string;
}

const createFormData = (mobileNumber: string): StreamShedSourceFormType => ({
  district: '',
  block: '',
  mobileNumber: mobileNumber,
  sourceImage1: '',
  sourceImage2: '',
  incidentDate: '', // Added missing property
  incidentTime: '', // Added missing property
  affectedPersonName: '', // Added missing property
  affectedPersonAddress: '', // Added missing property
  beneficieryName: '',
  beneficieryAddress: '', // Added missing property
  witnessName: '', // Added missing property
  witnessAddress: '', // Added missing property
  lati: '', // Added missing property
  longi: '', // Added missing property
});

interface SubmitButtonProps {
  uploading: boolean,
  handleSubmit: () => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <View>
      {props.uploading ?
        <ActivityIndicator />
        :
        <Button mode="contained" onPress={props.handleSubmit}>
          Submit 
        </Button>
      }
    </View>
  );
};

const StreamShedSourceForm = () => {
  const { session } = useSession();
  const sessionInfo = JSON.parse(session || "{}");

  const router = useRouter();
  const [uploding, setUploading] = useState(false);
  const [formData, setFormData] = useState<StreamShedSourceFormType>(createFormData(sessionInfo.mobileNumber));
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

  const handleSubmit = async () => {
    setUploading(true);
    try {
      if (!validateForm()) return;

      const online = await isOnline();
      const dataToSave = await prepareDataToSave();

      if (!online) {
        await saveFormOffline(dataToSave);
        alert('Offline: Form saved locally.');
        router.push('/offline-data');
        return;
      }

      const uploaded = await uploadFormToServer(dataToSave);
      alert(uploaded ? 'Form submitted successfully' : 'Submission failed');
      router.push('/thank-you');
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const validateForm = (): boolean => {
    const requiredFields = ['district', 'block', 'gramPanchayat', 'revenueVillage', 'mobileNumber', 'sourceName', 'sourceImage1', 'sourceImage2'];
    const isFormValid = requiredFields.every(
      field => formData[field as keyof StreamShedSourceFormType]
    );

    // if (!isFormValid || (formData.mobileNumber?.length !== 10)) {
    //   alert('Please check all fields.');
    //   return false;
    // }
    return true;
  };

  const prepareDataToSave = async () => {
    return {
      ...formData,
      lati: currentLocation?.coords.latitude?.toString() || '',
      longi: currentLocation?.coords.longitude?.toString() || '',
      sourceImage1: await saveImageToLocalCache(formData.sourceImage1),
      sourceImage2: await saveImageToLocalCache(formData.sourceImage2),
      hoff: sessionInfo.hoff,
      chief: sessionInfo.chief,
      conservator: sessionInfo.conservator,
      dfo: sessionInfo.dfo,
      rangeId: sessionInfo.rangeId, 
    };
  };

  return (
    <View style={styles.container}>
      <ThemedText type='defaultSemiBold' style={styles.departmentNameLabel}>
        {sessionInfo.departmentName || ""}
      </ThemedText>
      <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="incidentDate"
          labelText="Incident Date / Akhi Miyo"
        />
      <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="incidentTime"
          labelText="Incident Time / Dijir Kiri"
        />
      <DistrictDropdown formData={formData} setFormData={setFormData} />
      <BlockDropdown formData={formData} setFormData={setFormData} />
      <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="affectedPersonName"
          labelText="Affected person name / Affected person nayi"
        />
        <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="affectedPersonAddress"
          labelText="Affected person address / Nang funa thang"
        />
        <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="beneficieryName"
          labelText="Beneficiery Name / Beneficiary Miri"
        />
        <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="beneficieryAddress"
          labelText="Beneficiery Address / Beneficiary Nasi"
        />
        <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="witnessName"
          labelText="Witness name / Gesema nama"
        />
        <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="witnessAddress"
          labelText="Witness address / Nirii wago"
        />

      <FormImageUploadInput formData={formData} setFormData={setFormData} />
      <LocationMarker currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
      <SubmitButton uploading={uploding} handleSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: verticalScale(20),
    paddingBottom: verticalScale(40)
  },
  departmentNameLabel: {
    backgroundColor: '#fff',
    padding: horizontalScale(10),
    textAlign: 'center'
  }
});

export default StreamShedSourceForm;