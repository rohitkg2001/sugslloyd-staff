import React from 'react';
import { View, Text, Modal, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ViewDetailsModal = ({
  isVisible,
  onClose,
  onConfirm,
  newDispatch,
  handleDispatchDetailsChange,
}) => {
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
          {["Product Name", "Quantity", "Dispatch Date", "Delivery Date", "Approved By"].map(field => (
            <TextInput
              key={field}
              style={styles.input}
              placeholder={field}
              value={newDispatch[field.toLowerCase().replace(/ /g, "")]}
              onChangeText={(text) => handleDispatchDetailsChange(field.toLowerCase().replace(/ /g, ""), text)}
              keyboardType={field === "Quantity" ? "numeric" : "default"}
            />
          ))}
          <View style={styles.modalButtons}>
            <Button mode="contained" onPress={onConfirm}>Confirm</Button>
            <Button mode="outlined" onPress={onClose}>Cancel</Button>
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
});

export default ViewDetailsModal;

