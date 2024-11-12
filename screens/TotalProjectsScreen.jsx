import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { project } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";

const TotalProjectsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(project);

  // Filter projects based on search text
  const filterProjects = (text) => {
    setSearchText(text);
    const filtered = project.filter((item) =>
      item.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  // Navigate to project detail screen and pass project data
  const navigateToProjectDetails = (projectData) => {
    navigation.navigate("ViewDetailScreen", { site: projectData }); // Passing project data to ViewDetailScreen
  };

  // Toggle the filter menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleEdit = (item) => {
    navigation.navigate("EditDetailsScreen", {
      site: item,
      formType: "project",
    });
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

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    {
      label: "Sort Alphabetically",
      onPress: () => {
        sortProjects("alphabetical");
        toggleMenu();
      },
    },
    {
      label: "Sort by Status (Completed, Ongoing)",
      onPress: () => {
        sortProjects("status");
        toggleMenu();
      },
    },
    {
      label: "Sort by Duration",
      onPress: () => {
        sortProjects("duration");
        toggleMenu();
      },
    },
  ];

  // Sort projects based on different criteria
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

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title="Total Projects"
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
              placeholder="Search projects..."
              value={searchText}
              onChangeText={filterProjects}
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
          data={filteredProjects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigateToProjectDetails(item)}
            >
              <View style={{ flex: 1 }}>
                <H5>{item.projectName}</H5>
                <P>{`Duration: ${item.duration}`}</P>
                <P>{`Status: ${item.status}`}</P>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={{ marginLeft: 16 }}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
        <Filter
          visible={isMenuVisible}
          onClose={() => setIsMenuVisible(false)}
          options={menuOptions}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("formScreen")}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </ContainerComponent>
  );
};

export default TotalProjectsScreen;
