// import React, { useState } from "react";
// import { View } from "react-native";
// import ContainerComponent from "../components/ContainerComponent";
// import MyHeader from "../components/header/MyHeader";
// import { staff } from "../utils/faker";
// import { LIGHT, PRIMARY_COLOR, styles, spacing, typography } from "../styles";
// import CardFullWidth from "../components/card/CardFullWidth";
// import Avatar from "../components/Avatar";
// import { H6 } from "../components/text";

// const ProfileScreen = () => {
//   return (
//     <ContainerComponent>
//       <MyHeader title="My Profile" isBack={true} hasIcon={true} />

// <CardFullWidth
//   backgroundColor={PRIMARY_COLOR}
//   style={{ padding: spacing.mh2 }}
// >
//   <View
//     style={[
//       styles.row,
//       {
//         alignItems: "center",
//         paddingVertical: spacing.mv2,
//       },
//     ]}
//   >
//     <Avatar
//       avatar={staff.image}
//       name={`${staff.first_name} ${staff.last_name}`}
//       online={false}
//     />

//     <View style={{ flex: 1, marginLeft: spacing.mh1 }}>
//       <H6 style={[typography.font12, { color: LIGHT }]}>
//         {staff.first_name} {staff.last_name}
//       </H6>
//       <H6 style={[typography.font12, { color: LIGHT }]}>
//         Email: {staff.email}
//       </H6>
//       <H6 style={[typography.font12, { color: LIGHT }]}>
//         contact No: {staff.contactNo}
//       </H6>
//       <H6 style={[typography.font12, { color: LIGHT }]}>
//         Address: {staff.address}
//       </H6>
//     </View>
//   </View>
// </CardFullWidth>
//     </ContainerComponent>
//   );
// };

// export default ProfileScreen;

import React from "react";
import { View, Text, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { staff } from "../utils/faker";
import { LIGHT, PRIMARY_COLOR, styles, spacing, typography } from "../styles";
import CardFullWidth from "../components/card/CardFullWidth";
import Avatar from "../components/Avatar";
import { H6 } from "../components/text";

const thumbnails = {
  drivingLicense: "https://example.com/path/to/driving_license_icon.png",
  registration: "https://example.com/path/to/registration_icon.png",
  aadharCard: "https://example.com/path/to/aadhar_card_icon.png",
  panCard: "https://example.com/path/to/pan_card_icon.png",
};

const Item = ({ thumbnail, title, subtitle }) => (
  <View
    style={[styles.row, { alignItems: "center", paddingVertical: spacing.mv2 }]}
  >
    <Image
      source={{ uri: thumbnail }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: spacing.mh1,
      }}
    />
    <View style={{ flex: 1 }}>
      <H6 style={[typography.font16, { color: PRIMARY_COLOR }]}>{title}</H6>
      <Text style={[typography.font12, { color: "#666" }]}>{subtitle}</Text>
    </View>
  </View>
);

const ProfileScreen = () => {
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

      <View style={{ padding: spacing.mh2, marginTop: spacing.mv2 }}>
        <Item
          thumbnail={thumbnails.drivingLicense}
          title="Driving License"
          subtitle="Transport Department, Chhattisgarh"
        />
        <Item
          thumbnail={thumbnails.registration}
          title="Registration of Vehicles"
          subtitle="Transport Department, Chhattisgarh"
        />
        <Item
          thumbnail={thumbnails.aadharCard}
          title="Aadhar Card"
          subtitle="Government of India"
        />
        <Item
          thumbnail={thumbnails.panCard}
          title="Pan Card"
          subtitle="Income Tax Department, India"
        />
      </View>
    </ContainerComponent>
  );
};

export default ProfileScreen;
