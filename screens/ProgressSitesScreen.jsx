import React, { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { totalsitesData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { styles } from "../styles";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ClickableCard from "../components/card/ClickableCard";

const ProgressSitesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredSites, setFilteredSites] = useState(totalsitesData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const navigation = useNavigation();

  // Filter sites based on search text
  const filterSites = (text) => {
    setSearchText(text);
    const filtered = totalsitesData.filter((item) =>
      item.siteName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSites(filtered);
  };

  const handleEdit = (site) => {
    navigation.navigate("EditDetailsScreen", {
      site,
      formType: "site",
    });
  };
  const handleViewDetails = (site) => {
    navigation.navigate("ViewDetailScreen", { site });
  };

  const handleSave = (updatedSite) => {
    const updatedSites = filteredSites.map((item) =>
      item.id === updatedSite.id ? updatedSite : item
    );
    setFilteredSites(updatedSites);
    setIsEditModalVisible(false);
  };

  // Handle delete functionality
  const handleDelete = (siteToDelete) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${siteToDelete.siteName}?`,
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

  return (
    <ContainerComponent>
      <MyHeader
        title="Progress Sites"
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
      />

      {/* List of filtered sites */}
      <MyFlatList
        data={filteredSites}
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
          <NoRecord
            msg={
              "Oops!!! There are currently no sites in progress. Start a site or contact admin"
            }
          />
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
    </ContainerComponent>
  );
};

export default ProgressSitesScreen;
