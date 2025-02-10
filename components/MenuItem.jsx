// import all react native
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
// import all styles
import { H6 } from "./text";
import { typography, styles, spacing, ICON_SMALL } from "../styles";

export default function MenuItem({ label, icon, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.rowItem, spacing.ph1, spacing.mh2]}
      onPress={onPress}
    >
      <View style={[styles.row]}>
        <Icon name={icon} size={ICON_SMALL} style={[typography.textDark]} />
        <H6
          style={[
            typography.font14,
            spacing.ph2,
            typography.fontLato,
            typography.textBold,
          ]}
        >
          {label}
        </H6>
      </View>
      <Icon name="chevron-forward-outline" size={ICON_SMALL} color="#333" />
    </TouchableOpacity>
  );
}
