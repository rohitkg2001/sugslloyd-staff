// import React native
import React, { useState } from "react";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { P, H6 } from "../components/text";
import { typography, spacing, LIGHT } from "../styles";

const ProfileChangeScreen = ({ route, navigation }) => {
  const { profileImage, StaffName, contactNo, email, address } = route.params;

  const [StaffImage, setProfileImage] = useState(
    profileImage || "https://via.placeholder.com/150"
  );
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/renable.jpeg")}
        style={{
          width: "100%",
          height: 170,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        resizeMode="cover"
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </ImageBackground>
      <View
        style={[
          spacing.p5,
          spacing.br4,
          spacing.mh3,

          {
            alignItems: "center",
            backgroundColor: "#2C3E50",
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
            { color: "#ECF0F1" },
          ]}
        >
          {StaffName}
        </H6>
        <P style={[typography.font14, { color: "#BDC3C7" }]}>{email}</P>
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
          <Ionicons name="camera-outline" size={24} color="#fff" />
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
            elevation: 1,
          },
        ]}
      >
        {[
          { name: "person-outline", label: StaffName },
          { name: "call-outline", label: contactNo },
          { name: "home-outline", label: address },
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
            <Ionicons name={item.name} size={24} color="#555" />
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
