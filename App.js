import "react-native-gesture-handler"; //Don't ever remove this line
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import MyNavigationContainer from "./navigation/MyNavigationContainer";
import { checkPermissions } from "./utils/checkPermissions";

export default function App() {
  return (
    <PaperProvider>
      <MyNavigationContainer />
    </PaperProvider>
  );
}
