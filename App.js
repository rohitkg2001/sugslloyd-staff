import "react-native-gesture-handler"; //Don't ever remove this line
import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import MyNavigationContainer from "./navigation/MyNavigationContainer";
import { Provider } from "react-redux";
import store from "./store";
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

  if (!isLanguageSelected) {
    return <LanguageSelector onSelectLanguage={selectLanguage} />;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <MyNavigationContainer />
      </PaperProvider>
    </Provider>
  );
}
