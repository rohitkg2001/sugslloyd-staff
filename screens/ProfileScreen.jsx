import React, { useState } from "react";
import { View } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { staff } from "../utils/faker";
import { LIGHT, PRIMARY_COLOR, styles, spacing, typography } from "../styles";
import CardFullWidth from "../components/card/CardFullWidth";
import Avatar from "../components/Avatar";
import { H6 } from "../components/text";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("Document");

  return (
    <ContainerComponent>
      <MyHeader title="My Profile" isBack={true} hasIcon={true} />

      <CardFullWidth
        backgroundColor={PRIMARY_COLOR}
        style={{ padding: spacing.mh2 }}
      >
        <View
          style={[
            styles.row,
            {
              alignItems: "center",
              paddingVertical: spacing.mv2,
            },
          ]}
        >
          <Avatar
            avatar={staff.image}
            name={`${staff.first_name} ${staff.last_name}`}
            online={false}
          />

          <View style={{ flex: 1, marginLeft: spacing.mh1 }}>
            <H6 style={[typography.font12, { color: LIGHT }]}>
              {staff.first_name} {staff.last_name}
            </H6>
            <H6 style={[typography.font12, { color: LIGHT }]}>
              Email: {staff.email}
            </H6>
            <H6 style={[typography.font12, { color: LIGHT }]}>
              contact No: {staff.contactNo}
            </H6>
            <H6 style={[typography.font12, { color: LIGHT }]}>
              Address: {staff.address}
            </H6>
          </View>
        </View>
      </CardFullWidth>
    </ContainerComponent>
  );
};

export default ProfileScreen;
