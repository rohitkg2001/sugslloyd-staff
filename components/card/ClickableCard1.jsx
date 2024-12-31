import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import Button from "../buttons/Button";
import { H5, H6, Span } from "../text";
import {
  spacing,
  typography,
  SCREEN_WIDTH,
  LIGHT,
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
  DANGER_COLOR,
} from "../../styles";
import { useEffect, useState } from "react";

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
  selected = false
}) {
  return (
    <TouchableOpacity
      style={[spacing.mv1, { width: SCREEN_WIDTH - 16 }]}
      onPress={onPress}
      onLongPress={() => onLongPressAction(index)}
    >
      <Card style={{ backgroundColor: selected ? DANGER_COLOR : LIGHT, borderRadius: 8 }}>
        <Card.Title
          title={<H5>{title}</H5>}
          subtitle={
            <Span style={[typography.font12, { textTransform: "capitalize" }]}>
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
