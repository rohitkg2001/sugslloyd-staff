import MyMaterialBottomNavigator from "./MyMaterialBottomNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TaskList from "../components/card/CardTask";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingScreen";
import InternalSetting from "../screens/InternalSetting";
import TotalProjectsScreen from "../screens/TotalProjectsScreen";
import TotalEarningScreen from "../screens/TotalEarningScreen";
import TotalSitesScreen from "../screens/TotalSitesScreen";
import InventoryScreen from "../screens/InventoryScreen";
import FormScreen from "../screens/FormScreen";
import TotalVendorsScreen from "../screens/TotalVendorsScreen";
import ViewDetailScreen from "../screens/ViewDetailScreen";
import EditDetailsScreen from "../screens/EditDetailsScreen";
import SitesFormScreen from "../screens/SitesFormScreen";
import VendorFormScreen from "../screens/VendorFormScreen";
import TaskListScreen from "../screens/TaskListScreen";
import TaskListFormScreen from "../screens/TaskListFormScreen";
import InventoryFormScreen from "../screens/InventoryFormScreen";
import StockApprovalScreen from "../screens/StockApprovalScreen";
import ReportScreen from "../screens/ReportScreen";

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
      <Stack.Screen name="notificationScreen" component={NotificationScreen} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="taskList" component={TaskList} />
      <Stack.Screen name="profileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="InternalSetting" component={InternalSetting} />
      <Stack.Screen
        name="totalProjectsScreen"
        component={TotalProjectsScreen}
      />
      <Stack.Screen name="totalEarningScreen" component={TotalEarningScreen} />
      <Stack.Screen name="totalSitesScreen" component={TotalSitesScreen} />
      <Stack.Screen name="inventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="formScreen" component={FormScreen} />
      <Stack.Screen name="totalVendorsScreen" component={TotalVendorsScreen} />
      <Stack.Screen name="ViewDetailScreen" component={ViewDetailScreen} />
      <Stack.Screen name="EditDetailsScreen" component={EditDetailsScreen} />
      <Stack.Screen name="sitesFormScreen" component={SitesFormScreen} />
      <Stack.Screen name="VendorFormScreen" component={VendorFormScreen} />
      <Stack.Screen name="taskScreen" component={TaskListScreen} />
      <Stack.Screen name="taskListFormScreen" component={TaskListFormScreen} />
      <Stack.Screen
        name="inventoryFormScreen"
        component={InventoryFormScreen}
      />
      <Stack.Screen
        name="stockApprovalScreen"
        component={StockApprovalScreen}
      />
      <Stack.Screen name="reportScreen" component={ReportScreen} />
    </Stack.Navigator>
  );
}
