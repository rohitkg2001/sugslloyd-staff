import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { P } from "./text";
import { spacing, typography } from "../styles";
import { styles } from "../styles/components.styles";

// Updated Filter component
const Filter = ({ visible, onClose, options, optionTextStyle }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Background overlay - Close modal when clicked anywhere outside */}
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose} // Close modal when clicked outside
        activeOpacity={1}
      >
        {/* Modal Content */}
        <View style={styles.popupMenu}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (option.onPress) {
                  option.onPress(); // Execute option action
                }
                onClose(); // Close modal after selecting option
              }}
              style={styles.option}
            >
              <P style={[typography.textDark, spacing.p3, optionTextStyle]}>
                {option.label}
              </P>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Default props for better flexibility
Filter.defaultProps = {
  optionTextStyle: {},
};

export default Filter;
