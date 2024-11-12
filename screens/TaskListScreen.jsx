import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { taskslistdata } from "../utils/faker"; 
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, typography, styles } from "../styles";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Filter from "../components/filters";
import { useNavigation } from "@react-navigation/native";

const TaskListScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(taskslistdata);
  const navigation = useNavigation();

  const toggleMenu = () => {
    console.log("Toggling menu visibility");
    setIsMenuVisible(!isMenuVisible);
  };

  const filterTasks = (text) => {
    setSearchText(text);
    const filtered = taskslistdata.filter((task) =>
      task.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const sortTasks = (sortOrder) => {
    console.log(`Sorting by: ${sortOrder}`);
    let sortedTasks = [...filteredTasks];
    if (sortOrder === "status") {
      sortedTasks.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortOrder === "deadline") {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    setFilteredTasks(sortedTasks);
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

  const handleViewDetails = (task) => {
    navigation.navigate("TaskDetailScreen", { task });
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
            <H5 style={[typography.textBold]}>{item.projectName}</H5>
            <P style={{ fontSize: 14, color: "#020409" }}>
              Task Name: {item.taskName}
            </P>
            <P style={{ fontSize: 14, color: "#020409" }}>
              Deadline: {item.deadline}
            </P>
            <P style={{ fontSize: 14, color: "#020409" }}>
              Status: {item.status}
            </P>
            <P style={{ fontSize: 14, color: "#020409" }}>
              Start Date: {item.startDate}
            </P>
            <P style={{ fontSize: 14, color: "#020409" }}>
              End Date: {item.endDate}
            </P>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

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
              placeholder="Search tasks..."
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
          renderItem={renderListItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("taskListFormScreen")}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>

        <Filter
          visible={isMenuVisible}
          onClose={toggleMenu}
          options={menuOptions}
        />
      </View>
    </ContainerComponent>
  );
};

export default TaskListScreen;
