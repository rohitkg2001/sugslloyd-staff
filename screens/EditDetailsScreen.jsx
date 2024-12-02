import { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";

const EditDetailsScreen = ({ route, navigation, onSave }) => {
  const { site, formType } = route.params || {};
  const [formData, setFormData] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  useEffect(() => {
    if (site) {
      setFormData(site);
    } else {
      setFormData({
        location: "",
        projectname: formType === "project" ? "" : undefined,
        workOrderNumber: formType === "project" ? "" : undefined,
        rate: formType === "project" ? "" : undefined,
        date: formType === "project" ? "" : undefined,
        workOrderNumber: formType === "project" ? "" : undefined,
        contactNumber: formType === "vendor" ? "" : undefined,
        gstNumber: formType === "vendor" ? "" : undefined,
        contactPerson: formType === "vendor" ? "" : undefined,
        mailId: formType === "vendor" ? "" : undefined,
        dist: formType === "site" ? "" : undefined,
        projectSerialCode: formType === "site" ? "" : undefined,
        projectCapacity: formType === "site" ? "" : undefined,
        contactNo: formType === "site" ? "" : undefined,
        cANumber: formType === "site" ? "" : undefined,
        iCVendorName: formType === "site" ? "" : undefined,
        vendorName: formType === "site" ? "" : undefined,
        firstName : formType === "site"  ? "" : undefined,
        lastName : formType === "site" ? "" : undefined,
        contactPerson: formType === "site" ? "" : undefined,
        aadharNumber: formType === "site" ? "" : undefined,
        address: formType === "site" ? "" : undefined,
        accountNumber: formType === "site" ? "" : undefined,
        accountName: formType === "site" ? "" : undefined,
        bankName: formType === "site" ? "" : undefined,
        ifsc: formType === "site" ? "" : undefined,
        branch: formType === "site" ? "" : undefined,
        pan: formType === "site" ? "" : undefined,
        changePassword: formType === "site" ? "" : undefined,
        confirmchangePassword : formType === "site" ? "" : undefined,
      });
    }
  }, [site, formType]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.location ||
      (formType === "vendor" && !formData.contactNumber)
    ) {
      alert("Please fill all required fields");
      return;
    }

    onSave(formData);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const headerTitle =
    formType === "project"
      ? "Edit Project"
      : formType === "vendor"
        ? "Edit Vendor"
        : "Edit Site";

  return (
    <ContainerComponent>
      <MyHeader title={headerTitle} isBack={true} hasIcon={true} />
      <ScrollView
        style={[spacing.mh2, { width: SCREEN_WIDTH - 16, paddingVertical: 6 }]}
        showsVerticalScrollIndicator={false}
      >
        {formType === "project" && (
          <>
            <MyTextInput
              title="Project Name"
              placeholder="Enter Project Name"
              value={formData.projectName}
              onChangeText={(text) => handleChange("project_name", text)}
            />

            <MyTextInput
              title="Work Order Number"
              placeholder="workOrderNumber"
              value={formData.workOrderNumber}
              onChangeText={(text) => handleChange("work_order_number", text)}
            />

            <MyTextInput
              title="Rate"
              placeholder=" rate"
              value={formData.rate}
              onChangeText={(text) => handleChange("rate", text)}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <MyTextInput
                title="Date"
                value={date.toLocaleDateString()}
                placeholder="Select Date"
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        )}

        {formType === "vendor" && (
          <>
            <MyTextInput
              title="Vendor Name"
              placeholder="Name"
              value={formData.vendorName}
              onChangeText={(text) => handleChange("vendorName", text)}
            />
            <MyTextInput
              title="First Name"
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleChange("firstName", text)}
            />
            <MyTextInput
              title="Last Name"
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
            />
            <MyTextInput
              title="Contact Person"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChangeText={(text) => handleChange("contactPerson", text)}
            />

            <MyTextInput
              title="Contact Number"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChangeText={(text) => handleChange("contactNo", text)}
              keyboardType="phone-pad"
            />
            <MyTextInput
              title="Aadhar Number"
              placeholder="Aadhar Number"
              value={formData.contactNumber}
              onChangeText={(text) => handleChange("contactNo", text)}
              keyboardType="phone-pad"
            />
            <MyTextInput
              title="Mail ID"
              placeholder="Mail ID"
              value={formData.maillId}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
            />
            <MyTextInput
              title="Address"
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => handleChange("address", text)}
            />
            <MyTextInput
              title="Account Name"
              placeholder="Account Name"
              value={formData.accountName}
              onChangeText={(text) => handleChange("accountName", text)}
            />
            <MyTextInput
              title="Account Number"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChangeText={(text) => handleChange("accountNumber", text)}
            />
            <MyTextInput
              title="IFSC"
              placeholder="IFSC code"
              value={formData.ifsc}
              onChangeText={(text) => handleChange("ifsc", text)}
            />
            <MyTextInput
              title="Branch"
              placeholder="Branch"
              value={formData.branch}
              onChangeText={(text) => handleChange("branch", text)}
            />
            <MyTextInput
              title="GST Number"
              placeholder="GST Number"
              value={formData.gstNumber}
              onChangeText={(text) => handleChange("gstNumber", text)}
            />
            <MyTextInput
              title="PAN Number"
              placeholder="PAN Number"
              value={formData.pan}
              onChangeText={(text) => handleChange("pan", text)}
            />
            <MyTextInput
              title="Change Password"
              placeholder="change password"
              value={formData.changePassword}
              onChangeText={(text) => handleChange("changePassword", text)}
            />
            <MyTextInput
              title="Confirm Change Password"
              placeholder="confirm changepassword"
              value={formData.confirmchangePassword}
              onChangeText={(text) =>
                handleChange("confirmchangePassword", text)
              }
            />
          </>
        )}

        {formType === "site" && (
          <>
            <MyTextInput
              title="State"
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => handleChange("state", text)}
            />
            <MyTextInput
              title="District"
              placeholder="District"
              value={formData.dist}
              onChangeText={(text) => handleChange("dist", text)}
            />
            <MyTextInput
              title="Project Serial Code"
              placeholder="Project Serial Code"
              value={formData.projectSerialCode}
              onChangeText={(text) => handleChange("projectSerialCode", text)}
            />
            <MyTextInput
              title="Project Capacity"
              placeholder="Project Capacity"
              value={formData.projectCapacity}
              onChangeText={(text) => handleChange("projectCapacity", text)}
            />
            <MyTextInput
              title="Contact No"
              placeholder="Contact No"
              value={formData.contactNo}
              onChangeText={(text) => handleChange("contactNo", text)}
              keyboardType="phone-pad"
            />
            <MyTextInput
              title="CA Number"
              placeholder="CA Number"
              value={formData.cANumber}
              onChangeText={(text) => handleChange("cANumber", text)}
            />
            <MyTextInput
              title="Vendor Name"
              placeholder="Vendor Name"
              value={formData.iCVendorName}
              onChangeText={(text) => handleChange("iCVendorName", text)}
            />
          </>
        )}

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
          <MyButton title="Save" onPress={handleSave} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default EditDetailsScreen;
