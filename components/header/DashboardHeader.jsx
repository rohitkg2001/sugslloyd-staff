import { View, TouchableOpacity } from "react-native";
import { H4, H5, P, Span } from "../text";
import {
  ICON_MEDIUM,
  DARK,
  SCREEN_WIDTH,
  spacing,
  styles,
  layouts,
  typography,
} from "../../styles";
import Icon from "react-native-vector-icons/Ionicons";

export default function DashboardHeader({
  dueTasks,
  greeting,
  firstName,
  navigation,
  notificationCount = 0,
}) {
  return (
    <View
      style={[
        styles.row,
        spacing.m2,
        { alignItems: "center", width: SCREEN_WIDTH - 16 },
      ]}
    >
      <View>
        <H5 style={typography.font20}>
          {greeting},{firstName}
        </H5>
        <P style={(spacing.ml1, typography.font12)}>
          You have {dueTasks} due tasks Today
        </P>
      </View>
      <TouchableOpacity
        style={[
          layouts.circle12,
          layouts.center,
          spacing.bw05,
          spacing.br5,
          { position: "relative" },
        ]}
        onPress={() => navigation.navigate("notificationScreen")}
      >
        <Icon name="notifications-outline" size={ICON_MEDIUM} color={DARK} />
        {notificationCount && (
          <View
            style={[
              styles.bgDanger,
              layouts.center,
              styles.notificationBadgeContainer,
            ]}
          >
            <Span
              style={[
                typography.textLight,
                typography.font12,
                { textAlign: "center" },
              ]}
            >
              {notificationCount}
            </Span>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
