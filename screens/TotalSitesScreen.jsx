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
import Filter from "../components/filters";
import VendorForm from "../components/VendorForm";
import { useNavigation } from "@react-navigation/native"; 

const TotalSitesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredSites, setFilteredSites] = useState(totalsitesData);
  const [selectedSite, setSelectedSite] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const navigation = useNavigation(); 

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

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

  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleViewDetails(item)}>
      <Card
        style={[
          spacing.mv1,
          { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
        ]}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            <H6 style={[typography.textBold]}>{item.siteName}</H6>
            <P style={{ fontSize: 14, color: "#020409" }}>Dist: {item.dist}</P>
            <P style={{ fontSize: 14, color: "#020409" }}>
              Location: {item.location}
            </P>
          </View>
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
    </TouchableOpacity>
  );

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
          <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
            <Ionicons name="swap-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredSites}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
        <VendorForm
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          onSave={handleSave}
          initialData={selectedSite}
          formType="site"
        />
      </View>
    </ContainerComponent>
  );
};

export default TotalSitesScreen;
