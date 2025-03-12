import { useEffect, useState } from "react";
import { View } from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import TaskCard from "../components/card/TaskCard";
import { spacing, styles, typography } from "../styles";
import SearchBar from "../components/input/SearchBar";
import ClickableCard1 from "../components/card/ClickableCard1";
import { H5, H6, P, Span } from "../components/text";
import DashboardFilter from "../components/filters/DashboardFilter";

export default function TaskListScreen({ navigation }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks) || [];
  const [currentTasks, setCurrentTasks] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [searchText, setSearchText] = useState(""); // Search text state
  const [dateFilter, setDateFilter] = useState("All");

  // useEffect(() => {
  //   setCurrentTasks(tasks);
  // }, [tasks]);

  // useEffect(() => {
  //   if (!tasks || searchText.trim() === "") {
  //     setCurrentTasks(tasks);
  //   } else {
  //     const filteredTasks = tasks.filter(
  //       (task) =>
  //         task?.site?.breda_sl_no
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(searchText.toLowerCase()) ||
  //         task?.site?.site_name
  //           ?.toLowerCase()
  //           .includes(searchText.toLowerCase()) ||
  //         task?.task_name?.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setCurrentTasks(filteredTasks);
  //   }
  // }, [searchText, tasks]);

 

  useEffect(() => {
    let filteredTasks = [...tasks]; // Ensure tasks are always shown

    // Search filter
    if (searchText.trim() !== "") {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task?.site?.breda_sl_no
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          task?.site?.site_name
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          task?.task_name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter === "Today") {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.start_date && // Ensure start_date is defined
          moment(task.start_date).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD")
      );
    } else if (dateFilter === "This Month") {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.start_date && moment(task.start_date).isSame(moment(), "month")
      );
    } else if (
      dateFilter &&
      dateFilter.type === "Custom" &&
      dateFilter.startDate &&
      dateFilter.endDate
    ) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.start_date && // Ensure start_date is defined
          moment(task.start_date, "YYYY-MM-DD").isBetween(
            moment(dateFilter.startDate, "YYYY-MM-DD"),
            moment(dateFilter.endDate, "YYYY-MM-DD"),
            "day",
            "[]"
          )
      );
    }

    console.log("Filtered Tasks: ", filteredTasks); // Debugging

    setCurrentTasks(filteredTasks);
  }, [searchText, tasks, dateFilter]);

  const { t } = useTranslation();

  const selectTargets = (idx) => {
    setSelectedTargets((prevTargets) => {
      const existingTargetIndex = prevTargets.findIndex(
        (target) => target.id === idx
      );

      if (existingTargetIndex > -1) {
        // If already selected, remove it (unselect)
        const updatedTargets = [...prevTargets];
        updatedTargets.splice(existingTargetIndex, 1);
        return updatedTargets;
      } else {
        // If not selected, add it with `select: true`
        return [...prevTargets, { id: idx, select: true }];
      }
    });
  };

  return (
    <ContainerComponent>
      <MyHeader
        title={t("task_list")}
        isBack={true}
        rightComponent={true}
        hasIcon={true}
      />
      <DashboardFilter updateDateFilter={setDateFilter} />
      {/* Search Bar */}
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        style={{ marginHorizontal: 10 }}
      />

      <MyFlatList
        data={currentTasks}
        renderItem={({ item }) => (
          <ClickableCard1
            key={item.id}
            index={item.id}
            title={item.site?.site_name || ""}
            subtitle={`${item.site?.location || ""}, ${
              item.site?.district || ""
            }, ${item.site?.state || ""}`}
            onPress={() =>
              navigation.navigate("targetManagementScreen", { id: item.id })
            }
            onLongPressAction={(idx) => selectTargets(idx)}
            selected={selectedTargets.find((target) => target.id === item.id)}
          >
            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",

                  right: 0,
                  alignItems: "flex-end",
                  bottom: 70,
                }}
              >
                <Span
                  style={[
                    typography.font10,
                    typography.fontLato,
                    { textTransform: "uppercase", color: "gray" },
                  ]}
                >
                  breda sl no
                </Span>

                <H5
                  style={[
                    typography.font16,
                    typography.fontLato,
                    spacing.mr4,
                    // { marginRight: 20 },
                  ]}
                >
                  {item.site?.breda_sl_no}
                </H5>
              </View>

              <H6 style={[typography.font14, typography.fontLato]}>
                {item.activity}
              </H6>

              <View style={[spacing.mt1, styles.row, spacing.mv2]}>
                <View>
                  <Span
                    style={[
                      typography.font10,
                      typography.fontLato,
                      { textTransform: "uppercase", color: "gray" },
                    ]}
                  >
                    Start date
                  </Span>
                  <P style={[typography.font12, typography.fontLato]}>
                    {item.start_date}
                  </P>
                </View>
                <View>
                  <Span
                    style={[
                      typography.font10,
                      typography.fontLato,
                      { textTransform: "uppercase", color: "gray" },
                    ]}
                  >
                    End date
                  </Span>
                  <P style={[typography.font12, typography.fontLato]}>
                    {item.end_date}
                  </P>
                </View>
              </View>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => <NoRecord msg={t("no_task")} />}
        showSearchBar={false}
      />
    </ContainerComponent>
  );
}
