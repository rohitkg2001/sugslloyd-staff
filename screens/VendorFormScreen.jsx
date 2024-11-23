import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch } from 'react-redux';
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import { updateVendor } from '../redux/actions/vendorAction';

const VendorFormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editVendor = route.params?.vendor;
  const [name, setName] = useState(editVendor?.name || "");
  const [gstNumber, setGstNumber] = useState(editVendor?.gstNumber || "");
  const [contactPerson, setContactPerson] = useState(editVendor?.contactPerson || "");
  const [contactNumber, setContactNumber] = useState(editVendor?.contactNumber || "");
  const [aadharNumber, setAadharNumber] = useState(editVendor?.aadharNumber || "");
  const [address, setAddress] = useState(editVendor?.address || "");
  const [accountName, setAccountName] = useState(editVendor?.accountName || "");
  const [accountNumber, setAccountNumber] = useState(editVendor?.accountNumber || "");
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
      mailId
    };
    dispatch(updateVendor(vendorData));
    navigation.goBack();
  };

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={[spacing.mh1, { width: SCREEN_WIDTH - 20 }]}
      >
        <MyHeader title={editVendor ? "Edit Vendor" : "Create Vendor"} hasIcon={true} isBack={true} />

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
          value={aadharNumber}
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
          placeholder="Enter Account Name"
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
          onChangeText={setBranch}
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
          value={pan}
          onChangeText={setPan}
          placeholder="Enter PAN Number"
        />
      </ScrollView>
      <View style={[styles.row, { width: SCREEN_WIDTH - 20 }]}>
        <MyButton title="Cancel" onPress={handleCancel} color="#DC4C64" />
        <MyButton title={editVendor ? "Save Changes" : "Create"} onPress={handleCreate} />
      </View>
    </ContainerComponent>
  );
};

export default VendorFormScreen;