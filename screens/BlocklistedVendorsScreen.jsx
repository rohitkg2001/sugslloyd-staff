import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import { blocklistedVendorsData } from "../utils/faker";

const BlockListedVendorsScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredVendors, setFilteredVendors] = useState(
    blocklistedVendorsData
  );
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleEdit = (item) => {
    navigation.navigate("EditDetailsScreen", {
      vendor: item,
      formType: "vendor",
    });
  };

  const handleDelete = (vendorToDelete) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${vendorToDelete.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedVendors = filteredVendors.filter(
              (item) => item.id !== vendorToDelete.id
            );
            setFilteredVendors(updatedVendors);
          },
        },
      ]
    );
  };

  const handleViewDetails = (vendor) => {
    navigation.navigate("ViewDetailScreen", {
      site: vendor,
      formType: "vendor",
    });
  };

  const filterVendors = (text) => {
    setSearchText(text);
    const filtered = blocklistedVendorsData.filter((item) =>
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

  const handleSortAlphabetically = () => {
    sortVendors("alphabetical");
    toggleMenu();
  };

  const handleSortByLocation = () => {
    sortVendors("locationAsc");
    toggleMenu();
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    { label: "Sort Alphabetically", onPress: handleSortAlphabetically },
    { label: "Sort by Location", onPress: handleSortByLocation },
  ];

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title="BlockListed Vendors"
          isBack={true}
          hasIcon={true}
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu}
        />
        <MyFlatList
          data={filteredVendors}
          loading={false}
          renderItem={({ item }) => (
            <ClickableCard
              item={item}
              handleViewDetails={handleViewDetails}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              isVendor={true}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => (
            <NoRecord msg="Oops! No Active  Vendors available. Create the new one." />
          )}
          ListHeaderComponent={() => (
            <SearchBar
              placeholder="Search by name, state or project code"
              value={searchText}
              onChangeText={filterVendors}
            />
          )}
        />
        <Button
          style={styles.addButton}
          onPress={() => navigation.navigate("VendorFormScreen")}
        >
          <Ionicons name="add" size={32} color="white" />
        </Button>
        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions}
        />
      </View>
    </ContainerComponent>
  );
};

export default BlockListedVendorsScreen;
