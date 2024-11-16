import React, { useState } from "react";
import { View, Alert } from "react-native";
import { totalsitesData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Filter from "../components/filters";
import { useNavigation } from "@react-navigation/native";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";

const TotalSitesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredSites, setFilteredSites] = useState(totalsitesData);
  const [selectedSite, setSelectedSite] = useState(null);
  const navigation = useNavigation();

  const toggleMenu = () => {
    console.log("Toggling menu visibility");
    setIsMenuVisible(!isMenuVisible);
  };

  const filterSites = (text) => {
    setSearchText(text);
    const filtered = totalsitesData.filter((item) =>
      item.siteName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSites(filtered);
  };

  const sortSites = (sortOrder) => {
    console.log(`Sorting by: ${sortOrder}`);
    let sortedSites = [...filteredSites];
    if (sortOrder === "lowToHigh") {
      sortedSites.sort((a, b) => a.siteName.localeCompare(b.siteName));
    } else if (sortOrder === "highToLow") {
      sortedSites.sort((a, b) => b.siteName.localeCompare(a.siteName));
    }
    setFilteredSites(sortedSites);
  };

  const handleEdit = (site) => {
    navigation.navigate("EditDetailsScreen", {
      site,
      formType: "site",
    });
  };

  const handleSave = (updatedSite) => {
    const updatedSites = filteredSites.map((item) =>
      item.id === updatedSite.id ? updatedSite : item
    );
    setFilteredSites(updatedSites);
  };

  const handleDelete = (siteToDelete) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this site?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedSites = filteredSites.filter(
              (item) => item.id !== siteToDelete.id
            );
            setFilteredSites(updatedSites);
          },
        },
      ]
    );
  };

  const handleViewDetails = (site) => {
    navigation.navigate("ViewDetailScreen", { site });
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title="Total Sites"
          isBack={true}
          hasIcon={true}
          icon={"ellipsis-vertical"}
          onIconPress={toggleMenu}
        />
        <MyFlatList
          data={totalsitesData}
          loading={false}
          renderItem={({ item }) => (
            <ClickableCard
              item={item}
              handleViewDetails={handleViewDetails}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              isSite={true}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => (
            <NoRecord msg="Oops! There are no sites data available. Start creating or contact admin" />
          )}
          ListHeaderComponent={() => (
            <SearchBar
              placeholder="Search by city, state or project code"
              value={searchText}
              onChangeText={filterSites}
            />
          )}
        />

        <Button
          style={styles.addButton}
          onPress={() => navigation.navigate("sitesFormScreen")}
        >
          <Ionicons name="add" size={32} color="white" />
        </Button>

        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={[
            {
              label: "Low to High",
              value: "lowToHigh",
              action: () => sortSites("lowToHigh"),
            },
            {
              label: "High to Low",
              value: "highToLow",
              action: () => sortSites("highToLow"),
            },
          ]}
        />
      </View>
    </ContainerComponent>
  );
};

export default TotalSitesScreen;
