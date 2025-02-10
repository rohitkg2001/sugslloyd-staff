// import All react native
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// import Components
import Avatar from "./Avatar";
// import All Styles
import { P, Span } from "./text";
import {
  styles,
  layouts,
  spacing,
  typography,
  SCREEN_WIDTH,
  PRIMARY_COLOR_TRANSPARENT,
  ICON_SMALL,
} from "../styles";

export default function ProfileCard({ imageUri, name, phoneNumber, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.rowItem,
        spacing.p3,
        {
          height: 120,
          width: SCREEN_WIDTH,
          backgroundColor: PRIMARY_COLOR_TRANSPARENT,
        },
      ]}
      onPress={onPress}
    >
      <Avatar avatar={imageUri} name={name} />

      <View style={layouts.flex1}>
        <P style={[typography.fontLato, typography.font18]}>{name}</P>

        <Span>{phoneNumber}</Span>
      </View>

      <Icon name="chevron-forward-outline" size={ICON_SMALL} color="#333" />
    </TouchableOpacity>
  );
}
