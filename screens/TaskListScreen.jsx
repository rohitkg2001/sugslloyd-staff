import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-native-paper";
import { useTranslation } from "react-i18next";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H5, P } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
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
    // navigation.navigate("targetmanagementform");
  };
  const { t } = useTranslation();

  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };
  const applyFilterFromRedux = (...args) => {};

  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleViewTask(item)} key={item.id}>
      <Card
        style={[
          spacing.mv1,
          { width: SCREEN_WIDTH - 18, backgroundColor: "#ffffff" },
        ]}
      >
        <View style={[spacing.pv5, { flexDirection: "row", padding: 16 }]}>
          <View style={[spacing.pv1, { flex: 1 }]}>
            <H5 style={[typography.textBold]}>{item.project.project_name}</H5>

            <P style={{ fontSize: 16 }}>Task Name: {item.task_name}</P>

            <View style={[spacing.pv1, { flexDirection: "row" }]}>
              <P style={{ fontSize: 16, color: "#020409" }}>
                {item.start_date}
              </P>
              <P style={{ fontSize: 14, color: "#020409", marginLeft: 15 }}>
                {item.end_date}
              </P>
            </View>
          </View>

          <View
            style={{
              position: "absolute",
              top: 90,
              right: 8,
            }}
          >
            <P
              style={{
                fontSize: 14,
                color:
                  item.status === "Completed"
                    ? "green"
                    : item.status === "Pending"
                    ? "red"
                    : "red",
              }}
            >
              {item.status}
            </P>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ContainerComponent>
      <MyHeader title={t("task_list")} isBack={true} hasIcon={true} />

      <View
        style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}
      >
        <SearchBar placeholder="Search" style={{ width: SCREEN_WIDTH - 70 }} />
        <Button
          style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
          onPress={() => setShowBottomSheet(!showBottomSheet)}
        >
          <Ionicons name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
        </Button>
      </View>

      {tasks.length > 0 ? (
        <MyFlatList
          data={tasks}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[spacing.mh2, spacing.mt1]}
        />
      ) : (
        <NoRecord msg={t("No tasks available !")} />
      )}

      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
