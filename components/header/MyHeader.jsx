import { View, TouchableOpacity } from "react-native";
import { H4 } from "../text";
import Icon from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-paper";
import { styles } from "../../styles/components.styles";
import { useNavigation } from "@react-navigation/native";

export default function MyHeader({
  isBack,
  title,
  hasIcon,
  icon,
  hasBadge,
  badgeCount,
  onIconPress,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerStyle}>
      {isBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}
      <H4 style={styles.titleText}>{title}</H4>
      {hasIcon && (
        <TouchableOpacity
          onPress={onIconPress}
          style={{ height: 54, width: 54 }}
        >
          <Icon
            name={icon}
            size={30}
            style={{ position: "absolute", top: 10, left: 14 }}
          />
          {hasBadge && (
            <Badge style={{ position: "absolute", top: 7, right: 7 }}>
              {badgeCount}
            </Badge>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
