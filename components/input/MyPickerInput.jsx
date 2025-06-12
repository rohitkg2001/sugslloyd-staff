import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { H5, H6 } from "../text";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
  spacing,
  styles,
  typography,
} from "../../styles";

export default function MyPickerInput({
  title,
  value,
  onChange,
  options = [],
  enabled,
}) {
  return (
    <View>
      <H6 style={typography.fontLato}>{title}</H6>
      <View
        style={[
          spacing.ph1,
          {
            borderColor: PRIMARY_COLOR,
            backgroundColor: PRIMARY_COLOR_TRANSPARENT,
            borderWidth: 1,
            borderRadius: 6,
            position: "relative", // Ensures layout control
          },
        ]}
      >
        <Picker
          selectedValue={value}
          style={[styles.textInputField, { height: 60 }]}
          mode="dropdown"
          onValueChange={(val) => onChange(val)}
          prompt="Select an option"
          enabled={enabled}
          dropdownIconColor={PRIMARY_COLOR}
        >
          {options.map((option, index) => (
            <Picker.Item
              enabled={option.enabled}
              label={option.label}
              value={option.value}
              key={index}
              style={styles.textInputField}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
