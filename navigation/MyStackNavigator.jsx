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
import TotalSitesScreen from "../screens/TotalSitesScreen";
import InventoryScreen from "../screens/InventoryScreen";
import FormScreen from "../screens/FormScreen";
import TotalVendorsScreen from "../screens/TotalVendorsScreen";
import SitesFormScreen from "../screens/SitesFormScreen";
import VendorFormScreen from "../screens/VendorFormScreen";
import TaskListScreen from "../screens/TaskListScreen";
import TaskListFormScreen from "../screens/TaskListFormScreen";
import InventoryFormScreen from "../screens/InventoryFormScreen";
import StockApprovalScreen from "../screens/StockApprovalScreen";
import ReportScreen from "../screens/ReportScreen";
import TargetManagementScreen from "../screens/TargetManagementScreen";
import TargetManagementForm from "../screens/TargetManagementForm";
import ProjectDetailsScreen from "../screens/ProjectDetailScreen";
import SiteDetailsScreen from "../screens/SiteDetailsScreen";
import VendorDetailScreen from "../screens/VendorDetailScreen";
import InventoryDetailsScreen from "../screens/InventoryDetailsScreen";
import TaskMaterialScreen from "../screens/TaskMaterialScreen";
import VendorSelectionScreen from "../screens/VendorSelectionScreen";
import TaskInventoryScreen from "../screens/TaskInventoryScreen";
import CardScreen from "../screens/CardScreen";
import SiteLocationScreen from "../screens/SiteLocationScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import CurrentStreetLightScreen from "../screens/CurrentStreetLightScreen";
import GenerateJICRScreen from "../screens/GenerateJICRScreen";
import JICRReportDetailsScreen from "../screens/JICRReportDetailsScreen";
import AttendancePunchScreen from "../screens/AttendancePunchScreen";
import TravelManagement from "../screens/TravelManagement";
import AddBillForm from "../screens/AddBillForm";
import TravelDetailScreen from "../screens/TravelDetailScreen";
import ConveyanceManagementScreen from "../screens/ConveyanceManagementScreen";
import ConveyanceBillForm from "../screens/ConveyanceBillForm";
import TransportCamera from "../screens/TransportCamera";
import MapScreen from "../screens/MapScreen";
import ConveyanceCalculateScreen from "../screens/ConveyanceCalculateScreen";

const Stack = createNativeStackNavigator();
export default function MyStackNavigator({ initialRouteName }) {
  console.log(`${initialRouteName} is the route name`);
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="cardScreen" component={CardScreen} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="welcomeScreen" component={WelcomeScreen} />
      <Stack.Screen
        name="currentStreetLightScreen"
        component={CurrentStreetLightScreen}
      />
      <Stack.Screen name="generateJICRScreen" component={GenerateJICRScreen} />
      <Stack.Screen
        name="jicrReportDetailsScreen"
        component={JICRReportDetailsScreen}
      />
      <Stack.Screen name="siteLocationScreen" component={SiteLocationScreen} />
      <Stack.Screen name="attendancePunch" component={AttendancePunchScreen} />
      {/* <Stack.Screen name="dashboardScreen" component={DashboardScreen} /> */}
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

      <Stack.Screen name="totalSitesScreen" component={TotalSitesScreen} />
      <Stack.Screen name="inventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="formScreen" component={FormScreen} />
      <Stack.Screen name="totalVendorsScreen" component={TotalVendorsScreen} />

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
      <Stack.Screen
        name="targetManagementScreen"
        component={TargetManagementScreen}
      />
      <Stack.Screen
        name="targetmanagementform"
        component={TargetManagementForm}
      />
      <Stack.Screen
        name="projectDetailScreen"
        component={ProjectDetailsScreen}
      />
      <Stack.Screen name="siteDetailScreen" component={SiteDetailsScreen} />
      <Stack.Screen name="vendorDetailScreen" component={VendorDetailScreen} />
      <Stack.Screen
        name="inventoryDetailScreen"
        component={InventoryDetailsScreen}
      />
      <Stack.Screen name="taskMaterialScreen" component={TaskMaterialScreen} />
      <Stack.Screen
        name="vendorSelectionScreen"
        component={VendorSelectionScreen}
      />
      <Stack.Screen
        name="taskInventoryScreen"
        component={TaskInventoryScreen}
      />
      <Stack.Screen name="travelManagement" component={TravelManagement} />
      <Stack.Screen name="addBillForm" component={AddBillForm} />
      <Stack.Screen name="travelDetailScreen" component={TravelDetailScreen} />
      <Stack.Screen
        name="conveyanceManagement"
        component={ConveyanceManagementScreen}
      />
      <Stack.Screen name="conveyanceBillForm" component={ConveyanceBillForm} />
      <Stack.Screen name="mapScreen" component={MapScreen} />
      <Stack.Screen name="transportCamera" component={TransportCamera} />
      <Stack.Screen
        name="conveyanceCalculate"
        component={ConveyanceCalculateScreen}
      />
    </Stack.Navigator>
  );
}
