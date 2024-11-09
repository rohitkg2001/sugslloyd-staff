// import React, { useState, useEffect } from "react";
// import {
//   TextInput,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Modal, Portal, Card, Button } from "react-native-paper";
// import { H6 } from "../components/text";

// const VendorForm = ({ visible, onClose, onSave, initialData }) => {
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [contactNumber, setContactNumber] = useState("");

//   useEffect(() => {
//     if (initialData) {
//       setName(initialData.name);
//       setLocation(initialData.location);
//       setContactNumber(initialData.contactNumber);
//     } else {
//       setName("");
//       setLocation("");
//       setContactNumber("");
//     }
//   }, [initialData]);

//   const handleSave = () => {
//     if (!name || !location || !contactNumber) {
//       alert("Please fill all fields");
//       return;
//     }

//     const updatedVendor = initialData
//       ? { ...initialData, name, location, contactNumber }
//       : { id: Date.now(), name, location, contactNumber };

//     onSave(updatedVendor);
//     onClose();
//   };

//   return (
//     <Portal>
//       <Modal
//         visible={visible}
//         onDismiss={onClose}
//         contentContainerStyle={styles.modalContainer}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//           <Card style={styles.card}>
//             <Card.Content>
//               <H6>{initialData ? "Edit Vendor" : "Add Vendor"}</H6>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Name"
//                 value={name}
//                 onChangeText={setName}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Location"
//                 value={location}
//                 onChangeText={setLocation}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Contact Number"
//                 value={contactNumber}
//                 onChangeText={setContactNumber}
//                 keyboardType="phone-pad"
//               />
//             </Card.Content>
//             <Card.Actions style={styles.buttonContainer}>
//               <Button onPress={handleSave}>Save</Button>
//               <Button onPress={onClose}>Cancel</Button>
//             </Card.Actions>
//           </Card>
//         </KeyboardAvoidingView>
//       </Modal>
//     </Portal>
//   );
// };

// const styles = StyleSheet.create({
// modalContainer: {
//   flex: 1,
//   justifyContent: "center",
//   padding: 16,
//   backgroundColor: "rgba(0,0,0,0.5)",
// },
// card: {
//   padding: 16,
//   borderRadius: 8,
// },
// input: {
//   borderBottomWidth: 1,
//   borderColor: "#ccc",
//   marginBottom: 12,
//   paddingVertical: 8,
//   paddingHorizontal: 4,
// },
// buttonContainer: {
//   justifyContent: "flex-end",
// },
// });

// export default VendorForm;

// VendorForm.js
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
