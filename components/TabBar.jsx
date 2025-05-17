import { View, TouchableOpacity, StyleSheet } from "react-native";
import { spacing, styles, typography } from "../styles";
import { P } from "./text";

export default function TabBar({ tabs, activeTab, onTabSelected, style }) {
  return (
    <View style={[styles.row, spacing.p1, style]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={[
            spacing.pv2,
            // spacing.br3,
            {
              // backgroundColor: "#F0FAF0",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            },
          ]}
          onPress={() => onTabSelected(tab.name)}
        >
          {/* Tab Name */}
          <P
            style={[
              typography.font10,
              {
                color: "#000",
                fontWeight: activeTab === tab.name ? "bold" : "normal",
                textAlign: "center",
              },
            ]}
          >
            {tab.name}
          </P>

          {/* Badge Count */}
          {tab.count > 0 && (
            <View style={badgeStyles.badge}>
              <P style={badgeStyles.badgeText}>{tab.count}</P>
            </View>
          )}

          {/* Underline for active tab */}
          {activeTab === tab.name && (
            <View
              style={{
                height: 2,
                backgroundColor: "#000",
                width: "100%",
                marginTop: 4,
              }}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: 2,
    backgroundColor: "#DC4C64",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
