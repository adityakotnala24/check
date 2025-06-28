import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { verticalScale } from '@/utils';

const NoLocation = () => {
  const router = useRouter();

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/location-permission.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Location Access Required</Text>
      <Text style={styles.description}>
        Please enable location services to help us provide you with the best experience.
        We need your location to submit and process your details accurately.
      </Text>
      <TouchableOpacity onPress={openSettings}>
        <Text style={styles.linkText}>Open Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: verticalScale(250),
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    lineHeight: 24
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: '#6c757d'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textDecorationLine: 'underline'
  }
});
