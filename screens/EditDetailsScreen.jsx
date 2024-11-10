import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import { H6 } from "../components/text";
import { SCREEN_WIDTH, spacing } from "../styles";
import { useRoute, useNavigation } from "@react-navigation/native";

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
        contactNumber: formType === "vendor" ? "" : undefined,
        dist: formType === "site" ? "" : undefined,
        sanctionLoad: "", // New field
        projectCapacity: "", // New field
        contactNo: "", // New field
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
      alert("Please fill all fields");
      return;
    }

    onSave(formData);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[
        spacing.mh2,
        {
          width: SCREEN_WIDTH - 16,
          paddingVertical: 10,
        },
      ]}
    >
      <View style={styles.container}>
        <H6>{site ? `Edit ${formType}` : `Add ${formType}`}</H6>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={formData.location}
          onChangeText={(text) => handleChange("location", text)}
        />
        {formType === "vendor" ? (
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChangeText={(text) => handleChange("contactNumber", text)}
            keyboardType="phone-pad"
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Distance"
            value={formData.dist}
            onChangeText={(text) => handleChange("dist", text)}
          />
        )}

        {/* New fields */}
        <TextInput
          style={styles.input}
          placeholder="Sanction Load"
          value={formData.sanctionLoad}
          onChangeText={(text) => handleChange("sanctionLoad", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Project Capacity"
          value={formData.projectCapacity}
          onChangeText={(text) => handleChange("projectCapacity", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact No"
          value={formData.contactNo}
          onChangeText={(text) => handleChange("contactNo", text)}
          keyboardType="phone-pad"
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={[styles.button, { backgroundColor: "#76885B" }]}
          >
            Save
          </Button>
          <Button mode="outlined" onPress={handleCancel} style={styles.button}>
            Cancel
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default EditDetailsScreen;
