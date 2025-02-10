import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n";
import LanguageSelector from "../components/LanguageSelector";

export default function useLanguage() {
    const [isLanguageSelected, setIsLanguageSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        const fetchLanguage = async () => {
            console.log("Checking for default language")
            const storedLanguage = await AsyncStorage.getItem("appLanguage");
            if (storedLanguage) {
                console.log("No default language found")
                i18n.changeLanguage(storedLanguage);
                setLanguage(storedLanguage);
                setIsLanguageSelected(true);
            }
            setLoading(false)
        };
        fetchLanguage();
    }, []);

    const selectLanguage = async (lang) => {
        console.log("Set app language to ", lang)
        await AsyncStorage.setItem("appLanguage", lang);
        i18n.changeLanguage(lang);
        setLanguage(lang);
        setIsLanguageSelected(true);
    };

    return { language, isLanguageSelected, selectLanguage, loading };
}
