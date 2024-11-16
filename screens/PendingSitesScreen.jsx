import React, { useState } from "react";
import { Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";

import MyFlatList from "../components/utility/MyFlatList";
import ClickableCard from "../components/card/ClickableCard";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import { styles } from "../styles";
import { totalsitesData } from "../utils/faker";

const PendingSitesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredSites, setFilteredSites] = useState(totalsitesData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const navigation = useNavigation();

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

  return (
    <ContainerComponent>
      <MyHeader
        title="Pending Sites"
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
      />

      <MyFlatList
        data={filteredSites}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleDelete={handleDelete}
            handleViewDetails={handleViewDetails}
            handleEdit={handleEdit}
            isSite={true}
          />
        )}
        // TODO: add methods for edit,view,delete
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <NoRecord msg={"Yay! There are no pending sites"} />
        )}
        ListHeaderComponent={() => (
          <SearchBar placeholder="Search by city, state or project code" />
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

export default PendingSitesScreen;
