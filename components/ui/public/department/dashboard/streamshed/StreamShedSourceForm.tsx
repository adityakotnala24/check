import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { horizontalScale, verticalScale } from '@/utils';
import { FormTextInputs } from './FormTextInputs';
import { LocationMarker } from './LocationMarker';
import {
  ActivitiesListDropdown, BlockDropdown,
  DistrictDropdown, GramPanchayatDropdown, RevenueVillageDropdown
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
  district: string;
  block: string,
  gramPanchayat: string,
  revenueVillage: string,
  mobileNumber: string,
  sourceName: string,
  activity: number;
  otherdeptName: string;
  sourceImage1: string,
  sourceImage2: string;
}

const createFormData = (mobileNumber: string): StreamShedSourceFormType => ({
  district: '',
  block: '',
  gramPanchayat: '',
  revenueVillage: '',
  mobileNumber: mobileNumber,
  sourceName: '',
  activity: 0,
  otherdeptName: '',
  sourceImage1: '',
  sourceImage2: ''
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
          Submit / जमा करें
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

    if (!isFormValid || (formData.mobileNumber?.length !== 10)) {
      alert('Please check all fields.');
      return false;
    }
    return true;
  };

  const prepareDataToSave = async () => {
    return {
      ...formData,
      lati: currentLocation?.coords.latitude?.toString(),
      longi: currentLocation?.coords.longitude?.toString(),
      sourceImage1: await saveImageToLocalCache(formData.sourceImage1),
      sourceImage2: await saveImageToLocalCache(formData.sourceImage2),
      department: sessionInfo.department,
      activityType: "StreamShed"
    };
  };

  return (
    <View style={styles.container}>
      <ThemedText type='defaultSemiBold' style={styles.departmentNameLabel}>
        {sessionInfo.departmentName || ""}
      </ThemedText>

      <DistrictDropdown formData={formData} setFormData={setFormData} />
      <BlockDropdown formData={formData} setFormData={setFormData} />
      <GramPanchayatDropdown formData={formData} setFormData={setFormData} />
      <RevenueVillageDropdown formData={formData} setFormData={setFormData} />

      <FormTextInputs formData={formData} setFormData={setFormData} />
      <ActivitiesListDropdown formData={formData} setFormData={setFormData} />
      {sessionInfo.departmentName==="Other" &&
        <CustomInputField
          formData={formData}
          setFormData={setFormData}
          keyName="otherdeptName"
          labelText="Department Name / विभाग का नाम"
        />
      }

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