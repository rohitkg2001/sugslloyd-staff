import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Card } from "react-native-paper";
import { totalsitesData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { H6, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";

const CompletedSitesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredSites, setFilteredSites] = useState(totalsitesData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);


  const filterSites = (text) => {
    setSearchText(text);
    const filtered = totalsitesData.filter((item) =>
      item.siteName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSites(filtered);
  };


  const handleEdit = (site) => {
    setSelectedSite(site);
    setIsEditModalVisible(true);
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
        title="Completed Sites"
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
      />

      <MyFlatList
        data={filteredSites}
        renderItem={({ item }) =>
          <ClickableCard
            item={item}
            handleViewDetails={handleEdit}
            handleEdit={handleSave}
            handleDelete={handleDelete}
            isSite={true}
          />}
        // TODO: 
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() =>
          <NoRecord msg={"Oops!!! There are currently no sites completed. Start completing or contact admin"} />}
        ListHeaderComponent={() => <SearchBar placeholder="Search by city, state or project code" />}
      />


      <Button
        style={styles.addButton}
        onPress={() => console.log("Add Pressed")}
      >
        <Ionicons name="add" size={32} color="white" />
      </Button>
    </ContainerComponent>
  );
};

export default CompletedSitesScreen;
