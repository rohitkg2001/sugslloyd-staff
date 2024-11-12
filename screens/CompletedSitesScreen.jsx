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
import VendorForm from "../components/VendorForm"; 

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


  const renderListItem = ({ item }) => (
    <Card
      style={[
        spacing.mv1,
        { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <H6 style={[typography.textBold]}>{item.siteName}</H6>
          <P style={{ fontSize: 14, color: "#020409" }}>Dist: {item.dist}</P>
          <P style={{ fontSize: 14, color: "#020409" }}>
            Location: {item.location}
          </P>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Edit button */}
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            style={{ marginRight: 12 }}
          >
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>

          {/* Delete button */}
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
        title="Completed Sites"
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
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
            placeholder="Search Completed Sites..."
            value={searchText}
            onChangeText={filterSites}
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
        data={filteredSites}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

  
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log("Add Pressed")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Edit modal */}
      <VendorForm
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleSave}
        initialData={selectedSite}
        formType="site" 
      />
    </ContainerComponent>
  );
};

export default CompletedSitesScreen;
