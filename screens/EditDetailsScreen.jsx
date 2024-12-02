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
              title="Contact Number"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChangeText={(text) => handleChange("contact_no", text)}
              keyboardType="phone-pad"
            />
            <MyTextInput
              title="GST Number"
              placeholder="GST Number"
              value={formData.gstNumber}
              onChangeText={(text) => handleChange("gst_number", text)}
            />
            <MyTextInput
              title="Contact Person"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChangeText={(text) => handleChange("contact_person", text)}
            />
            <MyTextInput
              title="Mail ID"
              placeholder="Mail ID"
              value={formData.mailId}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
            />
          </>
        )}

        {formType === "site" && (
          <>
            <MyTextInput
              title="IC Vendor Name"
              placeholder="IC Vendor Name"
              value={formData.icVendorName}
              onChangeText={(text) => handleChange("ic_vendor_name", text)}
            />
            <MyTextInput
              title="Section Load"
              placeholder="Section Load"
              value={formData.sectionLoad}
              onChangeText={(text) => handleChange("section_load", text)}
            />
            <MyTextInput
              title="Meter Number"
              placeholder="Meter Number"
              value={formData.meterName}
              onChangeText={(text) => handleChange("meter_number", text)}
            />
            <MyTextInput
              title="Load Enhancement Status"
              placeholder="Load Enhancement Status"
              value={formData.loadEnhancementStatus}
              onChangeText={(text) =>
                handleChange("load_enhancement_status", text)
              }
            />
            <MyTextInput
              title="Site Survey Status"
              placeholder="Site Survey Status"
              value={formData.siteSurvey}
              onChangeText={(text) => handleChange("site_survey_status", text)}
            />
            <MyTextInput
              title="Status"
              placeholder="Status"
              value={formData.status}
              onChangeText={(text) => handleChange("status", text)}
            />
            <MyTextInput
              title="Net Meter SR No"
              placeholder="Net Meter SR No"
              value={formData.netMeterSrNo}
              onChangeText={(text) => handleChange("net_meter_sr_no", text)}
            />
            <MyTextInput
              title="Solar Meter SR No"
              placeholder="Solar Meter SR No"
              value={formData.solarMeterSrNo}
              onChangeText={(text) => handleChange("solar_meter_sr_no", text)}
            />
            <MyTextInput
              title="Materiel Inspection Date"
              placeholder="Materiel Inspection Date"
              value={formData.materialInspectionDate}
              onChangeText={(text) =>
                handleChange("materiel_inspection_date", text)
              }
            />
            <MyTextInput
              title="SPP Installation Date"
              placeholder="SPP Installation Date"
              value={formData.sppInstallationDate}
              onChangeText={(text) => handleChange("spp_installation_date", text)}
            />
            <MyTextInput
              title="Commissioning Date"
              placeholder="Commissioning Date"
              value={formData.commissioningDate}
              onChangeText={(text) => handleChange("commissioning_date", text)}
            />
            <MyTextInput
              title="Remarks"
              placeholder="Remarks"
              value={formData.remarks}
              onChangeText={(text) => handleChange("remarks", text)}
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
