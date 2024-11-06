import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { totalsitesData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { H6, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";

const TotalSitesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const filteredsitesData = totalsitesData.filter((item) =>
    item.siteName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderListItem = ({ item }) => (
    <Card
      style={[
        spacing.mv1,
        { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <View
          style={{
            flex: 1,
            marginLeft: 16,
          }}
        >
          <H6 style={[typography.textBold]}>{item.siteName}</H6>
          <P style={{ fontSize: 14, color: "#020409" }}>Dist: {item.dist}</P>
          <P style={{ fontSize: 14, color: "#020409" }}>
            Location: {item.location}
          </P>
        </View>
      </View>
    </Card>
  );

  return (
    <ContainerComponent>
      <MyHeader
        title="Total Sites"
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
            placeholder="Search sites..."
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
      <FlatList
        data={filteredsitesData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log("Add Pressed")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </ContainerComponent>
  );
};

export default TotalSitesScreen;
