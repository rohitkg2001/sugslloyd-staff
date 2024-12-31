import React from "react";
import { TouchableOpacity, View } from "react-native";
import { H6 } from "./text";
import { typography, spacing } from "../styles";

const CustomModalContent = ({
  clickedText,
  handleTextClick,
  toggleVendorSelection,
}) => {
  return (
    <View
      style={{
        width: "60%",
        padding: 20,
        backgroundColor: "#F0FAF0",
        borderRadius: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => handleTextClick("toggleVendorSelection")}
      >
        <H6
          style={[
            typography.font20,
            spacing.pv1,
            {
              backgroundColor:
                clickedText === "assignVendor" ? "#D3F9D8" : "transparent",
              color: clickedText === "assignVendor" ? "#006400" : "black",
            },
          ]}
        >
          Assign To Vendor
        </H6>
        <H6>{".........................................."}</H6>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTextClick("accept")}>
        <H6
          style={[
            typography.font20,
            spacing.pv2,
            {
              backgroundColor:
                clickedText === "accept" ? "#D3F9D8" : "transparent",
            },
          ]}
        >
          Accept
        </H6>
        <H6>{".........................................."}</H6>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTextClick("reject")}>
        <H6
          style={[
            typography.font20,
            spacing.pv2,
            {
              backgroundColor:
                clickedText === "reject" ? "#D3F9D8" : "transparent",
            },
          ]}
        >
          Reject
        </H6>
        <H6>{".........................................."}</H6>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTextClick("submit")}>
        <H6
          style={[
            typography.font20,
            spacing.pv2,
            {
              backgroundColor:
                clickedText === "submit" ? "#D3F9D8" : "transparent",
            },
          ]}
        >
          Submit
        </H6>
      </TouchableOpacity>
    </View>
  );
};

export default CustomModalContent;
