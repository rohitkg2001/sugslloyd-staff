import React, { useState, useEffect } from "react";
import { ScrollView, View, styles } from "react-native";
import { H6 } from "../components/text";
import { SCREEN_WIDTH, spacing } from "../styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import MyTextInput from "../components/input/MyTextInput";
import MyButton from "../components/buttons/MyButton";

const EditDetailsScreen = ({ onSave }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { site, formType } = route.params;

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (site) {
      setFormData(site);
    } else {
      setFormData({
        name: "",
        location: "",
        state: formType === "project" ? "" : undefined,
        city: formType === "project" ? "" : undefined,
        projectSerial: formType === "project" ? "" : undefined,
        siteName: formType === "project" ? "" : undefined,
        sanctionLoad: formType === "project" ? "" : undefined,
        projectCapacity: formType === "project" ? "" : undefined,
        caNumber: formType === "project" ? "" : undefined,
        surveyStatus: formType === "project" ? "" : undefined,
        contactNo: formType === "project" ? "" : undefined,
        solarMeterSerial: formType === "project" ? "" : undefined,
        vendorName: formType === "project" ? "" : undefined,
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

  return (
    <ScrollView
      style={[spacing.mh2, { width: SCREEN_WIDTH - 16, paddingVertical: 6 }]}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <H6>{site ? `Edit ${formType}` : `Add ${formType}`}</H6>

        <MyTextInput
          title="Name"
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <MyTextInput
          title="Location"
          placeholder="Location"
          value={formData.location}
          onChangeText={(text) => handleChange("location", text)}
        />

        {formType === "project" && (
          <>
            <MyTextInput
              title="State"
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => handleChange("state", text)}
            />
            <MyTextInput
              title="City"
              placeholder="City"
              value={formData.city}
              onChangeText={(text) => handleChange("city", text)}
            />
            <MyTextInput
              title="Project Serial"
              placeholder="Project Serial"
              value={formData.projectSerial}
              onChangeText={(text) => handleChange("projectSerial", text)}
            />
            <MyTextInput
              title="Site Name"
              placeholder="Site Name"
              value={formData.siteName}
              onChangeText={(text) => handleChange("siteName", text)}
            />
            <MyTextInput
              title="Sanction Load"
              placeholder="Sanction Load"
              value={formData.sanctionLoad}
              onChangeText={(text) => handleChange("sanctionLoad", text)}
            />
            <MyTextInput
              title="Project Capacity"
              placeholder="Project Capacity"
              value={formData.projectCapacity}
              onChangeText={(text) => handleChange("projectCapacity", text)}
            />
            <MyTextInput
              title="CA Number"
              placeholder="CA Number"
              value={formData.caNumber}
              onChangeText={(text) => handleChange("caNumber", text)}
            />
            <MyTextInput
              title="Survey Status"
              placeholder="Survey Status"
              value={formData.surveyStatus}
              onChangeText={(text) => handleChange("surveyStatus", text)}
            />
            <MyTextInput
              title="Contact No"
              placeholder="Contact No"
              value={formData.contactNo}
              onChangeText={(text) => handleChange("contactNo", text)}
              keyboardType="phone-pad"
            />
            <MyTextInput
              title="Solar Meter Serial"
              placeholder="Solar Meter Serial"
              value={formData.solarMeterSerial}
              onChangeText={(text) => handleChange("solarMeterSerial", text)}
            />
            <MyTextInput
              title="Vendor Name"
              placeholder="Vendor Name"
              value={formData.vendorName}
              onChangeText={(text) => handleChange("vendorName", text)}
            />
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
          <MyButton title=" Save" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditDetailsScreen;
