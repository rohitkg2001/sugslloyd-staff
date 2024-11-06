import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import MyButton from "../components/buttons/MyButton";

const FormScreen = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [projectSerial, setProjectSerial] = useState("");
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [sanctionLoad, setSanctionLoad] = useState("");
  const [projectCapacity, setProjectCapacity] = useState("");
  const [caNumber, setCaNumber] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [loadEnhancementStatus, setLoadEnhancementStatus] = useState("");
  const [surveyStatus, setSurveyStatus] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [solarMeterSerial, setSolarMeterSerial] = useState("");
  const [vendorName, setVendorName] = useState("");

  const handleCancel = () => {
    setState("");
    setCity("");
    setProjectSerial("");
    setSiteName("");
    setLocation("");
    setSanctionLoad("");
    setProjectCapacity("");
    setCaNumber("");
    setMeterNo("");
    setLoadEnhancementStatus("");
    setSurveyStatus("");
    setContactNo("");
    setSolarMeterSerial("");
    setVendorName("");
  };

  const handleCreate = () => {
    console.log("Creating Project with data:", {
      state,
      city,
      projectSerial,
      siteName,
      location,
      sanctionLoad,
      projectCapacity,
      caNumber,
      meterNo,
      loadEnhancementStatus,
      surveyStatus,
      contactNo,
      solarMeterSerial,
      vendorName,
    });
  };

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
      >
        <MyHeader title="Project Details" hasIcon icon="ellipsis-vertical" />

        <MyPickerInput
          title="State"
          value={state}
          onChange={setState}
          options={[
            { label: "Andhra Pradesh", value: "CA" },
            { label: "Bihar", value: "TX" },
            { label: "Chattishgarh", value: "NY" },
          ]}
        />

        <MyPickerInput
          title="City"
          value={city}
          onChange={setCity}
          options={[
            { label: "Patna", value: "LA" },
            { label: "Purniea", value: "HOU" },
            { label: "Gaya", value: "NYC" },
          ]}
        />

        <MyTextInput
          title="Project Serial Code"
          value={projectSerial}
          onChangeText={setProjectSerial}
          placeholder="Enter Project Serial Code"
        />
        <MyTextInput
          title="Site Name"
          value={siteName}
          onChangeText={setSiteName}
          placeholder="Enter Site Name"
        />
        <MyTextInput
          title="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter Location"
        />
        <MyTextInput
          title="Sanction Load"
          value={sanctionLoad}
          onChangeText={setSanctionLoad}
          placeholder="Enter Sanction Load"
        />
        <MyTextInput
          title="Project Capacity"
          value={projectCapacity}
          onChangeText={setProjectCapacity}
          placeholder="Enter Project Capacity"
        />
        <MyTextInput
          title="CA Number"
          value={caNumber}
          onChangeText={setCaNumber}
          placeholder="Enter CA Number"
        />
        <MyTextInput
          title="Meter No."
          value={meterNo}
          onChangeText={setMeterNo}
          placeholder="Enter Meter No."
        />

        <MyPickerInput
          title="Load Enhancement Status"
          value={loadEnhancementStatus}
          onChange={setLoadEnhancementStatus}
          options={[
            { label: "Pending", value: "Pending" },
            { label: "Approved", value: "Approved" },
          ]}
        />

        <MyPickerInput
          title="Survey Status"
          value={surveyStatus}
          onChange={setSurveyStatus}
          options={[
            { label: "Completed", value: "Completed" },
            { label: "Pending", value: "Pending" },
          ]}
        />

        <MyTextInput
          title="Contact No."
          value={contactNo}
          onChangeText={setContactNo}
          placeholder="Enter Contact No."
          keyboardType="numeric"
        />
        <MyTextInput
          title="Solar Meter Serial No."
          value={solarMeterSerial}
          onChangeText={setSolarMeterSerial}
          placeholder="Enter Solar Meter Serial No."
        />
        <MyTextInput
          title="I & C Vendor Name"
          value={vendorName}
          onChangeText={setVendorName}
          placeholder="Enter I & C Vendor Name"
        />

        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 16,
            },
          ]}
        >
          <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
          <MyButton title="Create" onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default FormScreen;
