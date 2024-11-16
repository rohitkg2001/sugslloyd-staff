import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ContainerComponent from "./ContainerComponent";

const { width } = Dimensions.get("window");

const SuccessModal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <ContainerComponent>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.iconContainer}>
              <Icon name="check-circle" size={60} color="#1abc9c" />
            </View>

            <Text style={styles.modalTitle}>Leave Applied Successfully</Text>
            <Text style={styles.modalText}>
              Your Leave has been applied successfully
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 15,
    backgroundColor: "#e0f7fa",
    padding: 15,
    borderRadius: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2b87b0",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SuccessModal;
