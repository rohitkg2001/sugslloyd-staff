import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { totalsitesData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { H6, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Filter from "../components/filters";

const TotalSitesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredSites, setFilteredSites] = useState(totalsitesData);

  const filterSites = (text) => {
    setSearchText(text);
    const filtered = totalsitesData.filter((item) =>
      item.siteName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSites(filtered);
  };

  const sortSites = (sortOrder) => {
    let sortedSites = [...filteredSites];

    if (sortOrder === "alphabetical") {
      sortedSites.sort((a, b) => a.siteName.localeCompare(b.siteName));
    } else if (sortOrder === "siteNameAsc") {
      sortedSites.sort((a, b) => a.siteName.localeCompare(b.siteName));
    } else if (sortOrder === "locationAsc") {
      sortedSites.sort((a, b) => a.location.localeCompare(b.location));
    }

    setFilteredSites(sortedSites);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    {
      label: "Sort Alphabetically",
      onPress: () => {
        sortSites("alphabetical");
        toggleMenu();
      },
    },
    {
      label: "Sort by Site Name",
      onPress: () => {
        sortSites("siteNameAsc");
        toggleMenu();
      },
    },
    {
      label: "Sort by Location",
      onPress: () => {
        sortSites("locationAsc");
        toggleMenu();
      },
    },
  ];

  const handleEdit = (item) => {
    console.log(`Edit pressed for: ${item.siteName}`);
    // Add edit functionality here
  };

  const handleDelete = (item) => {
    console.log(`Delete pressed for: ${item.siteName}`);
    // Add delete functionality here
  };

  const renderListItem = ({ item }) => (
    <Card
      style={[
        spacing.mv1,
        { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <View style={{ flex: 1 }}>
          <H6 style={[typography.textBold]}>{item.siteName}</H6>
          <P style={{ fontSize: 14, color: "#020409" }}>Dist: {item.dist}</P>
          <P style={{ fontSize: 14, color: "#020409" }}>
            Location: {item.location}
          </P>
        </View>
        {/* Edit and Delete Icons */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            style={{ marginRight: 12 }}
          >
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity>
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
        onIconPress={toggleMenu}
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
            onChangeText={filterSites}
          />
        </View>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => toggleMenu()}
        >
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => toggleMenu()}
        >
          <Ionicons name="swap-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredSites}
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

      <Filter
        visible={isMenuVisible}
        onClose={toggleMenu}
        options={menuOptions}
      />
    </ContainerComponent>
  );
};

export default TotalSitesScreen;
