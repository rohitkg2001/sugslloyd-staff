import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { styles, spacing, typography } from "../styles";
import { H6 } from "./text";

const Tabs = ({ tabs, onTabPress }) => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabPress = (tabIndex) => {
    if (tabIndex === activeTab) {
      setActiveTab(null);
      onTabPress(null);
    } else {
      setActiveTab(tabIndex);
      onTabPress(tabIndex);
    }
  };

  return (
    <View
      style={[
        styles.row,
        spacing.mv2,
        spacing.pv1,
        spacing.bbw05,
        { justifyContent: "space-around", backgroundColor: "#F0FAF0" },
      ]}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            ...(activeTab === index && {
              borderBottomWidth: 2,
              borderBottomColor: "#76885B",
            }),
          }}
          onPress={() => handleTabPress(index)}
        >
          <H6
            style={{
              ...typography.font16,
              ...typography.textBold,
              color: activeTab === index ? "#76885B" : undefined,
            }}
          >
            {tab}
          </H6>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
