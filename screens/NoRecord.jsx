import React from "react";
import { View, Image } from "react-native";
import { P } from "../components/text";
import { SCREEN_WIDTH, spacing } from "../styles";

const NoRecord = ({ msg }) => {
  return (
    <View
      style={[
        spacing.mh3,
        spacing.pv5,
        {
          alignItems: "center",
          width: SCREEN_WIDTH - 16,
        },
      ]}
    >
      <Image
        source={require("../assets/Error.png")}
        style={{ height: SCREEN_WIDTH / 2, width: SCREEN_WIDTH / 2 }}
        resizeMode="contain"
      />
      <P style={{ textAlign: "center" }}>{msg}</P>
    </View>
  );
};

export default NoRecord;
