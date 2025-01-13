import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TabBar() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["Assigned", "Unassigned", "Pending", "Done"];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    padding: 12,
    justifyContent: "space-around",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F0FAF0",
  },
  activeTab: {
    backgroundColor: "#76885B",
  },
  tabText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
