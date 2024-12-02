import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { editVendor } from "../redux/actions/vendorAction";

const VendorFormScreen = ({ route }) => {
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
  const [ password, setPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );
  const { t } = useTranslation();
  const dispatch = useDispatch()


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
    setPan( "" );
    setPassword( "" );
    setConfirmPassword( "" );
  };

  const handleCreate = async () => {
    const data = {
      email: email,
      name: name,
    }
    await dispatch(editVendor(data, id))
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("create_vendor")} hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
        showsVerticalScrollIndicator={false}
      >
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
          value={pan}
          onChangeText={setPan}
          placeholder="Enter PAN Number"
        />
        <MyTextInput
          title={t("password")}
          value={password}
          onChangeText={setPassword}
          placeholder="Password for Vendor"
        />
        <MyTextInput
          title={t("confirm_password")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password for Vendor"
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
