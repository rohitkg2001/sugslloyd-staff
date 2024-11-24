import "react-native-gesture-handler"; //Don't ever remove this line
import { useState, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import MyNavigationContainer from "./navigation/MyNavigationContainer";
import { Provider } from "react-redux";
import store from "./store";
import i18n from "./i18n";
import { View, Text, Button, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [language, setLanguage] = useState(null); // Stores the user's language
  const [isLanguageSelected, setIsLanguageSelected] = useState(false); // Tracks if the language has been set

  useEffect(() => {
    const fetchLanguage = async () => {
      await AsyncStorage.clear();
      const storedLanguage = await AsyncStorage.getItem("appLanguage");
      console.log(storedLanguage);
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage); // Set the language for i18n
        setLanguage(language);
        setIsLanguageSelected(true);
      } else {
        setIsLanguageSelected(false); // Prompt for language selection
      }
    };
    fetchLanguage();
    console.log(isLanguageSelected);
  }, [language]);

  const selectLanguage = async (lang) => {
    await AsyncStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang); // Change the app's language dynamically
    setLanguage(lang);
    setIsLanguageSelected(true);
  };

  if (!isLanguageSelected) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Please select your preferred language:
        </Text>
        <Button title="English" onPress={() => selectLanguage("en")} />
        <View style={{ height: 10 }} />
        <Button title="हिंदी" onPress={() => selectLanguage("hi")} />
      </View>
      // FIXME:Move to an immediate component and apply styles
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <MyNavigationContainer />
      </PaperProvider>
    </Provider>
  );
}
