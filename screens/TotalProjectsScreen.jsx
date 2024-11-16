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
  const [filteredProjects, setFilteredProjects] = useState(project); // Initially show all projects
  const navigation = useNavigation();

  // Search functionality
  const filterProjects = (text) => {
    setSearchText(text);
    const filtered = project.filter((item) =>
      item.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  // Sorting
  const sortProjects = (sortOrder) => {
    let sortedProjects = [...filteredProjects];
    if (sortOrder === "alphabetical") {
      sortedProjects.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortOrder === "status") {
      const statusOrder = ["Completed", "Ongoing"];
      sortedProjects.sort((a, b) => {
        const indexA = statusOrder.indexOf(a.status);
        const indexB = statusOrder.indexOf(b.status);
        return indexA - indexB;
      });
    } else if (sortOrder === "duration") {
      sortedProjects.sort(
        (a, b) => parseInt(a.duration, 10) - parseInt(b.duration, 10)
      );
    }
    setFilteredProjects(sortedProjects);
  };

  const handleViewDetails = (site) => {
    navigation.navigate("ViewDetailScreen", { site });
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete the project "${item.projectName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setFilteredProjects((prevProjects) =>
              prevProjects.filter((project) => project.id !== item.id)
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

  const navigateToProjectDetails = (projectData) => {
    navigation.navigate("ViewDetailScreen", { site: projectData });
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    {
      label: "Sort Alphabetically",
      onPress: () => {
        sortProjects("alphabetical");
        setIsMenuVisible(false);
      },
    },
    {
      label: "Sort by Status (Completed, Ongoing)",
      onPress: () => {
        sortProjects("status");
        setIsMenuVisible(false);
      },
    },
    {
      label: "Sort by Duration",
      onPress: () => {
        sortProjects("duration");
        setIsMenuVisible(false);
      },
    },
  ];

  return (
    <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
      {/* Header Section */}
      <MyHeader
        title="Total Projects"
        isBack={true}
        hasIcon={true}
        icon={"ellipsis-vertical"}
        onIconPress={() => setIsMenuVisible(!isMenuVisible)}
      />

      {/* Search Bar */}
      <MyFlatList
        data={filteredProjects} // Show filtered projects
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            isProject={true} // Pass this to show project details
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! There are no projects available. Start creating or contact admin." />
        )}
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search by project name"
            value={searchText}
            onChangeText={filterProjects} // Corrected the search handler
          />
        )}
      />

      {/* Add Project Button */}
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("formScreen")}
      >
        <Ionicons name="add" size={32} color="white" />
      </Button>

      {/* Filter Menu */}
      <Filter
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        options={menuOptions}
      />
    </View>
  );
};

export default TotalProjectsScreen;
