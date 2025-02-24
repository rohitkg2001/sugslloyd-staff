// import { View, TouchableOpacity } from "react-native";
// import { spacing, styles, typography } from "../styles";
// import { P } from "./text";

// export default function TabBar({ tabs, activeTab, onTabSelected, style }) {
//   return (
//     <View style={[styles.row, spacing.p2, style]}>
//       {tabs.map((tab) => (
//         <TouchableOpacity
//           key={tab.name}
//           style={[
//             spacing.pv2,
//             spacing.br3,
//             { backgroundColor: activeTab === tab.name ? "#76885B" : "#F0FAF0" },
//           ]}
//           onPress={() => onTabSelected(tab.name)}
//         >
//           <P
//             style={[
//               typography.font10,
//               spacing.mh1,
//               {
//                 color: activeTab === tab.name ? "#fff" : "#000",
//                 fontWeight: activeTab === tab.name ? "bold" : "normal",
//                 textAlign: "center",
//               },
//             ]}
//           >
//             {tab.name} ({tab.count})
//           </P>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

import { View, TouchableOpacity } from "react-native";
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
            spacing.br3,
            { backgroundColor: activeTab === tab.name ? "#76885B" : "#F0FAF0" },
          ]}
          onPress={() => onTabSelected(tab.name)}
        >
          <P
            style={[
              typography.font10,
              spacing.mh1,
              {
                color: activeTab === tab.name ? "#fff" : "#000",
                fontWeight: activeTab === tab.name ? "bold" : "normal",
                textAlign: "center",
              },
            ]}
          >
            {/* {tab.name} {tab.count} */}
            {tab.name} {tab.count ?? 0}
          </P>
        </TouchableOpacity>
      ))}
    </View>
  );
}
