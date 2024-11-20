import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";

const VendorFormScreen = () => {
  const [name, setName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [setAadharNumber] = useState("");
  const [address, setAddress] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, SetBranch] = useState("");
  const [setPan] = useState("");
  const [mailId, setMailId] = useState("");

  const handleCancel = () => {
    setName("");
    setGstNumber("");
    setContactPerson("");
    setContactNumber("");
    setMailId("");
    setName("");
    setAadharNumber("");
    setAddress("");
    setAccountName("");
    setAccountNumber("");
    setIfsc("");
    setBankName("");
    SetBranch("");
    setPan("");
  };

  const handleCreate = () => {
    console.log("Creating Vendor with data:", {
      gstNumber,
      contactPerson,
      contactNumber,
      mailId,
    });
  };

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
      >
        <MyHeader title="Create Vendor" hasIcon={true} isBack={true} />

        <MyTextInput
          title="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
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
          title="Aadhar Number"
          value={contactPerson}
          onChangeText={setAadharNumber}
          placeholder="Enter Aadhar Number"
        />

        <MyTextInput
          title="Mail ID"
          value={mailId}
          onChangeText={setMailId}
          placeholder="Enter Mail ID"
          keyboardType="email-address"
        />

        <MyTextInput
          title="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
        />

        <MyTextInput
          title="Account Name"
          value={accountName}
          onChangeText={setAccountName}
          placeholder="Enter Contact Person"
        />

        <MyTextInput
          title="Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="Enter Account Number"
        />

        <MyTextInput
          title="IFSC"
          value={ifsc}
          onChangeText={setIfsc}
          placeholder="Enter IFSC"
        />

        <MyTextInput
          title="Bank Name"
          value={bankName}
          onChangeText={setBankName}
          placeholder="Enter Bank Name"
        />

        <MyTextInput
          title="Branch"
          value={branch}
          onChangeText={SetBranch}
          placeholder="Enter Branch"
        />
        <MyTextInput
          title="GST Number"
          value={gstNumber}
          onChangeText={setGstNumber}
          placeholder="Enter GST Number"
        />

        <MyTextInput
          title="PAN Number"
          value={bankName}
          onChangeText={setPan}
          placeholder="Enter PAN Number"
        />
      </ScrollView>
      <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
        <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
        <MyButton title="Create" onPress={handleCreate} />
      </View>
    </ContainerComponent>
  );
};

export default VendorFormScreen;
