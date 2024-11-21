import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { taskslistdata } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";

const TaskListScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(taskslistdata);

  const filterTasks = (text) => {
    setSearchText(text);
    setFilteredTasks(
      taskslistdata.filter((task) =>
        task.projectName.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log(item)}>
      <Card
        style={[
          spacing.mv1,
          { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
        ]}
      >
        <View style={{ flexDirection: "row", padding: 16 }}>
          <View style={{ flex: 1 }}>
            <H5 style={[typography.textBold]}>{item.projectName}</H5>
            {["taskName", "deadline", "status", "startDate", "endDate"].map(
              (field) => (
                <P key={field} style={{ fontSize: 14, color: "#020409" }}>
                  {`${field.charAt(0).toUpperCase() + field.slice(1)}: ${
                    item[field]
                  }`}
                </P>
              )
            )}
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
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <SearchBar
            placeholder="Search tasks..."
            value={searchText}
            onChangeText={filterTasks}
          />
        </View>
        <MyFlatList
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
      </View>
    </ContainerComponent>
  );
};

export default TaskListScreen;
