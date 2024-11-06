import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { project } from "../utils/faker"; // Assuming your project data is coming from faker.js
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";

const TotalProjectsScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(project);

  // Filter function based on search text
  const filterProjects = (text) => {
    setSearchText(text);
    const filtered = project.filter((item) =>
      item.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  // Sorting function
  const sortProjects = (sortOrder) => {
    console.log(`Sorting by: ${sortOrder}`); // Debugging
    let sortedProjects = [...filteredProjects];

    if (sortOrder === "alphabetical") {
      // Sort alphabetically by project name
      sortedProjects.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortOrder === "status") {
      // Normalize status values for sorting and only consider "Completed" and "Ongoing"
      const statusOrder = ["Completed", "Ongoing"];
      sortedProjects.sort((a, b) => {
        const statusA = (a.status || "").trim().toLowerCase(); // Normalize and trim
        const statusB = (b.status || "").trim().toLowerCase(); // Normalize and trim

        // If statuses are valid, compare them, otherwise put the rest at the end
        const indexA = statusOrder.indexOf(
          statusA.charAt(0).toUpperCase() + statusA.slice(1)
        ); // Capitalize first letter
        const indexB = statusOrder.indexOf(
          statusB.charAt(0).toUpperCase() + statusB.slice(1)
        ); // Capitalize first letter

        // If status is not in the predefined set, push it to the end of the list
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB; // Compare based on statusOrder
      });
    } else if (sortOrder === "duration") {
      // Sort by duration: Convert to numeric values for accurate sorting
      sortedProjects.sort((a, b) => {
        const durationA = parseInt(a.duration, 10); // Convert "1 month" to 1
        const durationB = parseInt(b.duration, 10); // Convert "10 months" to 10
        return durationA - durationB;
      });
    }

    setFilteredProjects(sortedProjects);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
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
              onChangeText={filterProjects} // Update projects based on search text
            />
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => toggleMenu()} // Open the filter menu
          >
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => toggleMenu()} // Open the sort menu
          >
            <Ionicons name="swap-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={{ flex: 1 }}>
                <H5>{item.projectName}</H5>
                <P>{`Duration: ${item.duration}`}</P>
                <P>{`Status: ${item.status}`}</P>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Filter Modal */}
        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions} // Pass the menu options for sort functionality
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log("Add Pressed")}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </ContainerComponent>
  );
};

export default TotalProjectsScreen;
