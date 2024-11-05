import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";

const FormScreen = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [projectSerial, setProjectSerial] = useState("");
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [sanctionLoad, setSanctionLoad] = useState("");
  const [projectCapacity, setProjectCapacity] = useState("");
  const [caNumber, setCaNumber] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [loadEnhancementStatus, setLoadEnhancementStatus] = useState("");
  const [surveyStatus, setSurveyStatus] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [solarMeterSerial, setSolarMeterSerial] = useState("");
  const [vendorName, setVendorName] = useState("");

  const handleCancel = () => {
    setState("");
    setCity("");
    setProjectSerial("");
    setSiteName("");
    setLocation("");
    setSanctionLoad("");
    setProjectCapacity("");
    setCaNumber("");
    setMeterNo("");
    setLoadEnhancementStatus("");
    setSurveyStatus("");
    setContactNo("");
    setSolarMeterSerial("");
    setVendorName("");
  };

  const handleCreate = () => {
    console.log("Creating Project with data:", {
      state,
      city,
      projectSerial,
      siteName,
      location,
      sanctionLoad,
      projectCapacity,
      caNumber,
      meterNo,
      loadEnhancementStatus,
      surveyStatus,
      contactNo,
      solarMeterSerial,
      vendorName,
    });
  };

  return (
    <ContainerComponent>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.mh1,
          width: SCREEN_WIDTH - 16,
        }}
      >
        <MyHeader
          title="Project Details"
          hasIcon={true}
          icon={"ellipsis-vertical"}
        />

        <Text style={styles.label}>State</Text>
        <RNPickerSelect
          onValueChange={(value) => setState(value)}
          items={[
            { label: "California", value: "CA" },
            { label: "Texas", value: "TX" },
            { label: "New York", value: "NY" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Select State", value: null }}
        />

        <Text style={styles.label}>City</Text>
        <RNPickerSelect
          onValueChange={(value) => setCity(value)}
          items={[
            { label: "Los Angeles", value: "LA" },
            { label: "Houston", value: "HOU" },
            { label: "New York City", value: "NYC" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Select City", value: null }}
        />

        <Text style={styles.label}>Project Serial Code</Text>
        <TextInput
          style={styles.input}
          value={projectSerial}
          onChangeText={setProjectSerial}
          placeholder="Enter Project Serial Code"
        />

        <Text style={styles.label}>Site Name</Text>
        <TextInput
          style={styles.input}
          value={siteName}
          onChangeText={setSiteName}
          placeholder="Enter Site Name"
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter Location"
        />

        <Text style={styles.label}>Sanction Load</Text>
        <TextInput
          style={styles.input}
          value={sanctionLoad}
          onChangeText={setSanctionLoad}
          placeholder="Enter Sanction Load"
        />

        <Text style={styles.label}>Project Capacity</Text>
        <TextInput
          style={styles.input}
          value={projectCapacity}
          onChangeText={setProjectCapacity}
          placeholder="Enter Project Capacity"
        />

        <Text style={styles.label}>CA Number</Text>
        <TextInput
          style={styles.input}
          value={caNumber}
          onChangeText={setCaNumber}
          placeholder="Enter CA Number"
        />

        <Text style={styles.label}>Meter No.</Text>
        <TextInput
          style={styles.input}
          value={meterNo}
          onChangeText={setMeterNo}
          placeholder="Enter Meter No."
        />

        <Text style={styles.label}>Load Enhancement Status</Text>
        <RNPickerSelect
          onValueChange={(value) => setLoadEnhancementStatus(value)}
          items={[
            { label: "Pending", value: "Pending" },
            { label: "Approved", value: "Approved" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Select Load Enhancement Status", value: null }}
        />

        <Text style={styles.label}>Survey Status</Text>
        <RNPickerSelect
          onValueChange={(value) => setSurveyStatus(value)}
          items={[
            { label: "Completed", value: "Completed" },
            { label: "Pending", value: "Pending" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Select Survey Status", value: null }}
        />

        <Text style={styles.label}>Contact No.</Text>
        <TextInput
          style={styles.input}
          value={contactNo}
          onChangeText={setContactNo}
          placeholder="Enter Contact No."
          keyboardType="numeric"
        />

        <Text style={styles.label}>Solar Meter Serial No.</Text>
        <TextInput
          style={styles.input}
          value={solarMeterSerial}
          onChangeText={setSolarMeterSerial}
          placeholder="Enter Solar Meter Serial No."
        />

        <Text style={styles.label}>I & C Vendor Name</Text>
        <TextInput
          style={styles.input}
          value={vendorName}
          onChangeText={setVendorName}
          placeholder="Enter I & C Vendor Name"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  createButton: {
    backgroundColor: "#76885B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#333",
    marginBottom: 15,
  },
  inputAndroid: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#333",
    marginBottom: 15,
  },
};

export default FormScreen;
