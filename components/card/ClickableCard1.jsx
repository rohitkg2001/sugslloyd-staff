import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native";
// import components
import Button from "../buttons/Button";
// import All styles
import { H6, Span } from "../text";
import {
  spacing,
  typography,
  SCREEN_WIDTH,
  LIGHT,
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
} from "../../styles";

export default function ClickableCard1({
  index,
  title,
  subtitle,
  leftContent,
  rightContent,
  children,
  isNegativeButtonVisible = false,
  negativeText,
  negativeAction,
  isPositiveButtonVisible = false,
  positiveText,
  positiveAction,
  onPress,
  onLongPressAction,
  selected = false,
  borderColor = "transparent",
  cardStyle = {},
}) {
  return (
    <TouchableOpacity
      style={[spacing.mv1, { width: SCREEN_WIDTH - 16 }]}
      onPress={onPress}
      onLongPress={() => onLongPressAction(index)}
    >
      <Card
        // style={{
        //   backgroundColor: selected ? PRIMARY_COLOR_TRANSPARENT : LIGHT,
        //   borderRadius: 8,
        //   borderWidth: 1, // Ensure the border width is applied
        //   borderColor: borderColor, // Use the passed border color prop
        // }}

        style={[
          {
            backgroundColor: selected ? PRIMARY_COLOR_TRANSPARENT : LIGHT,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: borderColor,
          },
          cardStyle, // ✅ Apply custom styles from props
        ]}
      >
        <Card.Title
          title={
            <H6
              style={[
                typography.font14,
                typography.fontLato,
                typography.textBold,
              ]}
            >
              {title}
            </H6>
          }
          subtitle={
            <Span
              style={[
                typography.font12,
                typography.fontLato,
                { textTransform: "capitalize" },
              ]}
            >
              {subtitle}
            </Span>
          }
          left={leftContent}
          right={() => <H6>{rightContent}</H6>}
        />
        <Card.Content>{children}</Card.Content>
        <Card.Actions>
          {isNegativeButtonVisible && (
            <Button
              style={{
                width: 80,
                padding: 8,
                borderRadius: 8,
                backgroundColor: PRIMARY_COLOR,
              }}
              onPress={negativeAction}
            >
              <Span
                style={{ fontSize: 16, color: "white", textAlign: "center" }}
              >
                {negativeText}
              </Span>
            </Button>
          )}
          {isPositiveButtonVisible && (
            <Button
              style={{
                width: 80,
                padding: 8,
                borderRadius: 8,
                backgroundColor: PRIMARY_COLOR,
              }}
              onPress={positiveAction}
            >
              <Span
                style={{ fontSize: 16, color: "white", textAlign: "center" }}
              >
                {positiveText}
              </Span>
            </Button>
          )}
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}
