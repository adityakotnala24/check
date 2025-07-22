import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import LinkBox, { DashboardLinksType } from "./LinkBox";
import { moderateScale, verticalScale } from "@/utils/metrics";

const dashboardLinks: DashboardLinksType[] = [
  // {
  //   id: 1,
  //   title: 'Register Incident / Ghomi Boi',
  //   link: '/department/incident',
  //   icon: <Entypo name="water" size={moderateScale(28)} color="#fff" />,
  //   boxColor: '#1abc9c',
  // },
  {
    id: 2,
    title: 'Register Incident',
    link: '/department/streamshed',
    icon: <FontAwesome5 name="hand-holding-water" size={moderateScale(28)} color="#fff" />,
    boxColor: '#2ecc71',
  },
  // {
  //   id: 3,
  //   title: 'Ground Water Recharge',
  //   link: '/department/groundwater',
  //   icon: <FontAwesome5 name="water" size={moderateScale(28)} color="#fff" />,
  //   boxColor: '#3498db',
  // },
  // {
  //   id: 4,
  //   title: 'History / Aiyu',
  //   link: '/department/history',
  //   icon: <MaterialIcons name="history" size={moderateScale(28)} color="#fff" />,
  //   boxColor: '#9b59b6',
  // }
];

const LinkBoxesHolder = () => {

  return (
    <View style={styles.responsiveFlexBox}>
      {dashboardLinks.map((link: DashboardLinksType) => (
        <LinkBox linkData={link} key={link.id} />
      ))}
    </View>
  );
};

export default LinkBoxesHolder;

const styles = StyleSheet.create({
  responsiveFlexBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: verticalScale(5),
  },
});