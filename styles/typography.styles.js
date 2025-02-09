import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
  SECONDARY_COLOR,
  WARNING_COLOR,
  INFO_COLOR,
  DANGER_COLOR,
  SUCCESS_COLOR,
  LIGHT,
  DARK,
} from "./constant";

import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
  fontLato: {
    fontFamily: "lato_regular",
  },
  textPrimary: {
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    color: SECONDARY_COLOR,
  },
  textLight: {
    color: LIGHT,
  },
  textDark: {
    color: DARK,
  },
  textDanger: {
    color: DANGER_COLOR,
  },
  textInfo: {
    color: INFO_COLOR,
  },
  textWarning: {
    color: WARNING_COLOR,
  },
  textSuccess: {
    color: SUCCESS_COLOR,
  },
  textPrimaryTransparent: {
    color: PRIMARY_COLOR_TRANSPARENT,
  },
  // Font weights
  textBold: {
    fontWeight: "bold",
  },
  text600: {
    fontWeight: "600",
  },
  text400: {
    fontWeight: "400",
  },
  textNormal: {
    fontWeight: "normal",
  },
  font10: {
    fontSize: 10,
  },

  font12: {
    fontSize: 12,
  },

  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  font20: {
    fontSize: 20,
  },
  font40: {
    fontSize: 40,
  },
  // uppercase,lowercase,capitalize
  textCapitalize: {
    textTransform: "capitalize",
  },
  textLower: {
    textTransform: "lowercase",
  },
  textUpper: {
    textTransform: "uppercase",
  },
  // Alignment

  textLeft: {
    textAlign: "left",
  },
  textJustify: {
    textAlign: "justify",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
});
