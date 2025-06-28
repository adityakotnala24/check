import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { URLs } from '@/utils';

import PositionMap from './PositionMap';
import { verticalScale } from '@/utils';
import CustomInputField from './CustomInputField';
import CustomSelectPicker from './CustomSelectPicker';
import ImageUploadSection from './ImageUploadSection';
import { useIsFocused } from '@react-navigation/native';
import { lowWaterLevel, watersourceOption } from '@/data/static';
import { useRouter } from 'expo-router';

import blocks from '@/components/static/tbl_block.json';
import districts from '@/components/static/tbl_district.json';
import gramPanchayats from '@/components/static/tbl_gram_panchayat.json';
import revenueVillages from '@/components/static/tbl_village.json';
import { isOnline } from '@/utils/network';
import { saveImageToLocalCache } from '@/utils/fileUtils';
import { saveFormOffline } from '@/components/database/database';
import { uploadFormToServer } from '@/utils/uploadFormData';
import { fetchSelectOptions } from '../department/departmentFormUtils';

const convertToLabelValue = <T extends { [key: string]: string; }>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T
) => {
  return data.map(item => ({
    label: item[labelKey],
    value: item[valueKey]
  }));
};



const InputsContainer = () => {
  const router = useRouter();
  const [blockList, setBlockList] = useState(convertToLabelValue(blocks.data, "block_name", "block_id"));
  const [formData, setFormData] = useState<any>({});
  const [districtList, setDistrictList] = useState([]);
  const [gramPanchayatList, setGramPanchayatList] = useState([]);
  const [revenueVillageList, setRevenueVillageList] = useState([]);
  const [activityList, setActivityList] = useState<any>([]);

  const [isTakingLocation, setIsTakingLocation] = useState<boolean>(true);

  const [uploding, setUploading] = useState(false);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activityType = "Spring";

  const permisionFunction = async () => {
    try {
      setIsTakingLocation(true);
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const { status } = await Location.requestForegroundPermissionsAsync();

      console.log(`Inside permission functionm`);
      console.log('Status', status);

      if (status !== 'granted') {
        router.push('/no-location');
        setErrorMsg('Permission to access location was denied');
        return;
      }

      if (cameraPermission.status !== 'granted') {
        alert('Permission for Camera And Location access needed.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
      setLocation(location);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTakingLocation(false);
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ['district', 'block', 'gramPanchayat', 'revenueVillage', 'userName', 'mobileNumber', 'sourceName', 'waterSourceType', 'waterSourceLoss', 'sourceImage', 'personImageWithSource'];
    const isFormValid = requiredFields.every(field => formData[field]);

    if (!isFormValid || (formData.mobileNumber?.length !== 10)) {
      alert('Please check all fields.');
      return;
    }

    const online = await isOnline();

    const dataToSave = {
      ...formData,
      lati: location?.coords.latitude?.toString(),
      longi: location?.coords.longitude?.toString(),
      sourceImage: await saveImageToLocalCache(formData.sourceImage),
      personImageWithSource: await saveImageToLocalCache(formData.personImageWithSource),
    };

    if (!online) {
      await saveFormOffline(dataToSave);
      alert('Offline: Form saved locally.');
      router.push('/offline-data');
      return;
    }

    const uploaded = await uploadFormToServer(dataToSave);
    alert(uploaded ? 'Form submitted successfully' : 'Submission failed');
    router.push('/thank-you');
  };


  const isFocused = useIsFocused();

  useEffect(() => {
    fetchSelectOptions(`${URLs.baseUrl}get-activity.php`, setActivityList);
  }, [activityType]);

  useEffect(() => {
    fetchSelectOptions(`${URLs.baseUrl}get-districts.php`, setDistrictList);
  }
    , []);

  useEffect(() => {
    fetchSelectOptions(`${URLs.baseUrl}get-blocks.php`, setBlockList);
  }
    , [formData.district]);

  useEffect(() => {
    fetchSelectOptions(`${URLs.baseUrl}gram_panchayat.php`, setGramPanchayatList);
  }
    , [formData.block]);

  useEffect(() => {
    fetchSelectOptions(`${URLs.baseUrl}revenueVillages.php`, setRevenueVillageList);
  }
    , [formData.block]);

  useEffect(() => {
    permisionFunction();
    return () => { };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <CustomSelectPicker
        formData={formData}
        setFormData={setFormData}
        keyName="district"
        label="जिला / District"
        options={districtList}
      />

      <CustomSelectPicker
        formData={formData}
        setFormData={setFormData}
        keyName="block"
        label="ब्लॉक / Block"
        options={blockList}
      />

      <CustomSelectPicker
        formData={formData}
        setFormData={setFormData}
        keyName="gramPanchayat"
        label="ग्राम पंचायत / Gram Panchayat"
        options={gramPanchayatList}
      />

      <CustomSelectPicker
        formData={formData}
        setFormData={setFormData}
        keyName="revenueVillage"
        label="राजस्व गाँव / Revenue Village"
        options={revenueVillageList}
      />

      <CustomInputField
        isNumeric
        formData={formData}
        setFormData={setFormData}
        keyName="mobileNumber"
        labelText="Mobile number / अपना मोबाइल नंबर लिखें "
      />

      <CustomInputField
        formData={formData}
        setFormData={setFormData}
        keyName="sourceName"
        labelText="Spring name (As per DPR)"
      />

      <CustomSelectPicker
        formData={formData}
        setFormData={setFormData}
        keyName="activityType"
        label="Activity"
        options={activityList}
      />

      <ImageUploadSection
        formData={formData}
        setFormData={setFormData}
        keyName="sourceImage"
        text="Upload first image of the spring activity / स्प्रिंग की तस्वीर अपलोड करें"
      />

      <ImageUploadSection
        formData={formData}
        setFormData={setFormData}
        keyName="sourceImage"
        text="Upload second image of the spring activity / स्प्रिंग की तस्वीर अपलोड करें"
      />

      {/* <ImageUploadSection
        formData={formData}
        setFormData={setFormData}
        keyName="sourceImage"
        text="Upload third image of the spring activity / स्प्रिंग की तस्वीर अपलोड करें"
      />

      <ImageUploadSection
        formData={formData}
        setFormData={setFormData}
        keyName="sourceImage"
        text="Upload fourth image of the spring activity / स्प्रिंग की तस्वीर अपलोड करें"
      /> */}

      {/* <ImageUploadSection
        formData={formData}
        setFormData={setFormData}
        keyName="personImageWithSource"
        text="Upload your image with source / अपनी तस्वीर को स्रोत के साथ अपलोड करें"
      /> */}

      <PositionMap isTakingLocation={isTakingLocation} location={location} />

      <View>
        {uploding ?
          <ActivityIndicator />
          :
          <Button mode="contained" onPress={handleSubmit}>
            Submit / जमा करें
          </Button>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: verticalScale(20),
    paddingBottom: verticalScale(40)
  }
});

export default InputsContainer;