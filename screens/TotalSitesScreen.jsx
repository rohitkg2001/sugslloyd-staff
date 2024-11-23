import { useReducer } from "react";
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

import { taskListReducer, initialState } from "../redux/reducers/siteReducer";
import { searchSite, viewSite } from "../redux/actions/siteActions";

export default function TaskListScreen({ navigation }) {
  const [state, dispatch] = useReducer(taskListReducer, initialState);

const filterTasks = (text) => {
    dispatch(searchSite(text)); 
  };

const handleViewTask = (task) => {
    dispatch(viewSite(task)); 
    console.log(task); 
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleViewTask(item)}>
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
      <View>
        <MyHeader title="Task List" isBack={true} hasIcon={true} />
        <MyFlatList
          data={state.filteredTasks} 
          renderItem={renderListItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[spacing.mh2, spacing.mt1]}
          ListHeaderComponent={() => (
            <SearchBar
              placeholder="Search tasks..."
              value={state.searchText} 
              onChangeText={filterTasks} 
            />
          )}
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
}