import { View, TextInput } from "react-native";
import { H5, Span } from "../text";
import { spacing, styles, SCREEN_WIDTH, typography } from "../../styles";
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
      <Span style={typography.fontLato}>{title}</Span>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[
          styles.textInputField,
          spacing.mv1,
          spacing.pl3,
          typography.fontLato,
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
