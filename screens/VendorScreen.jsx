import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH } from "../styles";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";

const VendorScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <ContainerComponent>
      <View style={{ width: SCREEN_WIDTH - 16 }}>
        <MyHeader
          title="Vendor"
          isBack={true}
          hasIcon={true}
          icon={"ellipsis-vertical"}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <View style={{ width: "80%" }}>
            <SearchBar
              placeholder="Search"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log("Filter Pressed")}
          >
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log("Sort Pressed")}
          >
            <Ionicons name="swap-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text>Content goes here</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log("Add Pressed")}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    top: 670,
    right: 20,
    backgroundColor: "#76885B",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VendorScreen;
