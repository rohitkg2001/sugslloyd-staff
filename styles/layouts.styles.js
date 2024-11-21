import { SCREEN_WIDTH, LIGHT } from "./constant";
import { StyleSheet } from "react-native";

export const layouts = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT,
    alignItems: "center",
  },

  flex1: {
    flex: 1,
  },

  // Directional
  // left,right,bottom,top,center
  flexVertical: {
    flexDirection: "column",
  },
  flexHorizontal: {
    flexDirection: "row",
  },
  selfStart: {
    alignSelf: "flex-start",
  },
  selfEnd: {
    alignSelf: "flex-end",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Circles
  circle100: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH / 2,
  },
  circle75: {
    height: SCREEN_WIDTH / 1.5,
    width: SCREEN_WIDTH / 1.5,
    borderRadius: SCREEN_WIDTH / 3,
  },
  circle50: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    borderRadius: SCREEN_WIDTH / 4,
  },
  circle25: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_WIDTH / 4,
    borderRadius: SCREEN_WIDTH / 8,
  },
  circle12: {
    width: SCREEN_WIDTH / 8,
    height: SCREEN_WIDTH / 8,
    borderRadius: SCREEN_WIDTH / 16,
  },
  circle625: {
    width: SCREEN_WIDTH / 16,
    height: SCREEN_WIDTH / 16,
    borderRadius: SCREEN_WIDTH / 32,
  },

  // Cards
  card: {
    elevation: 2,
  },
});
