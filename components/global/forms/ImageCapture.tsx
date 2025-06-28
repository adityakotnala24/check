import React, { useState, useRef } from 'react';
import { Camera, CameraView } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View, Modal, Image } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';

interface CameraControlsProps {
  onClose: () => void;
  onCapture: () => void;
  onSwitch: () => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({ onClose, onCapture, onSwitch }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
      <MaterialIcons name="close" size={32} color="white" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.captureButton} onPress={onCapture}>
      <View style={styles.captureButtonInner} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.switchButton} onPress={onSwitch}>
      <MaterialIcons name="flip-camera-ios" size={32} color="white" />
    </TouchableOpacity>
  </View>
);

interface CapturedImageViewProps {
  imageUri: string;
  onRetake: () => void;
}

const CapturedImageView: React.FC<CapturedImageViewProps> = ({ imageUri, onRetake }) => (
  <View style={styles.capturedImageContainer}>
    <Image source={{ uri: imageUri }} style={styles.capturedImage} />
    <TouchableOpacity style={styles.retakeButton} onPress={onRetake}>
      <ThemedText style={styles.retakeButtonText}>Retake</ThemedText>
    </TouchableOpacity>
  </View>
);

const CameraModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  cameraRef: React.RefObject<CameraView>;
  cameraFacing: 'front' | 'back';
  onCapture: () => void;
  onSwitch: () => void;
}> = ({ isVisible, onClose, cameraRef, cameraFacing, onCapture, onSwitch }) => (
  <Modal
    onRequestClose={onClose}
    visible={isVisible}
    transparent={true}
    animationType="slide"
  >
    <View style={styles.modalContainer}>
      <CameraView ref={cameraRef} facing={cameraFacing} style={styles.camera}>
        <CameraControls onClose={onClose} onCapture={onCapture} onSwitch={onSwitch} />
      </CameraView>
    </View>
  </Modal>
);

interface ImageCaptureProps {
  formData: any;
  setFormData: (data: any) => void;
  keyName: string;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ formData, setFormData, keyName }) => {
  const [capturedImage, setCapturedImage] = useState<string | null | undefined>(formData && formData[keyName]);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<'front' | 'back'>('back');
  const [permission, setPermission] = useState<boolean>();
  const cameraRef = useRef<CameraView>(null);

  const handleCameraModalVisibility = async () => {
    if (!permission) {
      const permissionResult = await Camera.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        return;
      }
      setPermission(permissionResult.granted);
    }
    setIsCameraModalVisible(!isCameraModalVisible);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current?.takePictureAsync();
      setCapturedImage(photo?.uri);
      setFormData({
        ...formData,
        [keyName]: photo?.uri
      });
      setIsCameraModalVisible(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setFormData({
      ...formData,
      [keyName]: undefined
    });
  };

  const switchCamera = () => {
    setCameraFacing(prev => prev === 'back' ? 'front' : 'back');
  };

  return (
    <View style={styles.imageCaptureContainer}>
      <CameraModal
        cameraRef={cameraRef}
        onCapture={takePicture}
        onSwitch={switchCamera}
        cameraFacing={cameraFacing}
        isVisible={isCameraModalVisible}
        onClose={handleCameraModalVisibility}
      />

      {capturedImage ? (
        <CapturedImageView
          imageUri={capturedImage}
          onRetake={handleRetake}
        />
      ) : (
        <TouchableOpacity
          onPress={handleCameraModalVisibility}
          style={styles.captureImageLabelBox}
        >
          <ThemedText style={styles.captureImageLabel}>Capture Image</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageCapture;

const styles = StyleSheet.create({
  imageCaptureContainer: {
    width: '100%',
    height: verticalScale(200)
  },
  captureImageLabelBox: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10)
  },
  captureImageLabel: {
    fontSize: moderateScale(12)
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  camera: {
    flex: 1,
    position: 'relative'
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,.4)',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10)
  },
  closeButton: {
    padding: moderateScale(10)
  },
  switchButton: {
    padding: moderateScale(10)
  },
  captureButton: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureButtonInner: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: 'white'
  },
  capturedImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
    overflow: 'hidden'
  },
  capturedImage: {
    width: '100%',
    height: '100%'
  },
  retakeButton: {
    position: 'absolute',
    bottom: moderateScale(10),
    right: moderateScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
  },
  retakeButtonText: {
    fontSize: moderateScale(12)
  }
});