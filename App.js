import "react-native-gesture-handler";
import { PaperProvider, ActivityIndicator } from "react-native-paper";
import { useEffect, useState } from "react";
import MyNavigationContainer from "./navigation/MyNavigationContainer";
import { Provider } from "react-redux";
import i18n from "./i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageSelector from "./components/LanguageSelector";


export default function App() {
  const [language, setLanguage] = useState(null);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  const selectLanguage = async (lang) => {
    await AsyncStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsLanguageSelected(true);
  };
  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('appLanguage')
      setLanguage(storedLanguage)
      setIsLanguageSelected(true)
    }

    fetchLanguage()
  }, [])

  if (!isLanguageSelected) {
    return <LanguageSelector onSelectLanguage={selectLanguage} />;
  }
  if (!language) {
    return <ActivityIndicator size="large" />
  }


  return (
    <Provider store={store}>
      <PaperProvider>
        <MyNavigationContainer />
      </PaperProvider>
    </Provider>
  );
}
