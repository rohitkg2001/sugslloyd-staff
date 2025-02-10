import MyStackNavigator from "./MyStackNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function MyNavigationContainer({ initialRouteName }) {
  return (
    <NavigationContainer>
      <MyStackNavigator initialRouteName={initialRouteName} />
    </NavigationContainer>
  );
}
