import React from 'react';
import { View, Text, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { PRIMARY_COLOR_TRANSPARENT, PRIMARY_COLOR } from "../styles/constant";
import { inventoryData } from "../utils/faker"; // Adjust the import path based on your project structure

const ViewDetailsModal = ({
  isVisible,
  onClose,
  onConfirm,
  newDispatch,
  handleDispatchDetailsChange,
}) => {
  const validateAndConfirm = () => {
    const requiredFields = ["productName", "quantity", "dispatchDate", "deliveryDate", "approvedBy"];
    const emptyFields = requiredFields.filter(field => !newDispatch[field]);

    if (emptyFields.length > 0) {
      Alert.alert(
        "Validation Error",
        "Please fill in all the fields before confirming."
      );
      return;
    }
    onConfirm(); // Proceed if all fields are filled
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Dispatch Details</Text>

          {/* Product Name Picker */}
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Product Name</Text>
            <Picker
              selectedValue={newDispatch.productName || ""}
              onValueChange={(value) => handleDispatchDetailsChange("productName", value)}
              style={styles.picker}
            >
              <Picker.Item label="Select a product" value="" />
              {inventoryData.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.productName}
                  value={item.productName}
                />
              ))}
            </Picker>
          </View>

          {/* Other Inputs */}
          {[
            { label: "Quantity", key: "quantity" },
            { label: "Dispatch Date", key: "dispatchDate" },
            { label: "Delivery Date", key: "deliveryDate" },
            { label: "Approved By", key: "approvedBy" },
          ].map(({ label, key }) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={label}
              value={newDispatch[key] || ""}
              onChangeText={(text) => handleDispatchDetailsChange(key, text)}
              keyboardType={key === "quantity" ? "numeric" : "default"}
            />
          ))}

          {/* Buttons */}
          <View style={styles.modalButtons}>
            <Button
              mode="contained"
              onPress={validateAndConfirm}
              style={styles.confirmButton}
            >
              Confirm
            </Button>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 40,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#f9f9f9",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  cancelButton: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: PRIMARY_COLOR_TRANSPARENT,
  },
  confirmButton: {
    backgroundColor: PRIMARY_COLOR,
  },
});

export default ViewDetailsModal;
