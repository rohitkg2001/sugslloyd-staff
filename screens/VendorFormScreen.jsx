import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import { useTranslation } from "react-i18next";


const VendorFormScreen = () => {
  const [name, setName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [address, setAddress] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, SetBranch] = useState("");
  const [pan, setPan] = useState("");
  const [ mailId, setMailId ] = useState( "" );
   const { t } = useTranslation();

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
        <MyHeader title={t("total_vendors")} hasIcon={true} isBack={true} />

        <MyTextInput
          title={t("name")}
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
        />

        <MyTextInput
          title={t("contact_person_name")}
          value={contactPerson}
          onChangeText={setContactPerson}
          placeholder="Enter Contact Person"
        />

        <MyTextInput
          title={t("site_ContactNo")}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter Contact Number"
          keyboardType="numeric"
        />

        <MyTextInput
          title={t("vendor_aadhar_number")}
          value={contactPerson}
          onChangeText={setAadharNumber}
          placeholder="Enter Aadhar Number"
        />

        <MyTextInput
          title="Mail ID"
          value={t("vendor_mail_id")}
          onChangeText={setMailId}
          placeholder="Enter Mail ID"
          keyboardType="email-address"
        />

        <MyTextInput
          title={t("vendor_address")}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
        />

        <MyTextInput
          title={t("vendor_account_name")}
          value={accountName}
          onChangeText={setAccountName}
          placeholder="Enter Contact Person"
        />

        <MyTextInput
          title={t("vendor_account_number")}
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="Enter Account Number"
        />

        <MyTextInput
          title={t("ifsc")}
          value={ifsc}
          onChangeText={setIfsc}
          placeholder="Enter IFSC"
        />

        <MyTextInput
          title={t("bank_name")}
          value={bankName}
          onChangeText={setBankName}
          placeholder="Enter Bank Name"
        />

        <MyTextInput
          title={t("branch")}
          value={branch}
          onChangeText={SetBranch}
          placeholder="Enter Branch"
        />
        <MyTextInput
          title={t("gst_number")}
          value={gstNumber}
          onChangeText={setGstNumber}
          placeholder="Enter GST Number"
        />

        <MyTextInput
          title={t("pan_number")}
          value={bankName}
          onChangeText={setPan}
          placeholder="Enter PAN Number"
        />
      </ScrollView>
      <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
        <MyButton title={t("cancel")} onPress={handleCancel} color="#DC4C64" />
        <MyButton title={t("create")} onPress={handleCreate} />
      </View>
    </ContainerComponent>
  );
};

export default VendorFormScreen;
