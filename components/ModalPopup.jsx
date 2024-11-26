import { Modal, Portal } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { H4 } from "./text";
import Button from "./buttons/Button";
import {
  typography,
  styles,
  LIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SECONDARY_COLOR,
  layouts,
  ICON_MEDIUM,
} from "../styles";

export default function ModalPopup({
  close,
  visible,
  negativeButton,
  positiveButton,
  action,
  children,
}) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={close}>
        <View
          style={{
            backgroundColor: LIGHT,
            width: SCREEN_WIDTH - 32,
            marginHorizontal: 8,
            minHeight: SCREEN_HEIGHT / 6,
            borderRadius: 16,
          }}
        >
          {/* Popup header */}
          <TouchableOpacity
            style={[
              layouts.circle625,
              styles.bgDanger,
              layouts.center,
              { position: "absolute", right: -12, top: -10 },
            ]}
            onPress={close}
          >
            <Icon name="close-sharp" color={LIGHT} size={ICON_MEDIUM} />
          </TouchableOpacity>

          <View style={{ padding: 16 }}>{children}</View>
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              justifyContent: "space-between",
              alignItems: "center",
              borderTopColor: SECONDARY_COLOR,
              borderTopWidth: 1,
            }}
          >
            <Button
              style={{
                borderRightColor: SECONDARY_COLOR,
                borderRightWidth: 1,
                paddingHorizontal: SCREEN_WIDTH / 6 - 36,
                marginLeft: 20,
              }}
              onPress={close}
            >
              <H4
                style={[
                  typography.textBold,
                  typography.font20,
                  typography.textDanger,
                  { textAlign: "right", textTransform: "uppercase" },
                ]}
              >
                {negativeButton}
              </H4>
            </Button>
            <Button
              style={{
                paddingHorizontal: SCREEN_WIDTH / 6 - 36,
                marginRight: 20,
              }}
              onPress={action}
            >
              <H4
                style={[
                  typography.textBold,
                  typography.font20,
                  typography.textPrimary,
                  { textAlign: "left", textTransform: "uppercase" },
                ]}
              >
                {positiveButton}
              </H4>
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
