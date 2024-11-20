import React from "react";
import { View } from "react-native";
import { Checkbox as PaperCheckbox } from "react-native-paper";

import { H5 } from "../text";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../styles/constant";

export default function CustomCheckbox({
  label,
  isChecked,
  onPress,
  ...textStyle
}) {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <PaperCheckbox
        status={isChecked ? "checked" : "unchecked"}
        color={isChecked ? PRIMARY_COLOR : SECONDARY_COLOR}
        onPress={onPress}
        rippleColor={PRIMARY_COLOR}
      />
      {label && <H5 style={{ fontWeight: "bold", ...textStyle }}>{label}</H5>}
    </View>
  );
}
