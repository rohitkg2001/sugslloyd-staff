import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n";

export default function useLanguage() {
    const [language, setLanguage] = useState(null);
    const [isLanguageSelected, setIsLanguageSelected] = useState(false);

    useEffect(() => {
        const fetchLanguage = async () => {
            const storedLanguage = await AsyncStorage.getItem("appLanguage");
            if (storedLanguage) {
                setLanguage(storedLanguage);
                i18n.changeLanguage(storedLanguage);
                setIsLanguageSelected(true);
            }
        };
        fetchLanguage();
    }, []);

    const selectLanguage = async (lang) => {
        await AsyncStorage.setItem("appLanguage", lang);
        i18n.changeLanguage(lang);
        setLanguage(lang);
        setIsLanguageSelected(true);
    };

    return { language, isLanguageSelected, selectLanguage };
}
