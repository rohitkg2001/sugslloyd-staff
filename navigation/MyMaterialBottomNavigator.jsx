import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingScreen";
import CurrentProjectsScreen from "../screens/CurrentProjectsScreen";

import {
  INFO_COLOR,
  LIGHT,
  PRIMARY_COLOR,
  ICON_SMALL,
} from "../styles/constant";

const BottomTab = createMaterialBottomTabNavigator();

export default function MyMaterialBottomNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="dashboardScreen"
      activeColor={PRIMARY_COLOR}
      inactiveColor={INFO_COLOR}
      activeIndicatorStyle={{ backgroundColor: "transparent" }}
      barStyle={{
        backgroundColor: LIGHT,
        height: 70,
        borderTopWidth: 0.5,
        borderTopColor: "#6c6c6c",
        paddingTop: 0,
        // paddingBottom: 20,
        // marginBottom: 30,
      }}
    >
      <BottomTab.Screen
        name="dashboardScreen"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="desktop-outline" size={ICON_SMALL} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CurrentProjectsScreen"
        component={CurrentProjectsScreen}
        options={{
          tabBarLabel: "Targets",
          tabBarIcon: ({ color }) => (
            <Icon name="grid-outline" size={ICON_SMALL} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="settingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: "More",
          tabBarIcon: ({ color }) => (
            <Icon
              name="ellipsis-vertical-circle"
              size={ICON_SMALL}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
