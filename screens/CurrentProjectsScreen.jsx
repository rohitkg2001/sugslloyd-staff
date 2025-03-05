// import All React native
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import axios from "axios";

// import all components
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyHeader from "../components/header/MyHeader";
import VendorSelectionScreen from "./VendorSelectionScreen";
import CustomMenu from "../components/TargetScreen/CustomMenu";
import TabBar from "../components/TabBar";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import Filter from "../components/Filter";

// import all redux
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/actions/taskActions";
//import { approveTasks } from "../redux/actions/taskActions";
import { getStreetlightById } from "../redux/actions/taskActions";

// import all styles
import { H5, H6, P, Span } from "../components/text";
import {
  spacing,
  styles,
  typography,
  SCREEN_WIDTH,
  ICON_MEDIUM,
  LIGHT,
} from "../styles";

export default function CurrentProjectsScreen({ navigation }) {
  const { staff } = useSelector((state) => state);
  const { tasks } = useSelector((state) => state.tasks);
  const [currentTasks, setCurrentTasks] = useState([]);
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [showVendorSelection, setShowVendorSelection] = useState(false);
  const [activeTab, setActiveTab] = useState("Unassigned");
  const menuRef = useRef(null);

  const { t } = useTranslation();

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const applyFilterFromRedux = () => {};

  useEffect(() => {
    if (staff?.id) dispatch(getAllTasks(staff.id));
  }, [staff]);

  useEffect(() => {
    if (Array.isArray(tasks)) setCurrentTasks(tasks);
  }, [tasks]);

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  const closeMenu = () => setMenuVisible(false);

  const selectTargets = (idx) => {
    setSelectedTargets((prevTargets) => {
      const existingTargetIndex = prevTargets.findIndex(
        (target) => target.id === idx
      );

      if (existingTargetIndex > -1) {
        const updatedTargets = [...prevTargets];
        updatedTargets.splice(existingTargetIndex, 1);
        return updatedTargets;
      } else {
        const selectedTask = tasks.find((task) => task.id === idx);
        return [
          ...prevTargets,
          { id: idx, select: true, hasVendor: !!selectedTask.vendor_id },
        ];
      }
    });
  };

  const assignMultipleTasksToVendor = () => {
    closeMenu();
    setShowVendorSelection(true);
  };

  const handleApprove = async (taskId) => {
    try {
      const response = await axios.post(
        `https://slldm.com/api/tasks/${taskId}/approve`
      );
      alert(response.data.message);
      dispatch(getAllTasks(staff.id));
    } catch (error) {
      console.error("Error approving the task:", error);
    }
  };

  const approveMultipleTasks = () => {
    if (!selectedTargets || selectedTargets.length === 0) return;

    selectedTargets.forEach((task) => handleApprove(task.id));

    closeMenu();
    setSelectedTargets([]);
  };

  const handleTabSelection = (tab) => {
    setActiveTab(tab);
    let filteredTasks = [];
    if (tab === "Unassigned") {
      filteredTasks = tasks.filter((task) => !task.vendor_id);
    } else if (tab === "Assigned") {
      filteredTasks = tasks.filter((task) => task.vendor_id && !task.image);
    } else if (tab === "Pending") {
      filteredTasks = tasks.filter(
        (task) => task.image && task.vendor_id && task.status !== "Completed"
      );
    } else if (tab === "Done") {
      filteredTasks = tasks.filter((task) => task.status === "Completed");
    } else if (tab === "Rejected") {
      filteredTasks = [];
    } else {
      filteredTasks = tasks;
    }
    setCurrentTasks(filteredTasks);
  };

  return (
    <ContainerComponent>
      <MyHeader
        title="Task"
        hasIcon
        isBack
        rightComponent
        onIconPress={toggleMenu}
        rightIcon={
          <View
            ref={menuRef}
            style={{ width: 40, height: 40, backgroundColor: "gray" }}
          />
        }
      />

      <MyFlatList
        data={Array.isArray(currentTasks) ? currentTasks : []}
        keyExtractor={(item) => item.id.toString()}
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
            // onLongPressAction={(idx) => {
            //   if (!item.vendor_id) selectTargets(idx); // Prevent long-press on assigned tasks
            // }}
            selected={selectedTargets.find((target) => target.id === item.id)}
          >
            <View>
              <Span
                style={[
                  typography.font10,
                  typography.fontLato,
                  { textTransform: "uppercase", color: "gray" },
                ]}
              >
                breda sl no
              </Span>
              <H5 style={[typography.font16, typography.fontLato]}>
                {item.site?.breda_sl_no}
              </H5>
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
        ListHeaderComponent={() => (
          <View>
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
                style={{ width: SCREEN_WIDTH - 80 }}
              />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
                onPress={() => setShowBottomSheet(true)}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>

            <TabBar
              tabs={[
                {
                  name: "Unassigned",
                  count: tasks.filter((t) => !t.vendor_id).length || "",
                },
                {
                  name: "Assigned",
                  count:
                    tasks.filter((t) => t.vendor_id && !t.image).length || "",
                },
                {
                  name: "Pending",
                  count:
                    tasks.filter(
                      (t) => t.image && t.vendor_id && t.status !== "Completed"
                    ).length || "",
                },
                {
                  name: "Done",
                  count:
                    tasks.filter((t) => t.status === "Completed").length || "",
                },
                { name: "View All", count: tasks.length || "" },
                { name: "Rejected" },
              ].map((tab) => (tab.count ? tab : { name: tab.name }))}
              activeTab={activeTab}
              onTabSelected={handleTabSelection}
            />
            {activeTab === "Rejected" && (
              <View
                style={{
                  alignItems: "center",
                  top: 12,
                }}
              >
                <P style={[typography.font18, typography.textBold]}>
                  No Reject Found
                </P>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
      />

      {/* <CustomMenu
        menuVisible={menuVisible}
        toggleMenu={toggleMenu}
        assignTasks={assignMultipleTasksToVendor}
        disableAssign={
          selectedTargets.length > 0 &&
          selectedTargets.some((target) => target.hasVendor)
        }
      /> */}

      <CustomMenu
        menuVisible={menuVisible}
        toggleMenu={toggleMenu}
        assignTasks={assignMultipleTasksToVendor}
        approveTasks={approveMultipleTasks}
        disableAssign={
          selectedTargets.length > 0 &&
          selectedTargets.some((target) => target.hasVendor)
        }
        disableApprove={selectedTargets.length === 0 || activeTab !== "Pending"}
      />

      {showBottomSheet && (
        <Filter
          onClose={() => setShowBottomSheet(false)}
          onApply={applyFilterFromRedux}
        />
      )}

      {showVendorSelection && (
        <VendorSelectionScreen
          onClose={() => setShowVendorSelection(false)}
          task_id={selectedTargets}
        />
      )}
    </ContainerComponent>
  );
}
