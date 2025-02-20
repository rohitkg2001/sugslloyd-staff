import React from "react";
import { Menu, Divider } from "react-native-paper";
import { View } from "react-native";
import { SCREEN_WIDTH } from "../../styles";

const CustomMenu = ({
  menuVisible,
  toggleMenu,
  assignTasks,
  disableAssign,
}) => (
  <Menu
    visible={menuVisible}
    onDismiss={toggleMenu}
    style={{ position: "absolute", top: 50, right: 0, width: SCREEN_WIDTH / 2 }}
    anchor={
      <View
        style={{ width: 40, height: 10 }}
        onStartShouldSetResponder={toggleMenu}
      />
    }
  >
    <Menu.Item
      onPress={!disableAssign ? assignTasks : null}
      title="Assign to vendor"
      disabled={disableAssign}
    />
    <Divider />
    <Menu.Item onPress={toggleMenu} title="Approve" />
    <Divider />
    <Menu.Item onPress={toggleMenu} title="Reject" />
  </Menu>
);

export default CustomMenu;
