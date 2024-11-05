import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/components.styles"; // Ensure this contains your base styles
import { SCREEN_WIDTH } from "../../styles/constant";

export default function SearchBar({ placeholder, value, onChangeText }) {
  return (
    <View
      style={[
        styles.row,
        styles.border,
        styles.round,
        styles.mh2,
        styles.ph5,
        styles.mv2,
        styles.bgPrimaryTransParent,
        {
          alignItems: "center",
          justifyContent: "flex-start",
          height: 48,
          width: SCREEN_WIDTH - 16,
          borderRadius: 12, // Add border radius here for a curved effect
          paddingHorizontal: 10, // Optional: add horizontal padding
        },
      ]}
    >
      <Ionicons name="search-outline" size={20} color="#333" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          {
            flex: 1, // Make it take available space
            height: 48,
            paddingLeft: 30, // Space from the icon
            fontSize: 18,
          },
        ]}
      />
    </View>
   
  );
}
