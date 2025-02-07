import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/actions/taskActions";
import ContainerComponent from "../components/ContainerComponent";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyHeader from "../components/header/MyHeader";
import { H6, P, Span } from "../components/text";
import VendorSelectionScreen from "./VendorSelectionScreen";
import CustomMenu from "../components/TargetScreen/CustomMenu";
import TabBar from "../components/TabBar";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import Filter from "../components/Filter";
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

  const handleTabSelection = (tab) => {
    setActiveTab(tab);

    let filteredTasks = [];
    if (tab === "Unassigned") {
      filteredTasks = tasks.filter((task) => !task.vendor_id);
    } else if (tab === "Assigned") {
      filteredTasks = tasks.filter((task) => task.vendor_id && !task.image);
    } else if (tab === "Pending") {
      filteredTasks = tasks.filter((task) => task.image && task.vendor_id);
    } else if (tab === "Done") {
      filteredTasks = tasks.filter((task) => task.status === "Done");
    } else if (tab === "View All") {
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
            selected={selectedTargets.find((target) => target.id === item.id)}
          >
            <View>
              <H6 style={[typography.font16]}>{item.activity}</H6>

              <View style={[spacing.mt1, styles.row, spacing.mv2]}>
                <View>
                  <Span
                    style={[
                      typography.font10,
                      { textTransform: "uppercase", color: "gray" },
                    ]}
                  >
                    Start date
                  </Span>
                  <P style={[typography.font14]}>{item.start_date}</P>
                </View>
                <View>
                  <Span
                    style={[
                      typography.font10,
                      { textTransform: "uppercase", color: "gray" },
                    ]}
                  >
                    End date
                  </Span>
                  <P style={[typography.font14]}>{item.end_date}</P>
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
                    tasks.filter((t) => t.image && t.vendor_id).length || "",
                },
                {
                  name: "Done",
                  count: tasks.filter((t) => t.status === "Done").length || "",
                },
                { name: "View All", count: tasks.length || "" },
              ].map((tab) => (tab.count ? tab : { name: tab.name }))}
              activeTab={activeTab}
              onTabSelected={handleTabSelection}
            />
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
      />

      <CustomMenu
        menuVisible={menuVisible}
        toggleMenu={toggleMenu}
        assignTasks={assignMultipleTasksToVendor}
        disableAssign={
          selectedTargets.length > 0 &&
          selectedTargets.some((target) => target.hasVendor)
        }
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
