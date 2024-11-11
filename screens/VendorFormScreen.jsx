import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";

const VendorFormScreen = () => {
  const [vendorName, setVendorName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [mailId, setMailId] = useState("");

  const handleCancel = () => {
    setVendorName("");
    setGstNumber("");
    setContactPerson("");
    setContactNumber("");
    setMailId("");
  };

  const handleCreate = () => {
    console.log("Creating Vendor with data:", {
      vendorName,
      gstNumber,
      contactPerson,
      contactNumber,
      mailId,
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
        <MyHeader title="Vendor Details" hasIcon icon="ellipsis-vertical" />

        <MyTextInput
          title="Vendor Name"
          value={vendorName}
          onChangeText={setVendorName}
          placeholder="Enter Vendor Name"
        />

        <MyTextInput
          title="GST Number"
          value={gstNumber}
          onChangeText={setGstNumber}
          placeholder="Enter GST Number"
        />

        <MyTextInput
          title="Contact Person"
          value={contactPerson}
          onChangeText={setContactPerson}
          placeholder="Enter Contact Person"
        />

        <MyTextInput
          title="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter Contact Number"
          keyboardType="numeric"
        />

        <MyTextInput
          title="Mail ID"
          value={mailId}
          onChangeText={setMailId}
          placeholder="Enter Mail ID"
          keyboardType="email-address"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
          <MyButton title="Create" onPress={handleCreate} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default VendorFormScreen;
