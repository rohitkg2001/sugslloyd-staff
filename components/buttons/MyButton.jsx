import React from "react";
import { TouchableOpacity } from "react-native";
import { H5 } from "../text";
import { typography } from "../../styles";

const MyButton = ({ title, onPress, color = "#76885B" }) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: color,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignItems: "center",
          marginVertical: 8,
        },
      ]}
      onPress={onPress}
    >
      <H5 style={[typography.textLight]}>{title}</H5>
    </TouchableOpacity>
  );
};

export default MyButton;
