import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { horizontalScale, moderateScale, verticalScale } from '@/utils';

const FooterText = () => (
  <ThemedText style={styles.footerLabelText} type='defaultSemiBold'>
    उत्तराखण्ड के जलस्रोतों को चिह्नित एवं संरक्षित करने हेतु विभागीय भागीदारी में अपना सहयोग प्रदान करें।
    {'\n'} उत्तराखंड सरकार का भगीरथ प्रयास। .
  </ThemedText>
  
);



const DepartmentButton = ({ onPress }: { onPress: () => void; }) => (
  <TouchableOpacity onPress={onPress} style={styles.footerButton}>
    <ThemedText style={styles.footerButtonText} type='defaultSemiBold'>
      विभागीय लॉगिन करें 
    </ThemedText>
  </TouchableOpacity>
);

const Footer = () => {
  const router = useRouter();
  const handleDepartmentButtonClick = (): void => router.push('/department/login');

  return (
    <View style={styles.footerContainer}>
      <FooterText />
      <DepartmentButton onPress={handleDepartmentButtonClick} />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLabelText: {
    color: 'rgba(250, 250, 250, 0.96)',
    textAlign: 'center',
    fontSize: moderateScale(14),
    paddingHorizontal: horizontalScale(20),
    lineHeight: moderateScale(20),
  },
  footerLabelText1: {
    color: 'rgba(1, 23, 61, 0.5)',
    textAlign: 'center',
    fontSize: moderateScale(14),
    paddingHorizontal: horizontalScale(20),
    lineHeight: moderateScale(20),
  },
  footerButton: {
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(30),
    borderRadius: moderateScale(100),
    backgroundColor: '#0c569e',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
  }
});
