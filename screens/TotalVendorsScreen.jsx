import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { totalVendorsData } from "../utils/faker"; // Import vendor data
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { H6, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Filter from "../components/filters";

const TotalVendorsScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredVendors, setFilteredVendors] = useState(totalVendorsData);

  const filterVendors = (text) => {
    setSearchText(text);
    const filtered = totalVendorsData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredVendors(filtered);
  };

  const sortVendors = (sortOrder) => {
    let sortedVendors = [...filteredVendors];

    if (sortOrder === "alphabetical") {
      sortedVendors.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "locationAsc") {
      sortedVendors.sort((a, b) => a.location.localeCompare(b.location));
    }

    setFilteredVendors(sortedVendors);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    {
      label: "Sort Alphabetically",
      onPress: () => {
        sortVendors("alphabetical");
        toggleMenu();
      },
    },
    {
      label: "Sort by Location",
      onPress: () => {
        sortVendors("locationAsc");
        toggleMenu();
      },
    },
  ];

  const handleEdit = (item) => {
    console.log(`Edit pressed for: ${item.name}`);
    // Add edit functionality here
  };

  const handleDelete = (item) => {
    console.log(`Delete pressed for: ${item.name}`);
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
          <H6 style={[typography.textBold]}>{item.name}</H6>
          <P style={{ fontSize: 14, color: "#020409" }}>
            Location: {item.location}
          </P>
          <P style={{ fontSize: 14, color: "#020409" }}>
            Contact: {item.contactNumber}
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
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <ContainerComponent>
      <MyHeader
        title="Total Vendors"
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
            placeholder="Search vendors..."
            value={searchText}
            onChangeText={filterVendors}
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
        data={filteredVendors}
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

export default TotalVendorsScreen;
