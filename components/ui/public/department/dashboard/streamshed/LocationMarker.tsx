import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import * as Location from 'expo-location';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PositionMap from "../../../reportSource/PositionMap";

interface LocationMarkerProps {
  currentLocation: Location.LocationObject | null,
  setCurrentLocation: Dispatch<SetStateAction<Location.LocationObject | null>>;
}

export const LocationMarker = (props: LocationMarkerProps) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);
  const router = useRouter();

  const requestCameraPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    if (cameraPermission.status !== 'granted') {
      alert('Camera access permission is required.');
      return false;
    }
    return true;
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      router.push('/no-location');
      return false;
    }
    return true;
  };

  const fetchLocation = async () => {
    const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    props.setCurrentLocation(location);
  };

  const requestPermissions = async () => {
    try {
      setIsLoadingLocation(true);
      const cameraGranted = await requestCameraPermission();
      const locationGranted = await requestLocationPermission();

      if (cameraGranted && locationGranted) {
        await fetchLocation();
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, [useIsFocused]);

  return (
    <PositionMap isTakingLocation={isLoadingLocation} location={props.currentLocation} />
  );
};
