import { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import MyButton from "../components/buttons/MyButton";
import { useTranslation } from "react-i18next";

const SitesFormScreen = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [projectSerial, setProjectSerial] = useState("");
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [projectCapacity, setProjectCapacity] = useState("");
  const [caNumber, setCaNumber] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [vendorName, setVendorName] = useState("");

  const handleCancel = () => {
    setState("");
    setCity("");
    setLocation("");
    setProjectSerial("");
    setSiteName("");
    setProjectCapacity("");
    setCaNumber("");
    setContactNo("");
    setVendorName("");
  };

  const handleCreate = () => {
    console.log("Creating Project with data:", {
      state,
      city,
      projectSerial,
      siteName,
      location,
      projectCapacity,
      caNumber,
      contactNo,
      vendorName,
    });
  };

  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 18 }]}
      >
        <MyHeader title={t('create_site')} hasIcon />

        <MyPickerInput
          title={t("site_State")}
          value={state}
          onChange={setState}
          options={[
            { label: "Andhra Pradesh", value: "CA" },
            { label: "Bihar", value: "TX" },
            { label: "Chattishgarh", value: "NY" },
          ]}
        />

        <MyPickerInput
          title={t("site_city")}
          value={city}
          onChange={setCity}
          options={[
            { label: "Patna", value: "LA" },
            { label: "Purniea", value: "HOU" },
            { label: "Gaya", value: "NYC" },
          ]}
        />
        <MyTextInput
          title={t("site_location")}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter Location"
        />
        <MyTextInput
          title={t("site_Projectcode")}
          value={projectSerial}
          onChangeText={setProjectSerial}
          placeholder="Enter Project Serial Code"
        />
        <MyTextInput
          title={t("site_name")}
          value={siteName}
          onChangeText={setSiteName}
          placeholder="Enter Site Name"
        />

        <MyTextInput
          title={t("site_projectcapacity")}
          value={projectCapacity}
          onChangeText={setProjectCapacity}
          placeholder="Enter Project Capacity"
        />
        <MyTextInput
          title={t("site_canumber")}
          value={caNumber}
          onChangeText={setCaNumber}
          placeholder="Enter CA Number"
        />
        <MyTextInput
          title={t("site_ContactNo")}
          value={contactNo}
          onChangeText={setContactNo}
          placeholder="Enter Contact No."
          keyboardType="numeric"
        />
        <MyTextInput
          title={t("site_I&CVendorName")}
          value={vendorName}
          onChangeText={setVendorName}
          placeholder="Enter I & C Vendor Name"
        />

        <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
          <MyButton
            title={t("cancel")}
            onPress={handleCancel}
            color="#DC4C64"
          />
          <MyButton title={t("create")} onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default SitesFormScreen;
