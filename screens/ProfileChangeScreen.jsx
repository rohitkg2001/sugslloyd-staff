// import React native
import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { P, H6, H4 } from "../components/text";
import { typography, spacing, LIGHT } from "../styles";

const ProfileChangeScreen = ({ route, navigation }) => {
  const { profileImage, StaffName, contactNo, email, address } = route.params;

  const [StaffImage, setProfileImage] = useState(
    profileImage || "https://via.placeholder.com/150"
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={[spacing.p5, { backgroundColor: "#000", paddingTop: 50 }]}>
        <H4
          style={[
            typography.font18,
            typography.fontLato,
            typography.textBold,
            { color: LIGHT },
          ]}
        >
          Profile
        </H4>
      </View>
      <View
        style={[
          spacing.p5,
          spacing.br4,
          spacing.mh3,

          {
            alignItems: "center",
            backgroundColor: LIGHT,
            marginTop: -20,
            elevation: 3,
          },
        ]}
      >
        <Image
          source={{ uri: profileImage }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "#4CAF50",
          }}
        />
        <H6
          style={[
            typography.font18,
            typography.fontLato,
            typography.textBold,
            spacing.mt2,
          ]}
        >
          {StaffName}
        </H6>
        <P style={[typography.font14, { color: "gray" }]}>{email}</P>
        <TouchableOpacity
          onPress={() => navigation.navigate("attendancePunch")}
          style={[
            spacing.p2,
            spacing.br4,
            {
              position: "absolute",
              bottom: 10,
              right: 20,
              backgroundColor: "#76885B",
            },
          ]}
        >
          <Icon name="photo-camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      ;
      <View
        style={[
          spacing.mt4,
          spacing.br2,
          spacing.mh3,
          spacing.pv2,
          {
            backgroundColor: LIGHT,
            elevation: 3,
          },
        ]}
      >
        {[
          { name: "person", label: StaffName },
          { name: "phone", label: contactNo },
          { name: "home", label: address },
          // { name: "star", label: "Review" },
          { name: "info", label: "Info" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              spacing.pv3,
              spacing.ph5,
              {
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: index !== 4 ? 1 : 0,
                borderBottomColor: "#ddd",
              },
            ]}
          >
            <Icon name={item.name} size={24} color="#555" />
            <H6
              style={[typography.font16, spacing.ml3, typography.fontLato, {}]}
            >
              {item.label}
            </H6>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProfileChangeScreen;
