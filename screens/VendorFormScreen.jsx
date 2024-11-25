import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import { updateVendor } from "../redux/actions/vendorAction";

const VendorFormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editVendor = route.params?.vendor;
  const [name, setName] = useState(editVendor?.name || "");
  const [gstNumber, setGstNumber] = useState(editVendor?.gstNumber || "");
  const [contactPerson, setContactPerson] = useState(
    editVendor?.contactPerson || ""
  );
  const [contactNumber, setContactNumber] = useState(
    editVendor?.contactNumber || ""
  );
  const [aadharNumber, setAadharNumber] = useState(
    editVendor?.aadharNumber || ""
  );
  const [address, setAddress] = useState(editVendor?.address || "");
  const [accountName, setAccountName] = useState(editVendor?.accountName || "");
  const [accountNumber, setAccountNumber] = useState(
    editVendor?.accountNumber || ""
  );
  const [ifsc, setIfsc] = useState(editVendor?.ifsc || "");
  const [bankName, setBankName] = useState(editVendor?.bankName || "");
  const [branch, setBranch] = useState(editVendor?.branch || "");
  const [pan, setPan] = useState(editVendor?.pan || "");
  const [mailId, setMailId] = useState(editVendor?.mailId || "");

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleCreate = () => {
    const vendorData = {
      id: editVendor?.id || Date.now().toString(),
      name,
      gstNumber,
      contactPerson,
      contactNumber,
      aadharNumber,
      address,
      accountName,
      accountNumber,
      ifsc,
      bankName,
      branch,
      pan,
      mailId,
    };
    dispatch(updateVendor(vendorData));
    navigation.goBack();
  };
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
      >
        <MyHeader
          title={editVendor ? "Edit Vendor" : "Create Vendor"}
          hasIcon={true}
          isBack={true}
        />

        <MyTextInput
          title={t("vendor_form_name")}
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
          title={t("vendor_contact_number")}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter Contact Number"
          keyboardType="numeric"
        />

        <MyTextInput
          title="Aadhar Number"
          value={aadharNumber}
          onChangeText={setAadharNumber}
          placeholder="Enter Aadhar Number"
        />

        <MyTextInput
          title={t("vendor_mail_id")}
          value={mailId}
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
          placeholder="Enter Account Name"
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
          onChangeText={setBranch}
          placeholder="Enter Branch"
        />

        <MyTextInput
          title={t("gst_number")}
          value={gstNumber}
          onChangeText={setGstNumber}
          placeholder="Enter GST Number"
        />

        <MyTextInput
          title="PAN Number"
          value={pan}
          onChangeText={setPan}
          placeholder="Enter PAN Number"
        />
      </ScrollView>
      <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
        <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
        <MyButton
          title={editVendor ? "Save Changes" : "Create"}
          onPress={handleCreate}
        />
      </View>
    </ContainerComponent>
  );
};

export default VendorFormScreen;
