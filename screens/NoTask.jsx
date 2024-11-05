import React from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { H4 } from "../components/text";
import { SCREEN_WIDTH, spacing } from "../styles";

const NoTask = () => {
  return (
    <ContainerComponent>
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
        <H4>No tasks available</H4>
      </View>
    </ContainerComponent>
  );
};

export default NoTask;
