import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";

const ProfileChangeScreen = ({ route, navigation }) => {
  const { profileImage, StaffName, contactNo } = route.params;

  const [StaffImage, setProfileImage] = useState(
    profileImage || "https://via.placeholder.com/150"
  );

  return (
    <ContainerComponent style={{ flex: 1, padding: 0, margin: 0 }}>
      <MyHeader title={"Profile"} isBack={true} hasIcon={true} />

      <View style={{ alignItems: "center", marginBottom: 20, width: "100%" }}>
        <Image
          source={{ uri: profileImage }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />
        {/* <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 0,
            right: 110,
            backgroundColor: "#76885B",
            borderRadius: 20,
            padding: 5,
          }}
        >
          <Icon name="photo-camera" size={20} color="#fff" />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("attendancePunch")}
          style={{
            position: "absolute",
            bottom: 0,
            right: 110,
            backgroundColor: "#76885B",
            borderRadius: 20,
            padding: 5,
          }}
        >
          <Icon name="photo-camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20, paddingHorizontal: 0, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          <Icon name="person" size={24} color="#555" />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 14, color: "#888" }}>Name</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {StaffName}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          <Icon name="phone" size={24} color="#555" />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 14, color: "#888" }}>Contact</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {contactNo}
            </Text>
          </View>
        </View>
      </View>
    </ContainerComponent>
  );
};

export default ProfileChangeScreen;
