import MyMaterialBottomNavigator from "./MyMaterialBottomNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ApplyLeaveForm from "../screens/ApplyLeaveForm";
import RequisitionScreen from "../screens/RequisitionScreen";
import PurchaseOrderScreen from "../screens/PurchaseOrderScreen";
import FormScreen from "../screens/FormScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PrivacyPolicy from "../screens/PrivacyPolicy";
// import TaskList from "../screens/TaskList";
import ProjectTimeline from "../screens/ProjectTimeline";
import TaskList from "../components/card/CardTask";
import TotalEarningScreen from "../screens/TotalEarningScreen";
import HolidayListScreen from "../screens/HolidayListScreen";
import ProfileScreen from "../screens/ProfileScreen";
//import LandingPage from "../screens/LandingPage";
//import LineItemScreen from "../screens/LineItemScreen";
//import TermsAndConditions from "../screens/TermsAndConditions";
//import ApplyLeaveForm from "../screens/ApplyLeaveForm";
//import  AllLeaves from "../screens/AllLeaves"
//import CheckOut  from "../screens/CheckOut"
//import SuccessModal from "../components/SuccessModal";
import SettingsScreen from "../screens/SettingScreen";
import InternalSetting from "../screens/InternalSetting";
import TaskCardScreen from "../screens/TaskCardScreen";
import ToDoTaskCardScreen from "../screens/ToDoTaskCardScreen";
import NoRecord from "../screens/NoRecord";
import FileUploadScreen from "../screens/FileUploadScreen";
import OrderScreen from "../screens/OrderScreen";
<<<<<<< HEAD
import TotalEarningScreen from "../screens/TotalEarningScreen";
import TotalProjectsScreen from "../screens/TotalProjectsScreen";
import TotalSitesScreen from "../screens/TotaSitesScreen";
import InventoryScreen from "../screens/InventoryScreen";
=======
import RequirementsScreen from "../screens/RequirementsScreen";
import NoTask from "../screens/NoTask";
import TotalProjectsScreen from "../screens/TotalProjectsScreen";
import CurrentProjectsScreen from "../screens/CurrentProjectsScreen";
import TasksScreen from "../screens/TasksScreen";
>>>>>>> 3354afb0d26e792d4e507b419be5a4c0a6f899e0
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
      <Stack.Screen name="projectTimeLine" component={ProjectTimeline} />
      <Stack.Screen name="applyLeaveForm" component={ApplyLeaveForm} />
      <Stack.Screen name="requisitions" component={RequisitionScreen} />
      <Stack.Screen
        name="purchaseOrderScreen"
        component={PurchaseOrderScreen}
      />
      <Stack.Screen name="formScreen" component={FormScreen} />
      <Stack.Screen name="notificationScreen" component={NotificationScreen} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="taskList" component={TaskList} />
      <Stack.Screen name="profileScreen" component={ProfileScreen} />
      <Stack.Screen name="HolidayListScreen" component={HolidayListScreen} />
      {/* <Stack.Screen name="LandingPage" component={LandingPage} /> */}
      {/* <Stack.Screen name="LineItemScreen" component={LineItemScreen} /> */}
      {/* <Stack.Screen name="TermsAndConditions" component={TermsAndConditions}/> */}
      <Stack.Screen name="ApplyLeaveForm" component={ApplyLeaveForm} />
      {/* <Stack.Screen name="AllLeaves" component={AllLeaves}/> */}
      {/* <Stack.Screen name="CheckOut" component={CheckOut}/> */}
      {/* <Stack.Screen name="SuccessModal" component={SuccessModal}/> */}
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="InternalSetting" component={InternalSetting} />
      <Stack.Screen name="TaskCardScreen" component={TaskCardScreen} />
      <Stack.Screen name="ToDoTaskCardScreen" component={ToDoTaskCardScreen} />
      <Stack.Screen name="NoRecord" component={NoRecord} />
      <Stack.Screen name="NoTask" component={NoTask} />
      <Stack.Screen name="fileUploadScreen" component={FileUploadScreen} />
      <Stack.Screen name="orderScreen" component={OrderScreen} />
      <Stack.Screen name="TotalEarningScreen" component={TotalEarningScreen} />
      <Stack.Screen
        name="TotalProjectsScreen"
        component={TotalProjectsScreen}
      />
      <Stack.Screen name="TotalSitesScreen" component={ TotalSitesScreen } />
      <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
    </Stack.Navigator>
  );
}
