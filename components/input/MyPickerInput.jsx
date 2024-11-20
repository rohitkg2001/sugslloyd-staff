import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../../styles/components.styles";
import { H5 } from "../text";

export default function MyPickerInput({
  title,
  value,
  onChange,
  options = [],
}) {
  return (
    <View style={styles.textInput}>
      <H5>{title}</H5>
      <Picker
        selectedValue={value}
        style={styles.textInputField}
        mode="dropdown"
        onValueChange={(val) => onChange(val)}
        prompt="Select an option"
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
  );
}
