import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Modal, Portal, Card, Button } from "react-native-paper";
import { H6 } from "../components/text";

const VendorForm = ({ visible, onClose, onSave, initialData, formType }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        location: "",
        contactNumber: formType === "vendor" ? "" : undefined,
        dist: formType === "site" ? "" : undefined,
      });
    }
  }, [initialData, formType]);

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

    const updatedData = initialData
      ? { ...initialData, ...formData }
      : { id: Date.now(), ...formData };

    onSave(updatedData);
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Card style={styles.card}>
            <Card.Content>
              <H6>{initialData ? `Edit ${formType}` : `Add ${formType}`}</H6>
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
                  keyboardType="numeric"
                />
              )}
            </Card.Content>
            <Card.Actions style={styles.buttonContainer}>
              <Button onPress={handleSave}>Save</Button>
              <Button onPress={onClose}>Cancel</Button>
            </Card.Actions>
          </Card>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    justifyContent: "center",
  },
  card: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
});

export default VendorForm;
