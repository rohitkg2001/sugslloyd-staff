import React from "react";
import { View, TouchableOpacity } from "react-native";
import { P } from "../text";
import { spacing, styles, PRIMARY_COLOR } from "../../styles";

const SwipeTab = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <View
      style={[
        styles.row,
        spacing.ph1,
        spacing.pv2,
        {
          justifyContent: "space-around",
         // backgroundColor: "#f5f5f5",
        },
      ]}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => setSelectedTab(tab.key)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomWidth: selectedTab === tab.key ? 2 : 0,
            borderBottomColor:
              selectedTab === tab.key ? PRIMARY_COLOR : "transparent",
          }}
        >
          <P
            style={{
              color: selectedTab === tab.key ? PRIMARY_COLOR : "#555",
              fontWeight: selectedTab === tab.key ? "bold" : "normal",
            }}
          >
            {tab.title}
          </P>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SwipeTab;
