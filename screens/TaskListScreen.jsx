import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { taskslistdata } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing } from "../styles";
import { styles } from "../styles/components.styles";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Filter from "../components/filters";

const TaskListScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(taskslistdata);

  const filterTasks = (text) => {
    setSearchText(text);
    const filtered = taskslistdata.filter((task) =>
      task.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const sortTasks = (sortOrder) => {
    console.log(`Sorting by: ${sortOrder}`); // Debugging
    let sortedTasks = [...filteredTasks];
    if (sortOrder === "status") {
      sortedTasks.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortOrder === "deadline") {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    setFilteredTasks(sortedTasks);
  };

  const toggleMenu = () => {
    console.log("Toggling menu visibility"); // Debugging
    setIsMenuVisible(!isMenuVisible);
  };

  const menuOptions = [
    { label: "Search", onPress: () => console.log("Search clicked") },
    {
      label: "Sort by Status",
      onPress: () => {
        sortTasks("status");
        toggleMenu();
      },
    },
    {
      label: "Sort by Deadline",
      onPress: () => {
        sortTasks("deadline");
        toggleMenu();
      },
    },
  ];

  return (
    <ContainerComponent>
      <View style={[spacing.mh1, { width: SCREEN_WIDTH - 16 }]}>
        <MyHeader
          title="Task List"
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
              placeholder="Search"
              value={searchText}
              onChangeText={filterTasks}
            />
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              console.log("Filter Pressed");
              toggleMenu();
            }}
          >
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              console.log("Sort Pressed");
              toggleMenu();
            }}
          >
            <Ionicons name="swap-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={{ flex: 1 }}>
                <H5>{item.projectName}</H5>
                <P>{`Task Name: ${item.taskName}`}</P>
                <P>{`Deadline: ${item.deadline}`}</P>
                <P>{`Status: ${item.status}`}</P>
                <P>{`Start Date: ${item.startDate}`}</P>
                <P>{`End Date: ${item.endDate}`}</P>
              </View>
            </TouchableOpacity>
          )}
        />

        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions}
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

export default TaskListScreen;
