import "react-native-gesture-handler";
import { PaperProvider, ActivityIndicator } from "react-native-paper";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import MyNavigationContainer from "./navigation/MyNavigationContainer";
import LanguageSelector from "./components/LanguageSelector";
import store from "./store";
import useFonts from "./hooks/useFonts";
import useLanguage from "./hooks/useLanguage";
import useAuth from "./hooks/useAuth";
import useNotifications from "./hooks/useNotifications";
import usePermissions from "./hooks/usePermissions";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(true); // NEW: Track overall loading state

  const { language, isLanguageSelected, selectLanguage } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { registerForPushNotifications } = useNotifications();
  const { permissions, permissionsLoading } = usePermissions(); // NEW: Wait for permissions

  // Load Fonts
  useEffect(() => {
    async function loadAppFonts() {
      await useFonts();
      setFontsLoaded(true);
    }
    loadAppFonts();
  }, []);

  // Register for Push Notifications
  useEffect(() => {
    async function setupNotifications() {
      await registerForPushNotifications();
    }
    setupNotifications();
  }, []);

  // Wait for Language, Fonts, and Permissions to Load
  if (!fontsLoaded || permissionsLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (!isLanguageSelected) {
    return <LanguageSelector onSelectLanguage={selectLanguage} />;
  }

  if (!permissions.push || !permissions.camera || !permissions.location) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <MyNavigationContainer initialRoute={isLoggedIn ? "Home" : "Login"} />
      </PaperProvider>
    </Provider>
  );
}
