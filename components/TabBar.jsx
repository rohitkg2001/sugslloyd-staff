import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { spacing, styles, typography } from "../styles";

export default function TabBar({ tabs, initialActiveTab, onTabPress, style }) {
  const [activeTab, setActiveTab] = useState(initialActiveTab || tabs[0]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (onTabPress) {
      onTabPress(tab);
    }
  };

  return (
    <View style={[styles.row, spacing.p2, style]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            spacing.pv2,
            spacing.ph3,
            spacing.br3,
            {
              backgroundColor: activeTab === tab ? "#76885B" : "#F0FAF0",
            },
          ]}
          onPress={() => handleTabPress(tab)}
        >
          <Text
            style={[
              typography.font14,
              {
                color: activeTab === tab ? "#fff" : "#000",
                fontWeight: activeTab === tab ? "bold" : "normal",
                textAlign: "center",
              },
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
