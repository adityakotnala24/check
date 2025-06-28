import { Href, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { ReactElement } from "react";

export interface DashboardLinksType {
  id: number,
  title: string,
  link: Href,
  icon: ReactElement<any>,
  boxColor: string,
}


interface ComponentPropType {
  linkData: DashboardLinksType;
}

const LinkBox = ({ linkData }: ComponentPropType) => {
  const router = useRouter();

  const { title, link, icon, boxColor } = linkData;

  const handleNextScreen = () => {
    router.push(link);
  };

  return (
    <TouchableOpacity onPress={handleNextScreen} style={styles.flexedBox}>
      <View style={[styles.surfaceBox, {
        backgroundColor: boxColor
      }]}>
        {icon}
        <ThemedText type='defaultSemiBold' style={styles.boxLabelText}>
          {title}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default LinkBox;

const styles = StyleSheet.create({
  flexedBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '50%',
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5)
  },
  surfaceBox: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  boxLabelText: {
    color: '#fff',
    marginTop: verticalScale(10),
    fontSize: moderateScale(14)
  }
});