import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, Surface } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';

import { ThemedText } from '@/components/ThemedText';
import { useSession } from '@/providers/auth/SessionProvider';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';

const UserInfoLabel = () => {
  const { session }: { session?: string | null; } = useSession();
  const { userName, departmentName } = JSON.parse(session || '{}');

  const { signOut } = useSession();

  const handleLogout = () => {

    return signOut();
  };

  return (
    <View style={styles.userInfoLabelContainer}>
      <Surface style={styles.surfaceBox} elevation={1}>
        <UserGreetBoxHolder name={userName} />
        <Divider style={styles.verticalDivider} />
        <UserDivisonInformation divisionName={departmentName || ""} />
        {/* <TouchableOpacity onPress={handleLogout}>
        <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity> */}
      </Surface>
    </View>
  );
};

const UserDivisonInformation = ({ divisionName }: { divisionName: string; }) => {
  return (
    <View style={styles.headerInfoBox}>
      <ThemedText style={styles.divisonLabelText} type='defaultSemiBold'>
        {divisionName}
      </ThemedText>
    </View>
  );
};

const UserGreetBoxHolder = ({ name }: { name: string; }) => {
  return (
    <View style={styles.headerInfoBox}>
      <ThemedText type='defaultSemiBold'>Hi,</ThemedText>
      <ThemedText style={styles.userNameLabel}
        type='defaultSemiBold'>{name}</ThemedText>
    </View>
  );
};

export default UserInfoLabel;

const styles = StyleSheet.create({
  userInfoLabelContainer: {
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(5),
    marginTop: verticalScale(5)
  },
  surfaceBox: {
    padding: horizontalScale(10),
    borderRadius: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  userNameLabel: {
    fontSize: moderateScale(16),
    color: "#219ebc"
  },
  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: "#219ebc",
    marginHorizontal: horizontalScale(10)
  },
  headerInfoBox: {
    flexBasis: '45%'
  },
  divisonLabelText: {
    width: '100%',
    textAlign: 'left',
    color: '#333'
  }
});