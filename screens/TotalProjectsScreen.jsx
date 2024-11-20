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
import { fakeDelete, project } from "../utils/faker";
import { useNavigation } from "@react-navigation/native";

export default function TotalProjectsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(project);

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
      <MyHeader title="Total Projects" isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredProjects}
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
            handleDelete={() => fakeDelete({ title: "Error!!!", message: "You cannot delete this project. Please contact admin!" })}
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
    </View>
  );
};
