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
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";

export default function App() {
  const [loaded, setLoaded] = useState(true); // NEW: Track overall loading state
  const {
    language,
    isLanguageSelected,
    selectLanguage,
    loading: languageLoading,
  } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { registerForPushNotifications } = useNotifications();
  const { permissions } = usePermissions(); // NEW: Wait for permissions

  // Load Fonts
  useEffect(() => {
    async function loadAppAssets() {
      // await AsyncStorage.clear()
      await useFonts();
      await permissions();
      await registerForPushNotifications();
      setLoaded(true);
    }
    loadAppAssets();
  }, []);

  if (!isLanguageSelected) {
    return <LanguageSelector onSelectLanguage={selectLanguage} />;
  }
  // Wait for Language, Fonts, and Permissions to Load
  if (!loaded || languageLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <MyNavigationContainer
          initialRouteName={isLoggedIn ? "homeScreen" : "cardScreen"}
        />
      </PaperProvider>
    </Provider>
  );
}
