import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { verticalScale } from '@/utils';
import { ActivityIndicator } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';

interface PositionMapProp {
  location: Location.LocationObject | null;
  isTakingLocation: boolean;
}

const PositionMap = ({ location, isTakingLocation }: PositionMapProp) => {

  if (isTakingLocation) {
    return (
      <View style={styles.loadingViewContainer}>
        <ActivityIndicator />
        <ThemedText style={styles.loadingViewText}>
          Please wait... Taking your location
        </ThemedText>
      </View>
    );
  };
  if (!location) return;

  return (
    <MapView
      style={styles.mapView}
      initialRegion={{
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    >
      <Marker
        coordinate={{
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
        }}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapView: {
    width: '100%',
    height: verticalScale(200)
  },
  loadingViewContainer: {
    width: '100%',
    height: verticalScale(200),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingViewText: {
    fontSize: verticalScale(12),
    marginTop: verticalScale(10)
  }
});

export default PositionMap;
