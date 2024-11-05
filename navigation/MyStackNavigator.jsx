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
      <Stack.Screen name="TotalProjectsScreen" component={ TotalProjectsScreen } />
      <Stack.Screen name="TotalEarningScreen" component={ TotalEarningScreen } />
      <Stack.Screen name="TotalSitesScreen" component={ TotalSitesScreen } />
      <Stack.Screen name="InventoryScreen" component={ InventoryScreen } />
          </Stack.Navigator>
  );
}
