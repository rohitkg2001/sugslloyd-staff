// All import React native
import { View, TouchableOpacity } from "react-native";
//import { useEffect, useState } from "react";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import CustomMenu from "../TargetScreen/CustomMenu";
import { Menu, Divider } from "react-native-paper";
import { useSelector } from "react-redux";

// import styles
import { H4, P, Span } from "../text";
import {
  ICON_MEDIUM,
  DARK,
  SCREEN_WIDTH,
  spacing,
  styles,
  layouts,
  typography,
  LIGHT,
} from "../../styles";

export default function DashboardHeader({
  dueTasks,
  greeting,
  firstName,
  navigation,
  notificationCount = 0,
  message,
  style = {},
  useEllipsis = false,
  textStyle,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuItems = [
    {
      title: "Submit bills",
    },
    {
      title: "Export",
    },
  ];

  const { allowedExpense } = useSelector((state) => state.project);

  return (
    <View
      style={[
        styles.row,
        spacing.m2,
        { alignItems: "center", width: SCREEN_WIDTH - 16 },
        style,
      ]}
    >
      <View>
        <H4 style={[typography.fontLato, textStyle]}>
          {greeting}, {firstName}
        </H4>
        {message && (
          <P style={[spacing.ml1, typography.fontLato, textStyle]}>{message}</P>
        )}
      </View>
      <TouchableOpacity
        style={[
          layouts.circle12,
          layouts.center,
          spacing.bw05,
          spacing.br5,
          { position: "relative" },
        ]}
        // onPress={() => navigation.navigate("notificationScreen")}
        onPress={
          useEllipsis
            ? toggleMenu
            : () => navigation.navigate("notificationScreen")
        }
      >
        <Icon
          name={useEllipsis ? "ellipsis-vertical" : "notifications-outline"}
          size={ICON_MEDIUM}
          color={useEllipsis ? LIGHT : DARK}
        />
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

      {useEllipsis && isMenuVisible && (
        <View
          style={[
            spacing.p4,
            {
              position: "absolute",
              top: 65,
              right: 6,
              backgroundColor: LIGHT,
              width: 150,
              height: 120,
              borderRadius: 8,
              zIndex: 1,
            },
          ]}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={item.onPress}
                disabled={item.disabled}
                style={{ paddingVertical: 8 }}
              >
                <P
                  style={{
                    color: item.disabled ? "gray" : "black",
                    fontSize: 16,
                  }}
                >
                  {item.title}
                </P>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
}
