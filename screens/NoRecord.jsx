import React from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { H4, P } from "../components/text";
import { SCREEN_WIDTH, spacing, typography } from "../styles";
import MyHeader from "../components/header/MyHeader";

const NoRecord = ({ msg }) => {
  return (
    <View
      style={[
        spacing.mh3,
        {
          alignItems: "center",
          width: SCREEN_WIDTH - 16,
          paddingVertical: 10,
        },
      ]}
    >
      <P style={{ textAlign: "center" }}>{msg}</P>
    </View>
  );
};

export default NoRecord;
