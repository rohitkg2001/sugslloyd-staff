import { StyleSheet, StatusBar } from "react-native";
import {
  DANGER_COLOR,
  DARK,
  INFO_COLOR,
  LIGHT,
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "./constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT,
    alignItems: "center",
    // marginTop: StatusBar.currentHeight,
  },

  imageContainerImg: {
    width: 0.6 * SCREEN_WIDTH,
    height: 0.6 * SCREEN_WIDTH,
  },

  textLarge: {
    fontSize: 18,
  },

  textInputField: {
    backgroundColor: "#F0FAF0",
    borderRadius: 6,
    height: 54,
    fontSize: 18,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },

  btnText: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  rightLink: {
    color: PRIMARY_COLOR,
    textAlign: "right",
    textDecorationLine: "underline",
    marginVertical: 12,
  },
  headerStyle: {
    width: SCREEN_WIDTH,
    borderBottomColor: "#6c6c6c",
    borderBottomWidth: 0.5,
    height: 54,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardHalfWidth: {
    width: SCREEN_WIDTH / 2.2,
    height: SCREEN_WIDTH / 3,
    elevation: 2,
  },

  cardFullWidth: {
    width: SCREEN_WIDTH / 1.05,
    minHeight: SCREEN_WIDTH / 3,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  picker: {
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    borderRadius: 6,
  },

  btn: {
    marginVertical: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    flexDirection: "row",
  },
  bgDark: {
    backgroundColor: DARK,
  },

  bgInfo: {
    backgroundColor: INFO_COLOR,
  },
  bgDanger: {
    backgroundColor: DANGER_COLOR,
  },
  bgWarning: {
    backgroundColor: WARNING_COLOR,
  },
  bgSuccess: {
    backgroundColor: SUCCESS_COLOR,
  },
  bgPrimary: {
    backgroundColor: PRIMARY_COLOR,
  },
  bgPrimaryTransParent: {
    backgroundColor: PRIMARY_COLOR_TRANSPARENT,
  },

  border: {
    borderWidth: 1,
  },

  bottom: {
    position: "absolute",
    bottom: 2,
  },
  fullWidth: {
    width: SCREEN_WIDTH,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "red",
    marginBottom: 20,
  },

  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 16,
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  // rowBullet: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },

  onlineDot: {
    position: "absolute",
    bottom: 14,
    right: 14,
    borderWidth: 4,
    borderColor: LIGHT,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    width: SCREEN_WIDTH - 40,
    margin: 4,
    marginVertical: 8,
    elevation: 2,
    backgroundColor: LIGHT,
  },
  taskLabel: {
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 5,
    backgroundColor: "#f87171",
  },
  taskFooterItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    marginHorizontal: 4,
    color: DARK,
    fontSize: 14,
  },

  time: {
    fontSize: 12,
    color: "#020409",
    alignSelf: "center",
  },

  description: {
    fontSize: 14,
    color: "#666",
    fontWeight: "normal",
  },

  label: {
    fontSize: 14,
    color: "#888",
  },

  documentName: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    color: "#020409",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
  },

  label: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: LIGHT,
  },
  scrollView: {
    padding: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  status: {
    color: LIGHT,
    fontWeight: "bold",
  },

  tabButton: {
    color: "#888",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  checkoutButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    elevation: 5,
  },
  checkoutText: {
    color: LIGHT,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  footerText: {
    fontSize: 14,
    color: "#020409",
    marginLeft: 5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  quantityContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  popupMenu: {
    position: "absolute",
    top: 50,
    right: 8,
    width: 120,
    paddingVertical: 18,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 5,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  addButton: {
    position: "absolute",
    top: SCREEN_HEIGHT - 180,
    right: 20,
    backgroundColor: "#76885B",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 24,
    width: 24,
    borderRadius: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },

  modalOption: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
    color: "black",
  },
});
