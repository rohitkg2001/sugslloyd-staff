import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
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

  const filterProjects = (text) => {
    setSearchText(text);
    const filtered = project.filter((item) =>
      item.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const sortProjects = (sortOrder) => {
    console.log(`Sorting by: ${sortOrder}`);
    let sortedProjects = [...filteredProjects];

    if (sortOrder === "alphabetical") {
      sortedProjects.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortOrder === "status") {
      const statusOrder = ["Completed", "Ongoing"];
      sortedProjects.sort((a, b) => {
        const statusA = (a.status || "").trim().toLowerCase();
        const statusB = (b.status || "").trim().toLowerCase();
        const indexA = statusOrder.indexOf(
          statusA.charAt(0).toUpperCase() + statusA.slice(1)
        );
        const indexB = statusOrder.indexOf(
          statusB.charAt(0).toUpperCase() + statusB.slice(1)
        );
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
    } else if (sortOrder === "duration") {
      sortedProjects.sort((a, b) => {
        const durationA = parseInt(a.duration, 10);
        const durationB = parseInt(b.duration, 10);
        return durationA - durationB;
      });
    }

    setFilteredProjects(sortedProjects);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleEdit = (item) => {
    console.log("Edit project:", item);
    // Add navigation or edit function logic here
  };

  const handleDelete = (item) => {
    console.log("Delete project:", item);

    // Remove the item from filteredProjects state
    const updatedProjects = filteredProjects.filter(
      (project) => project.id !== item.id
    );

    // Update the filteredProjects state to reflect the deletion
    setFilteredProjects(updatedProjects);
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
            <View style={styles.card}>
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
            </View>
          )}
        />

        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
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
