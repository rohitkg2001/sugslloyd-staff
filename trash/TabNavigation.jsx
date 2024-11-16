import { View, TouchableOpacity } from "react-native";
import { H5 } from "../components/text";
import { styles, spacing, typography } from "../styles";

const TabNavigation = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <View style={[styles.row, spacing.mv2, { alignItems: 'center' }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.chipButton, currentTab === tab && styles.bgPrimary]}
          onPress={() => setCurrentTab(tab)}
        >
          <H5 style={[currentTab === tab ? typography.textLight : typography.textDark, { textAlign: 'center' }]}>
            {tab}
          </H5>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabNavigation;
