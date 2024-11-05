import { StyleSheet, Platform, StatusBar } from "react-native";
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
  },
  cameraContainer: {
    borderWidth: 6,
    borderColor: PRIMARY_COLOR,
    overflow: "hidden",
  },
  imageContainerImg: {
    width: 0.6 * SCREEN_WIDTH,
    height: 0.6 * SCREEN_WIDTH,
  },

  textLarge: {
    fontSize: 18,
  },

  textInputField: {
    backgroundColor: PRIMARY_COLOR_TRANSPARENT,
    borderRadius: 6,
    height: 54,
    fontSize: 18,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
  primaryButton: {
    marginVertical: 8,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
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
  titleText: {
    fontWeight: "800",
    color: DARK,
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
    height: SCREEN_WIDTH / 3,
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
  chipButton: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 4,
    margin: 4,
    width: SCREEN_WIDTH / 4,
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
  bgLight: {
    backgroundColor: LIGHT,
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
  bgSecondary: {
    backgroundColor: SECONDARY_COLOR,
  },

  border: {
    borderWidth: 1,
  },

  fab: {
    elevation: 2,
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  bottom: {
    position: "absolute",
    bottom: 2,
  },
  fullWidth: {
    width: SCREEN_WIDTH,
  },
  progressBarContainer: {
    width: "90%",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 6,
  },
  snackbar: {
    position: "absolute",
    bottom: 10,
    left: 8,
    right: 8,
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    zIndex: 1000,
  },
  snackMessage: {
    maxWidth: SCREEN_WIDTH / 1.6,
    fontSize: 16,
    color: LIGHT,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  radioInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
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
  rowBullet: {
    flexDirection: "row",
    alignItems: "center",
  },

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
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdownText: {
    marginRight: 5,
    fontSize: 16,
  },
  iconCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    height: 100,
    minWidth: 120,
  },
  iconCardIcon: {
    marginBottom: 10,
  },
  iconCardText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: DARK,
  },
  // NotificationScreen,
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

  iconWrapper: {
    backgroundColor: PRIMARY_COLOR,
    padding: 6,
    borderRadius: 5,
    marginRight: 14,
  },

  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: PRIMARY_COLOR,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#888",
  },

  documentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  documentName: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    color: "#020409",
  },

  progressText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 2,
  },
  addIcon: {
    marginLeft: 8,
  },
  miniCard: {
    width: "32%",
    padding: 16,
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },

  taskContent: {
    justifyContent: "space-between",
  },
  taskText: {
    color: LIGHT,
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },

  // Attendancescreen

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  notificationIcon: {
    marginLeft: "auto",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
  },
  attendanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  gridItem: {
    alignItems: "center",
    width: "30%",
    marginVertical: 10,
  },
  attendanceCard: {
    width: "48%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: LIGHT,
    alignItems: "center",
    marginVertical: 8,
  },
  attendanceText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: "bold",
  },
  attendanceTime: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "bold",
  },
  attendanceStatus: {
    fontSize: 12,
    color: "#6e6e6e",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: LIGHT,
    borderRadius: 8,
    marginVertical: 8,
  },
  activityInfo: {
    marginLeft: 12,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activityTime: {
    fontSize: 12,
    color: "#6e6e6e",
  },
  activityStatus: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#6e6e6e",
  },
  //FormScreen
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

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  itemDetails: {
    marginLeft: 10,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unit: {
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: "#ccc",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  //Requisitionscreen
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },

  rightContainer: {
    alignItems: "flex-end",
  },

  actionButton: {
    marginTop: 10,
    padding: 6,
    backgroundColor: "#2b87b022",
    borderRadius: 5,
  },
  actionButtonText: {
    color: PRIMARY_COLOR,
  },
  //PurchaseOrderScreen
  addIconContainer: {
    borderRadius: 15,
    backgroundColor: LIGHT,
  },

  cardRow: {
    flexDirection: "row",
    padding: 4,
  },

  itemInfo: {
    flex: 3,
  },

  itemDetails: {
    alignItems: "Center",
    flex: 1,
  },

  amountCard: {
    padding: 10,
    paddingRight: 20,
    backgroundColor: LIGHT,
    borderRadius: 6,
  },
  amountDetails: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 2,
    marginLeft: 10,
  },

  //SearchableDropdown
  dropdownContainer: {
    padding: 8,
  },
  itemStyle: {
    padding: 4,
    marginTop: 4,
  },
  itemsContainerStyle: {
    maxHeight: 100,
  },
  textInput: {
    width: 310,
    color: "#020409",
  },

  leaveCard: {
    position: "relative",
    padding: 16,
    borderRadius: 8,
    backgroundColor: LIGHT,
    marginBottom: 16,
    elevation: 2,
  },
  approvedStatusContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: SUCCESS_COLOR,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  status: {
    color: LIGHT,
    fontWeight: "bold",
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: LIGHT,
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  tabContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  tabButtonActive: {
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_COLOR,
    paddingVertical: 8,
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
  timerCard: {
    backgroundColor: "#1B2940",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  timerContent: {
    alignItems: "center",
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  locationText: {
    color: LIGHT,
    fontSize: 14,
  },
  timeText: {
    fontSize: 36,
    color: "#50e3c2",
    marginVertical: 10,
  },
  workHoursText: {
    color: LIGHT,
    fontSize: 12,
  },
  workHoursTimeText: {
    fontSize: 16,
    color: "#50e3c2",
    marginTop: 5,
  },
  activityCard: {
    backgroundColor: LIGHT,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 3,
  },
  activityHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 16,
  },
  activityTime: {
    fontSize: 14,
    color: "#020409",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#020409",
    marginLeft: 5,
  },
  map: {
    height: SCREEN_WIDTH / 1.5,
  },
  message: {
    marginTop: 4,
    fontSize: 14,
    textAlign: "center",
  },
  //Todo
  projectList: {
    marginTop: 20,
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statusButton: {
    padding: 10,
    backgroundColor: PRIMARY_COLOR_TRANSPARENT,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  activeText: {
    color: LIGHT,
  },

  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    color: LIGHT,
    marginLeft: 5,
    marginRight: 15,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  progressText: {
    fontWeight: "bold",
    marginTop: 6,
    color: LIGHT,
  },
  completedText: {
    textAlign: "center",
    fontSize: 18,
    color: PRIMARY_COLOR,
    marginTop: 20,
  },

  //OrderScreen
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
  //pupop
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
  //camera
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  photoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  photoContainer: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
