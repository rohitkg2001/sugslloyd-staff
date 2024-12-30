import { View, TouchableOpacity } from "react-native";
import { H4, P, Span } from "../text";
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
        <H4 style={typography.textBold}>
          {greeting},{firstName}
        </H4>
        <P style={spacing.ml1}>You have {dueTasks} due tasks Today</P>
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
                typography.font16,
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
