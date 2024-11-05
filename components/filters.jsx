import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { P } from "./text";
import { spacing, typography } from "../styles";
import { styles } from "../styles/components.styles";
const Filter = ({ visible, onClose, options }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
        <View style={styles.popupMenu}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                option.onPress();
                onClose();
              }}
            >
              <P style={(typography.textDark, spacing.p3)}>{option.label}</P>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Filter;
