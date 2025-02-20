import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles, typography } from "../styles";
import { H2 } from "../components/text";
import Button from "../components/buttons/Button";

const RideSelectionScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#264653",
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="car-sport-outline" size={40} color="#f4a261" />
          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Public transport
              </Text>
              <Ionicons
                name="person-outline"
                size={16}
                style={{ marginLeft: 5 }}
              />
              <Text
                style={{
                  backgroundColor: "#d8f3dc",
                  color: "#2d6a4f",
                  fontSize: 12,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginLeft: 8,
                }}
              >
                FASTEST
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: "#6c757d" }}>
              Quick Bike rides
            </Text>
            <Text style={{ fontSize: 14, color: "#6c757d" }}>
              5 mins away • Drop 3:54 pm
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>₹220</Text>
      </TouchableOpacity>

      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          { justifyContent: "center", top: 550 },
        ]}
        // onPress={onSubmit}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          {" Book"}
        </H2>
      </Button>
    </View>
  );
};

export default RideSelectionScreen;
