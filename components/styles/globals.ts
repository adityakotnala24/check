import { horizontalScale, verticalScale } from "@/utils";
import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10)
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: verticalScale(20),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
  }
});