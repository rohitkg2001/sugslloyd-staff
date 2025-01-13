import React, { useState } from "react";
import { ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { editVendor } from "../redux/actions/vendorAction";
import Button from "../components/buttons/Button";
import { H2 } from "../components/text";

const VendorFormScreen = () => {
  const [vendorName, setVendorName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setcontactNo] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [address, setAddress] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, SetBranch] = useState("");
  const [pan, setPan] = useState("");
  const [mailId, setMailId] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleCreate = async () => {
    const data = {
      email: email,
      name: name,
    };
    await dispatch(editVendor(data, id));
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("Edit Vendor")} hasIcon={true} isBack={true} />
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <MyTextInput
          title={t("vendor_form_name")}
          value={vendorName}
          onChangeText={setVendorName}
          placeholder="Enter VendorName"
        />
        <MyTextInput
          title={t("first_name")}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
        />
        <MyTextInput
          title={t("last_name")}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
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
          onChangeText={setcontactNo}
          placeholder="Enter Contact Number"
          keyboardType="numeric"
        />
        <MyTextInput
          title={t("vendor_address")}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
        />

        <MyTextInput
          title={t("vendor_aadhar_number")}
          onChangeText={setAadharNumber}
          placeholder="Enter Aadhar Number"
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
          title="Mail ID"
          value={mailId}
          onChangeText={setMailId}
          placeholder="Enter Mail ID"
          keyboardType="email-address"
        />
      </ScrollView>
      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          {
            justifyContent: "center",
          },
        ]}
        onPress={handleCreate}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          {t("Edit Vendor")}
        </H2>
      </Button>
    </ContainerComponent>
  );
};

export default VendorFormScreen;
