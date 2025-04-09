// import All react Native
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-paper";
import { useSelector } from "react-redux";

// import all styles
import { H4 } from "../text";
import { typography, styles, ICON_SMALL, ICON_LARGE } from "../../styles";

export default function MyHeader({
  isBack,
  title,
  hasIcon,
  icon,
  hasBadge,
  badgeCount,
  onIconPress,
  rightComponent,
  iconRef,
  download,
}) {
  const navigation = useNavigation();
  const { id } = useSelector((state) => state.vendor);

  return (
    <View style={styles.headerStyle}>
      {isBack && (
        <TouchableOpacity onPress={download}>
          <Icon name="arrow-back" size={ICON_SMALL} color="#000" />
        </TouchableOpacity>
      )}
      <H4 style={[typography.font18, typography.fontLato, typography.textBold]}>
        {title}
      </H4>
      {hasIcon && (
        <TouchableOpacity
          onPress={onIconPress}
          style={{ height: 54, width: 54 }}
        >
          <Icon
            name={icon}
            size={ICON_LARGE}
            style={{ position: "absolute", top: 10, left: 14 }}
          />
          {hasBadge && (
            <Badge style={{ position: "absolute", top: 7, right: 7 }}>
              {badgeCount}
            </Badge>
          )}
          {rightComponent && (
            <TouchableOpacity
              onPress={onIconPress}
              style={{ position: "absolute", top: 13, right: 2 }}
              // ref={iconRef}
            >
              <Icon name="ellipsis-vertical" size={ICON_LARGE} color="#000" />
              {iconRef}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
