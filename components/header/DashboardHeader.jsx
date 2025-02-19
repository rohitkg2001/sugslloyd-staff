// All import React native
import { View, TouchableOpacity } from "react-native";
//import { useEffect, useState } from "react";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import CustomMenu from "../TargetScreen/CustomMenu";
import { Menu, Divider } from "react-native-paper";

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
        <H4 style={typography.fontLato}>
          {greeting},{firstName}
        </H4>
        {/* <P style={(spacing.ml1, typography.fontLato)}>
          You have {dueTasks} due tasks Today
        </P> */}
        {message && <P style={[spacing.ml1, typography.fontLato]}>{message}</P>}
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
          color={DARK}
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
        <Menu
          visible={isMenuVisible}
          onDismiss={toggleMenu}
          anchor={
            <View
              style={{
                position: "absolute",
                top: 40,
                right: 0,
                backgroundColor: "white",
                padding: 15,
                borderRadius: 8,
                shadowColor: "#000",
                width: 200,
              }}
            >
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <Menu.Item
                    onPress={item.onPress}
                    title={item.title}
                    disabled={item.disabled}
                  />
                  {index < menuItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </View>
          }
        />
      )}
    </View>
  );
}
