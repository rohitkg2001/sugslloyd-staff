import React from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { H4 } from "../components/text";
import { SCREEN_WIDTH, spacing } from "../styles";
import MyHeader from "../components/header/MyHeader";

const NoRecord = () => {
  return (
    <ContainerComponent>
      <MyHeader title="Project Overview" isBack={true} hasIcon={true} />
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
        <H4>No records found</H4>
      </View>
    </ContainerComponent>
  );
};

export default NoRecord;
