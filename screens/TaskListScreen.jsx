import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-native-paper";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import {
  viewTask,
  // initializeTasks
} from "../redux/actions/taskActions";
import Button from "../components/buttons/Button";
import Filter from "../components/Filter";
import {
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  ICON_MEDIUM,
  LIGHT,
} from "../styles";

export default function TaskListScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const tasks = useSelector((state) => state.tasks?.tasks || []);

  useEffect(() => {}, [tasks]);

  const handleViewTask = (task) => {
    dispatch(viewTask(task.id));
    navigation.navigate("taskListFormScreen");
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleViewTask(item)} key={item.id}>
      <Card
        style={[
          spacing.mv1,
          { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
        ]}
      >
        <View style={{ flexDirection: "row", padding: 16 }}>
          <View style={{ flex: 1 }}>
            <H5 style={[typography.textBold]}>{item.project.project_name}</H5>
            {["task_name", "status", "start_date", "end_date"].map((field) => (
              <P key={field} style={{ fontSize: 14, color: "#020409" }}>
                {`${field.charAt(0).toUpperCase() + field.slice(1)}: ${
                  item[field]
                }`}
              </P>
            ))}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ContainerComponent>
      <MyHeader title={t("task_list")} isBack={true} hasIcon={true} />
      <MyFlatList
        data={tasks}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListHeaderComponent={() => (
          <View
            style={[
              spacing.mv4,
              styles.row,
              spacing.mh1,
              { alignItems: "center" },
            ]}
          >
            <SearchBar
              placeholder="Search"
              style={{ width: SCREEN_WIDTH - 70 }}
            />
            <Button
              style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
              onPress={() => setShowBottomSheet(!showBottomSheet)}
            >
              <Ionicons
                name="options-outline"
                size={ICON_MEDIUM}
                color={LIGHT}
              />
            </Button>
          </View>
        )}
      />
      {showBottomSheet && <Filter />}
    </ContainerComponent>
  );
}
