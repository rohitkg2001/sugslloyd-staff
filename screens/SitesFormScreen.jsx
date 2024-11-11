import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyPickerInput from "../components/input/MyPickerInput";
import MyButton from "../components/buttons/MyButton";

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

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 18,
        }}
      >
        <MyHeader title="Sites Details" hasIcon icon="ellipsis-vertical" />

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
          title="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter Location"
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
          title="Contact No."
          value={contactNo}
          onChangeText={setContactNo}
          placeholder="Enter Contact No."
          keyboardType="numeric"
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

export default SitesFormScreen;
