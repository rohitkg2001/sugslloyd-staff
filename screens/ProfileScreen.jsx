import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { staff } from "../utils/faker";
import { LIGHT, PRIMARY_COLOR, styles, spacing, typography } from "../styles";
import CardFullWidth from "../components/card/CardFullWidth";
import Avatar from "../components/Avatar";
import { H6 } from "../components/text";
import { SCREEN_WIDTH } from "../styles";

// Reusable item component with action icons
const ProfileItem = ({ iconName, label }) => (
  <View
    style={[
      spacing.mv4,
      {
        width: SCREEN_WIDTH - 32,
      },
    ]}
  >
    {/* Left side icon and label */}
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon
        name={iconName}
        size={30}
        color={PRIMARY_COLOR}
        style={{ marginRight: spacing.mh2 }}
      />
      <H6 style={[typography.font16, { color: "black", flex: 1 }]}>{label}</H6>
    </View>

    {/* Right side action icons */}
    <View
      style={{ flexDirection: "row", alignItems: "center", marginLeft: "auto" }}
    >
      <TouchableOpacity style={{ marginHorizontal: spacing.mh1 }}>
        <Icon name="edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: spacing.mh1 }}>
        <Icon name="visibility" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: spacing.mh1 }}>
        <Icon name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const ProfileScreen = () => {
  return (
    <ContainerComponent>
      <MyHeader title="My Profile" isBack={true} hasIcon={true} />

      {/* Main Profile Card */}
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
              Contact No: {staff.contactNo}
            </H6>
            <H6 style={[typography.font12, { color: LIGHT }]}>
              Address: {staff.address}
            </H6>
          </View>
        </View>
      </CardFullWidth>

      <View style={{ padding: spacing.mh2, marginTop: spacing.mv5 }}>
        <View style={{ marginBottom: spacing.mv3 }}>
          <ProfileItem iconName="account-circle" label="Aadhar Card" />
        </View>

        <View style={{ marginBottom: spacing.mv3 }}>
          <ProfileItem iconName="credit-card" label="Pan Card" />
        </View>

        <View style={{ marginBottom: spacing.mv3 }}>
          <ProfileItem iconName="drive-eta" label="Driving License" />
        </View>
      </View>
    </ContainerComponent>
  );
};

export default ProfileScreen;
