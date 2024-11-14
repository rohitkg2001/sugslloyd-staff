import MyMaterialBottomNavigator from "./MyMaterialBottomNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import RequisitionScreen from "../screens/RequisitionScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TaskList from "../components/card/CardTask";
import HolidayListScreen from "../screens/HolidayListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingScreen";
import InternalSetting from "../screens/InternalSetting";
import NoRecord from "../screens/NoRecord";
import TotalProjectsScreen from "../screens/TotalProjectsScreen";
import TotalEarningScreen from "../screens/TotalEarningScreen";
import TotalSitesScreen from "../screens/TotalSitesScreen";
import InventoryScreen from "../screens/InventoryScreen";
import CompletedSitesScreen from "../screens/CompletedSitesScreen";
import FormScreen from "../screens/FormScreen";
import ProgressSitesScreen from "../screens/ProgressSitesScreen";
import PendingSitesScreen from "../screens/PendingSitesScreen";
import TotalVendorsScreen from "../screens/TotalVendorsScreen";
import InactiveVendorsScreen from "../screens/InactiveVendorsScreen";
import ActiveVendorsScreen from "../screens/ActiveVendorsScreen";
// import BlockListedVendorsScreen from "../screens/BlockListedVendorsScreen";
import ViewDetailScreen from "../screens/ViewDetailScreen";
import EditDetailsScreen from "../screens/EditDetailsScreen";
import SitesFormScreen from "../screens/SitesFormScreen";
import VendorFormScreen from "../screens/VendorFormScreen";
import TaskListScreen from "../screens/TaskListScreen";
import TaskListFormScreen from "../screens/TaskListFormScreen";

const Stack = createNativeStackNavigator();
export default function MyStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="loginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="dashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="homeScreen" component={MyMaterialBottomNavigator} />
      <Stack.Screen name="requisitions" component={RequisitionScreen} />
      <Stack.Screen name="notificationScreen" component={NotificationScreen} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="taskList" component={TaskList} />
      <Stack.Screen name="profileScreen" component={ProfileScreen} />
      <Stack.Screen name="HolidayListScreen" component={HolidayListScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="InternalSetting" component={InternalSetting} />
      <Stack.Screen name="NoRecord" component={NoRecord} />
      <Stack.Screen name="TotalProjectsScreen" component={TotalProjectsScreen} />
      <Stack.Screen name="TotalEarningScreen" component={TotalEarningScreen} />
      <Stack.Screen name="TotalSitesScreen" component={TotalSitesScreen} />
      <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="formScreen" component={FormScreen} />
      <Stack.Screen name="completedSitesScreen" component={CompletedSitesScreen} />
      <Stack.Screen name="progressSitesScreen" component={ProgressSitesScreen} />
      <Stack.Screen name="pendingSitesScreen" component={PendingSitesScreen} />
      <Stack.Screen name="totalVendorsScreen" component={TotalVendorsScreen} />
      <Stack.Screen name="inactiveVendorsScreen" component={InactiveVendorsScreen} />
      <Stack.Screen name="activeVendorsScreen" component={ActiveVendorsScreen} />
      <Stack.Screen name="ViewDetailScreen" component={ViewDetailScreen} />
      <Stack.Screen name="EditDetailsScreen" component={EditDetailsScreen} />
      <Stack.Screen name="sitesFormScreen" component={SitesFormScreen} />
      <Stack.Screen name="VendorFormScreen" component={VendorFormScreen} />
      <Stack.Screen name="taskListScreen" component={TaskListScreen} />
      <Stack.Screen name="taskListFormScreen" component={TaskListFormScreen} />
    </Stack.Navigator>
  );
}
