import { View, TextInput } from "react-native";
import { H5 } from "../text";
import { spacing, styles, SCREEN_WIDTH } from "../../styles";
import { PRIMARY_COLOR } from "../../styles/constant";

const MyTextInput = ({
  title,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  style, 
  ...props
}) => {
  return (
    <View style={spacing.mb2}>
      <H5>{title}</H5>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[
          styles.textInputField,
          spacing.mv1,
          spacing.pl3,
          { width: SCREEN_WIDTH - 20 }, 
          style, 
        ]}
        cursorColor={PRIMARY_COLOR}
        {...props}
      />
    </View>
  );
};

export default MyTextInput;
