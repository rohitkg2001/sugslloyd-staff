import { View, TouchableOpacity } from "react-native";
import { spacing, styles, typography } from "../styles";
import { P } from "./text";

export default function TabBar({ tabs, activeTab, onTabSelected, style }) {
  return (
    <View style={[styles.row, spacing.p2, style]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            spacing.pv2,
            spacing.br3,

            { backgroundColor: activeTab === tab ? "#76885B" : "#F0FAF0" },
          ]}
          onPress={() => onTabSelected(tab)}
        >
          <P
            style={[
              typography.font12,
              spacing.mh2,
              {
                color: activeTab === tab ? "#fff" : "#000",
                fontWeight: activeTab === tab ? "bold" : "normal",
                textAlign: "center",
              },
            ]}
          >
            {tab}
          </P>
        </TouchableOpacity>
      ))}
    </View>
  );
}
