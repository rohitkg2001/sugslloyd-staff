import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Filter from "../components/filters";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import { project } from "../utils/faker";
import { useNavigation } from "@react-navigation/native";

const TotalProjectsScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(project); 
  const navigation = useNavigation();

  const filterProjects = (text) => {
    setSearchText(text);
    const filtered = project.filter((item) =>
      item.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const sortProjects = (sortOrder) => {
    const sortedProjects = [...filteredProjects];
    if (sortOrder === "alphabetical") {
      sortedProjects.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortOrder === "status") {
      const statusOrder = ["Completed", "Ongoing"];
      sortedProjects.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      );
    } else if (sortOrder === "duration") {
      sortedProjects.sort(
        (a, b) => parseInt(a.duration, 10) - parseInt(b.duration, 10)
      );
    }
    setFilteredProjects(sortedProjects);
  };

  const handleViewDetails = (projectData) => {
    navigation.navigate("ViewDetailScreen", { site: projectData });
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${item.projectName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete" ,
          style: "destructive",
          onPress: () => {
            setFilteredProjects((prevProjects) =>
              prevProjects.filter( ( project ) => project.id !== item.id )
            );
          },
        },
      ]
    );
  };

  const handleEdit = (item) => {
    navigation.navigate("EditDetailsScreen", {
      site: item,
      formType: "project",
    });
  };

  const menuOptions = [
    {
      label: "Sort Alphabetically",
      onPress: () => sortProjects("alphabetical"),
    },
    { label: "Sort by Status", onPress: () => sortProjects("status") },
    { label: "Sort by Duration", onPress: () => sortProjects("duration") },
  ];

  return (
    <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
     
      <MyHeader
        title="Total Projects"
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
        onIconPress={() => setIsMenuVisible(!isMenuVisible)}
      />

     
      <MyFlatList
        data={filteredProjects}
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            isProject={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No projects available. Start creating or contact admin." />
        )}
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search by project name"
            value={searchText}
            onChangeText={filterProjects}
          />
        )}
      />

  
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("formScreen")}
      >
        <Ionicons name="add" size={32} color="white" />
      </Button>


      <Filter
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        options={menuOptions}
      />
    </View>
  );
};

export default TotalProjectsScreen;
