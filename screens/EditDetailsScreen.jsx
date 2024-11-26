import { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";
import MyHeader from "../components/header/MyHeader";

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
    <ScrollView
      style={[spacing.mh2, { width: SCREEN_WIDTH - 16, paddingVertical: 6 }]}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <MyHeader title={headerTitle} isBack={true} hasIcon={true} />

        {formType === "project" && (
          <>
            <MyTextInput
              title="Project Name"
              placeholder="Enter Project Name"
              value={formData.projectName}
              onChangeText={(text) => handleChange("projectName", text)}
            />

            <MyTextInput
              title="Work Order Number"
              placeholder="workOrderNumber"
              value={formData.workOrderNumber}
              onChangeText={(text) => handleChange("workOrderNumber", text)}
            />

            <MyTextInput
              title="Rate"
              placeholder=" rate"
              value={formData.rate}
              onChangeText={(text) => handleChange(" rate", text)}
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
              title="Contact Number"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChangeText={(text) => handleChange("contactNumber", text)}
              keyboardType="phone-pad"
            />
            <MyTextInput
              title="GST Number"
              placeholder="GST Number"
              value={formData.gstNumber}
              onChangeText={(text) => handleChange("gstNumber", text)}
            />
            <MyTextInput
              title="Contact Person"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChangeText={(text) => handleChange("contactPerson", text)}
            />
            <MyTextInput
              title="Mail ID"
              placeholder="Mail ID"
              value={formData.mailId}
              onChangeText={(text) => handleChange("mailId", text)}
              keyboardType="email-address"
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
      </View>
    </ScrollView>
  );
};

export default EditDetailsScreen;
