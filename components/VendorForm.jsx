import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Modal, Portal, Text, Card, Button } from "react-native-paper";
import { H6 } from "../components/text"; // Adjust the path as necessary

const VendorForm = ({ visible, onClose, onSave, initialData }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLocation(initialData.location);
      setContactNumber(initialData.contactNumber);
    } else {
      setName("");
      setLocation("");
      setContactNumber("");
    }
  }, [initialData]);

  const handleSave = () => {
    if (!name || !location || !contactNumber) {
      alert("Please fill all fields");
      return;
    }

    const updatedVendor = initialData
      ? { ...initialData, name, location, contactNumber }
      : { id: Date.now(), name, location, contactNumber };

    onSave(updatedVendor);
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
              <H6>{initialData ? "Edit Vendor" : "Add Vendor"}</H6>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
              />
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
              />
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
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    padding: 16,
    borderRadius: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
});

export default VendorForm;
